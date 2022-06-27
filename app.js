const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')
const mysql = require('mysql')
const Connection = require('mysql/lib/Connection')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(__dirname));



//Mysql
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'team9',
    password: 'TO5iVE',
    database: 'team9'
});

//取得詳細資料(總表)(V)
app.get('/view', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${ connection.threadId }`)
        connection.query('SELECT * FROM location NATURAL JOIN type NATURAL JOIN activity NATURAL JOIN event', (err, rows) => {
            connection.release()
            if (!err) {
                res.json({status:"success",data:rows})
            } else {
                res.json({status:err})
            }

        })

    })
})

//回傳location 資訊(V)
app.get('/location', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${ connection.threadId }`)
        connection.query('SELECT * FROM location ',(err, rows) => { 
            connection.release()
            if (!err) {
                res.json({status:"success",data:rows})
            } else {
                res.json({status:err})
            }
        })
        console.log(req.body)
    })
})

//回傳type 資訊(V)
app.get('/type', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${ connection.threadId }`)
        connection.query('SELECT * FROM type ',(err, rows) => { 
            connection.release()
            if (!err) {
                res.json({status:"success",data:rows})
            } else {
                console.log(err)
                res.json({status:err})
            }
        })
        console.log(req.body)
    })
})

//新增type(V)
app.post('/new_type', (req, res) => {
    //連接資料庫
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${ connection.threadId }`) //cmd 顯示 CONNECTION ID
        connection.query('SELECT max(Type_id)+1 as a FROM type',(err,type)=>{
            if (!err) {
                res.json({status:"success1"})//回傳成功訊息
                console.log("pass1") //cmd顯示成功訊息
                const {Type_name}=req.body
                connection.query('INSERT INTO type SET Type_id=?,Type_name=?',[type[0].a,Type_name],(err, rows) => { //mysql 程式碼
                    connection.release() //釋放connection
                    if (!err) {
                        console.log(`type with the record id: ${[req.params.Type_id]} has been added.`)  //正確信息出現
                        res.json({status:`type with the record id: ${[req.params.Type_id]} has been added.`})
                    } else {
                        console.log(err)
                        res.json({status:err})
                    }
                }) 
            } else {
                console.log(err)
            }
        })
    })
})

//事件寫入(V)
app.post('/new_data', (req, res) => {
    //連接資料庫
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${ connection.threadId }`) //cmd 顯示 CONNECTION ID
        const {Year,Month,Day,Location_id,Country,City,Street,Building,Event_name,Type_id,Cost,Mood,Start_time,End_time}=req.body
        if(req.body.Location_id=="新增"){
            connection.query('SELECT max(Location_id)+1 as a FROM location',(err,location)=>{
                if(!err){
                    connection.query('INSERT INTO location SET Country=?,City=?,Street=?,Building=?,Location_id=? ',[Country,City,Street,Building,location[0].a],(err, rows) => { //mysql 程式碼
                        if (!err) {
                            console.log('pass 1')
                        } else {
                            console.log(err)
                            res.json({status:err})
                        }
                    })
                    connection.query('INSERT INTO activity SET Year_Month_Day=?,Location_id=?,Event_name=?',[req.body.Year*10000+req.body.Month*100+req.body.Day,location[0].a,Event_name],(err, rows) => { //mysql 程式碼
                        if (!err) {
                            console.log('pass 2')
                        } else {
                            console.log(err)
                            res.json({status:err})
                        }
                    })
                    connection.query('INSERT INTO event SET Event_name=?,Type_id=?,Cost=?,Mood=?,Start_time=?,End_time=?',[Event_name,Type_id,Cost,Mood,Start_time,End_time],(err, rows) => { //mysql 程式碼
                        if (!err) { 
                            res.json({status:`type with the record id: ${[req.body.Event_name]} has been added.`})//正確信息出現
                        } else {
                            console.log(err)
                            res.json({status:err})
                        }
                    })
                }else{
                    console.log(err)
                    res.json({status:err})
                }
            })
        }
        else{
            connection.query('INSERT INTO activity SET Year_Month_Day=?,Location_id=?,Event_name=?',[req.body.Year*10000+req.body.Month*100+req.body.Day,Location_id,Event_name],(err, rows) => { //mysql 程式碼
                if (!err) {
                    console.log('pass 3')
                } else {
                    console.log(err)
                    res.json({status:err})
                }
            })
            connection.query('INSERT INTO event SET Event_name=?,Type_id=?,Cost=?,Mood=?,Start_time=?,End_time=?',[Event_name,Type_id,Cost,Mood,Start_time,End_time],(err, rows) => { //mysql 程式碼
                if (!err) {
                    res.json({status:`type with the record id: ${[req.body.Event_name]} has been added.`})//正確信息出現
                } else {
                    console.log(err)
                    res.json({status:err})
                }
            })  
        }
    })
})

//修改資料(特殊字元卡住)
app.put('/revise_data', (req, res) => {
    //連接資料庫
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${ connection.threadId }`) //cmd 顯示 CONNECTION ID
        var {O_year_month_day,O_location_id,Year,Month,Day,Location_id,Country,City,Street,Building,Event_name,Type_id,Cost,Mood,Start_time,End_time}=req.body
        if(req.body.Location_id=="新增"){
            connection.query('SELECT max(Location_id)+1 as a FROM location',(err,location)=>{
                if(!err){
                    connection.query('INSERT INTO location SET Country=?,City=?,Street=?,Building=?,Location_id=?',[Country,City,Street,Building,location[0].a],(err, rows) => { //mysql 程式碼
                        if (!err) {
                            console.log('pass 1')
                        } else {
                            console.log(err)
                            res.json({status:err})
                        }
                    })
                    connection.query('UPDATE activity SET Year_Month_Day=?,Location_id=? WHERE Event_name=? AND (Year_Month_Day=? AND Location_id=?)',[req.body.Year*10000+req.body.Month*100+req.body.Day,location[0].a],Event_name,O_year_month_day,O_location_id,(err, rows) => { //mysql 程式碼
                        if (!err) {
                            console.log('pass 2')
                        } else {
                            console.log(err)
                            res.json({status:err})
                        }
                    })
                    connection.query('UPDATE event SET Type_id=?,Cost=?,Mood=?,Start_time=?,End_time=? WHERE Even_name=?',[Type_id,Cost,Mood,Start_time,End_time,Event_name],(err, rows) => { //mysql 程式碼
                        if (!err) {
                            res.json({status:`type with the record id: ${[req.body.Event_name]} has been added.`})//正確信息出現
                        } else {
                            console.log(err)
                            res.json({status:err})
                        }
                    })

                }else{
                    console.log(err)
                    res.json({status:err})
                }
            })
        }
        else{
            connection.query('INSERT INTO temp (SELECT * FROM activity WHERE Event_name=?) FROM activity',Event_name,(err, rows) => { //mysql 程式碼
                if (!err) {
                    console.log('pass 3')
                    connection.query('SELECT * INTO temp1 FROM temp WHERE Location_id=? ',O_location_id,(err, rows1) => { //mysql 程式碼
                        if (!err) {
                            console.log('pass 4')
                            connection.query('SELECT * FROM temp1 WHERE Year_Month_Day=? ',O_year_month_day,(err, rows2) => { //mysql 程式碼
                                console.log(rows2[0])
                                if (!err) {
                                    console.log('pass 5')
                                } else {
                                    console.log(err)
                                    res.json({status:err})
                                }
                            })
                        } else {
                            console.log(err)
                            res.json({status:err})
                        }
                    })
                } else {
                    console.log(err)
                    res.json({status:err})
                }
            })
            /*connection.query('UPDATE event SET Type_id=?,Cost=?,Mood=?,Start_time=?,End_time=? WHERE Even_name=?',[Type_id,Cost,Mood,Start_time,End_time,Event_name],(err, rows2) => { //mysql 程式碼
                if (!err) { 
                    res.json({status:`type with the record id: ${[req.body.Event_name]} has been added.`})//正確信息出現
                } else {
                    console.log(err)
                    res.json({status:err})
                }
            })*/ 
        }
    })
})

//事件複製(V)
app.post('/copy_data', (req, res) => {
    //連接資料庫
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${ connection.threadId }`) //cmd 顯示 CONNECTION ID
        const {Location_id,Event_name}=req.body
        connection.query('SELECT max(Year_Month_Day)+1 as a FROM activity',(err,date)=>{
            if(!err){
                connection.query('INSERT INTO activity SET Year_Month_Day=?,Location_id=?,Event_name=?',[date[0].a,Location_id,Event_name],(err, rows) => { //mysql 程式碼
                    if (!err) {
                        res.json({status:`type with the record id: ${[req.body.Event_name]} has been added.`})//正確信息出現
                    } else {
                        console.log(err)
                        res.json({status:err})
                    }
                })
            }else{
                console.log(err)
                res.json({status:err})
            }
        })      
    })
})

//刪除type(V)
app.delete('/delete_type/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${ connection.threadId }`)
        const params=req.body
        connection.query('DELETE from type WHERE type_id = ?',req.params.id,(err, rows) => { 
            if (!err) {
                connection.query('UPDATE event SET Type_id=0 WHERE Type_id=? ',req.params.id,(err, rows1) => { 
                    connection.release()
                    if (!err) {
                        res.json({status:`type with the record name ${[req.params.id]} has been deleted.`})
                    } else {
                        console.log(err)
                        res.json({status:err})
                    }
                })  
            } else {
                console.log(err)
                res.json({status:err})
            }
        })
    })
})
//刪除資料(V)
app.delete('/delete_data', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${ connection.threadId }`)
        const {Event_name}=req.body
        connection.query('DELETE from event WHERE Event_name = ?',req.body.Event_name,(err, rows) => { 
            console.log(req.body.Event_name)//test
            if (!err) {
                connection.query('DELETE from activity WHERE Event_name = ? ',req.body.Event_name,(err, rows1) => { 
                    connection.release()
                    if (!err) {
                        res.json({status:`type with the record name ${[req.body.Event_name]} has been deleted.`})
                    } else {
                        console.log(err)
                        res.json({status:err})
                    }
                })  
            } else {
                console.log(err)
                res.json({status:err})
            }
        })
    })
})

app.listen(port, () => console.log(`Listen on port:${port}`))