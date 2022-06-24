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
    user: 'root',
    password: '00000000',
    database: 'team9'
});

app.get('/view', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${ connection.threadId }`)
        connection.query('SELECT * FROM location NATURAL JOIN type NATURAL JOIN activity NATURAL JOIN event', (err, rows) => {
            connection.release()
            if (!err) {
                res.json(rows)
            } else {
                console.log(err)
            }

        })

    })
})





app.listen(port, () => console.log(`Listen on port:${port}`))