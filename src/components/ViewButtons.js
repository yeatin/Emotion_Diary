import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const ViewButtons = ({ startTime, setStartTime, endTime, setEndTime, setViewMode, setTimeRange, datas, chosenType, setChosenType, cost, setCost, setKeywordDatas }) => {
    const navigate = useNavigate();

    const toggleWindow = (id) => {
        const smallWindow = document.querySelector(`#${id}`);
        if (smallWindow.style.display === "none") {
            const smallWindows = document.querySelectorAll(".smallWindow");
            smallWindows.forEach((smallWindow) => {
                smallWindow.style.display = "none";
                smallWindow.style.zIndex = "-1";
            });
            smallWindow.style.display = "block";
            smallWindow.style.zIndex = "2";
        }
        else {
            smallWindow.style.display = "none";
            smallWindow.style.zIndex = "-1";
        }
    }

    const handleButton = (type) => {
        switch (type) {
            case "edit":
                navigate("/edit");
                break;
            default:
                toggleWindow(type);
                break;
        }
    }

    const handleWindowChange = (event) => {
        switch (event.target.id) {
            case "startYear":
                setStartTime({ ...startTime, startYear: event.target.value });
                break;
            case "startMonth":
                setStartTime({ ...startTime, startMonth: event.target.value });
                break;
            case "startDay":
                setStartTime({ ...startTime, startDay: event.target.value });
                break;
            case "endYear":
                setEndTime({ ...endTime, endYear: event.target.value });
                break;
            case "endMonth":
                setEndTime({ ...endTime, endMonth: event.target.value });
                break;
            case "endDay":
                setEndTime({ ...endTime, endDay: event.target.value });
                break;
            default:
                break;
        }
    }

    const handleWindow = (event) => {
        if (event.key === "Enter") {
            let temp = ["", ""];
            for (let item in startTime) {
                temp[0] += startTime[item];
            }
            for (let item in endTime) {
                temp[1] += endTime[item];
            }
            setTimeRange(temp);
            setViewMode("time");
            toggleWindow("switchToTime");
        }
        else {
            handleWindowChange(event);
        }
    }

    const handleDropdown = (index) => {
        setViewMode("type");
        setChosenType(index);
    }

    const handleTimeRangeCost = (event) => {
        event.preventDefault();
        const timeRangeCost = document.forms["timeRangeCost"].elements;
        let temp = ["", ""];
        temp[0] = timeRangeCost.year1.value + timeRangeCost.month1.value + timeRangeCost.day1.value;
        temp[1] = timeRangeCost.year2.value + timeRangeCost.month2.value + timeRangeCost.day2.value;
        const tempDatas = datas.filter((data) => temp[0] <= data.yearMonthDay && data.yearMonthDay <= temp[1]);
        let cost = 0;
        tempDatas.forEach((data) => cost += data.cost);
        setCost(cost);
    }

    const handleTypeCost = (index) => {
        let cost = 0;
        datas.forEach((data) => { if (data.typeId === index) cost += data.cost });
        setCost(cost);
    }

    const handleViewKeyowrd = (event) => {
        if (event.key === "Enter") {
            if(event.target.value === ""){
                setViewMode("normal");
                return;
            }
            let result = [];

            if (isNaN(event.target.value)) {
                result = datas.map((data) => {
                    for (let item in data) {
                        if (typeof data[item] === "string") {
                            if (data[item].toLowerCase().includes(event.target.value.toLowerCase())) {
                                return data;
                            }
                            const year = data.yearMonthDay.slice(0, 4);
                            const month = data.yearMonthDay.slice(4, 6);
                            const day = data.yearMonthDay.slice(6, 8);
                            const int = parseInt(event.target.value);
                            if(parseInt(year) === int || parseInt(month) === int || parseInt(day) === int){
                                return data;
                            }
                        }
                    }
                    return null;
                })
            }
            else {
                result = datas.map((data) => {
                    for (let item in data) {
                        if (typeof data[item] === "number") {
                            if (data[item] === (parseInt(event.target.value))) {
                                return data;
                            }
                            if (data.yearMonthDay.includes(event.target.value)) {
                                return data;
                            }
                        }
                    }
                    return null;
                })
            }
            setKeywordDatas(result);
            setViewMode("keyword");
        }
    }

    const uniqueArray = [];
    datas.forEach(item => {
        if (!uniqueArray[item.typeId]) {
            uniqueArray[item.typeId] = 1;
        }
    })

    return (
        <div>
            <div>
                <Alert variant="primary" style={{ width: "20rem", height: "5rem", fontSize: "3rem", textAlign: "center", margin: "0", padding: "0" }}>檢視頁面</Alert>
            </div>
            <div style={{ margin: "5rem auto 0 auto", width: "90%", position: "relative" }}>
                <ButtonGroup style={{ width: "100%", margin: "0 auto" }}>
                    <Button variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("edit")}
                    >切換至編輯介面
                    </Button>
                    <Button variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("switchToTime")}
                    >時間段事件瀏覽
                    </Button>
                    <Button variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("switchToType")}
                    >同類型事件瀏覽</Button>
                    <Button
                        variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("timeRangeCostContainer")}
                    >時間段事件花費統計
                    </Button>
                    <Button
                        variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("typeCost")}
                    >同類型事件花費統計
                    </Button>
                    <Stack style={{ width: "20rem" }}>
                        <p style={{ margin: "0", fontSize: "1.3rem", border: "solid #000 2px", textAlign: "center" }}>關鍵字搜尋</p>
                        <Form.Group>
                            <Form.Control id="viewKeyword" style={{ height: "100%", padding: "0.7rem" }} onKeyDown={handleViewKeyowrd} />
                        </Form.Group>
                    </Stack>
                </ButtonGroup>
                <div id="switchToTime" className="smallWindow" style={{ width: "40rem", margin: "0", position: "absolute", top: "7rem", "left": "5rem", display: "none" }}>
                    <div style={{ backgroundColor: "#1F66AB", width: "3px", height: "2rem", position: "absolute", top: "-2rem", left: "35%" }}></div>
                    <Stack style={{ backgroundColor: "#B9D8F5", border: "2px solid #1F66AB", padding: "1rem" }}>
                        <Stack direction="horizontal" gap={2} >
                            <p style={{ margin: "0", fontSize: "1.3rem", width: "10rem" }}>開始時間：</p>
                            <Form.Group controlId="startYear">
                                <Form.Control placeholder="YYYY" onKeyDown={handleWindow} />
                            </Form.Group>
                            <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                            <Form.Group controlId="startMonth">
                                <Form.Control placeholder="MM" onKeyDown={handleWindow} />
                            </Form.Group>
                            <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                            <Form.Group controlId="startDay">
                                <Form.Control placeholder="DD" onKeyDown={handleWindow} />
                            </Form.Group>
                        </Stack>
                        <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                            <p style={{ margin: "0", fontSize: "1.3rem", width: "10rem" }}>結束時間：</p>
                            <Form.Group controlId="endYear">
                                <Form.Control placeholder="YYYY" onKeyDown={handleWindow} />
                            </Form.Group>
                            <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                            <Form.Group controlId="endMonth">
                                <Form.Control placeholder="MM" onKeyDown={handleWindow} />
                            </Form.Group>
                            <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                            <Form.Group controlId="endDay">
                                <Form.Control placeholder="DD" onKeyDown={handleWindow} />
                            </Form.Group>
                        </Stack>
                    </Stack>
                </div>
                <div id="switchToType" className="smallWindow" style={{ width: "15rem", position: "absolute", top: "7rem", "left": "25rem", display: "none" }}>
                    <div style={{ backgroundColor: "#1F66AB", width: "3px", height: "2rem", position: "absolute", top: "-2rem", left: "35%" }}></div>
                    <div style={{ backgroundColor: "#B9D8F5", border: "2px solid #1F66AB", padding: "1rem" }}>
                        <DropdownButton
                            variant="primary"
                            title="事件種類代號"
                            id="typeDropdown">
                            {
                                uniqueArray.map((item, index) => {
                                    if (item) {
                                        return <Dropdown.Item key={index} onClick={() => handleDropdown(index)} value={index}>{index}</Dropdown.Item>
                                    }
                                    return null;
                                })
                            }
                        </DropdownButton>
                    </div>
                </div>
                <div id="timeRangeCostContainer" className="smallWindow" style={{ width: "40rem", margin: "0", position: "absolute", top: "7rem", "left": "32rem", display: "none" }}>
                    <div style={{ backgroundColor: "#1F66AB", width: "3px", height: "2rem", position: "absolute", top: "-2rem", left: "35%" }}></div>
                    <Form name="timeRangeCost">
                        <fieldset>
                            <Stack style={{ backgroundColor: "#B9D8F5", border: "2px solid #1F66AB", padding: "1rem" }}>
                                <Stack direction="horizontal" gap={2} >
                                    <p style={{ margin: "0", fontSize: "1.3rem", width: "10rem" }}>開始時間：</p>
                                    <Form.Group controlId="startYear">
                                        <Form.Control name="year1" placeholder="YYYY" />
                                    </Form.Group>
                                    <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                                    <Form.Group controlId="startMonth">
                                        <Form.Control name="month1" placeholder="MM" />
                                    </Form.Group>
                                    <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                                    <Form.Group controlId="startDay">
                                        <Form.Control name="day1" placeholder="DD" />
                                    </Form.Group>
                                </Stack>
                                <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                    <p style={{ margin: "0", fontSize: "1.3rem", width: "10rem" }}>結束時間：</p>
                                    <Form.Group controlId="endYear">
                                        <Form.Control name="year2" placeholder="YYYY" />
                                    </Form.Group>
                                    <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                                    <Form.Group controlId="endMonth">
                                        <Form.Control name="month2" placeholder="MM" />
                                    </Form.Group>
                                    <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                                    <Form.Group controlId="endDay">
                                        <Form.Control name="day2" placeholder="DD" />
                                    </Form.Group>
                                </Stack>
                                <Stack direction="horizontal" gap={5} style={{ margin: "1rem 0 0 40%" }}>
                                    <Button
                                        id="updateButton"
                                        type="submit"
                                        variant="primary"
                                        style={{ width: "5rem", margin: "0" }}
                                        onClick={handleTimeRangeCost}
                                    >套用
                                    </Button>
                                    <p style={{ fontSize: "1.3rem", margin: "0" }}>總共花費：{cost}</p>
                                </Stack>
                            </Stack>
                        </fieldset>
                    </Form>
                </div>
                <div id="typeCost" className="smallWindow" style={{ width: "15rem", position: "absolute", top: "7rem", "left": "55rem", display: "none" }}>
                    <div style={{ backgroundColor: "#1F66AB", width: "3px", height: "2rem", position: "absolute", top: "-2rem", left: "35%" }}></div>
                    <div style={{ backgroundColor: "#B9D8F5", border: "2px solid #1F66AB", padding: "1rem" }}>
                        <DropdownButton
                            variant="primary"
                            title="事件種類代號"
                            id="typeCostDropdown">
                            {
                                uniqueArray.map((item, index) => {
                                    if (item) {
                                        return <Dropdown.Item key={index} onClick={() => handleTypeCost(index)} value={index}>{index}</Dropdown.Item>
                                    }
                                    return null;
                                })
                            }
                        </DropdownButton>
                        <p style={{ fontSize: "1.3rem", marginTop: "1rem " }}>總共花費：{cost}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewButtons;