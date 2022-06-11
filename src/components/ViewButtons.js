import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router-dom";

const ViewButtons = ({ startTime, setStartTime, endTime, setEndTime }) => {
    const navigate = useNavigate();

    const toggleWindow = (id) => {
        const smallWindow = document.querySelector(`#${id}`);
        if (smallWindow.style.display === "none")
            smallWindow.style.display = "block";
        else
            smallWindow.style.display = "none";
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
        }
    }

    const handleWindow = (event) => {
        if (event.key === "Enter") {
            console.log("startTime=", startTime, "endTime=", endTime);
            toggleWindow("switchToTime");
        }
        else{
            handleWindowChange(event);
        }
    }

    return (
        <div>
            <div>
                <Alert variant="primary" style={{ width: "20rem", height: "5rem", fontSize: "3rem", textAlign: "center", margin: "0", padding: "0" }}>檢視頁面</Alert>
            </div>
            <div style={{ margin: "5rem auto 0 auto", width: "90%", position: "relative" }}>
                <ButtonGroup style={{ width: "70rem", margin: "0 auto" }}>
                    <Button variant="outline-secondary" style={{ height: "5rem", fontSize: "1.4rem" }}>切換至編輯介面</Button>
                    <Button variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("switchToTime")}
                    >時間段事件瀏覽
                    </Button>
                    <Button variant="outline-secondary" style={{ height: "5rem", fontSize: "1.4rem" }}>同類型事件瀏覽</Button>
                    <Button variant="outline-secondary" style={{ height: "5rem", fontSize: "1.4rem" }}>時間段事件花費統計</Button>
                    <Button variant="outline-secondary" style={{ height: "5rem", fontSize: "1.4rem" }}>同類型事件花費統計</Button>
                </ButtonGroup>
                <div id="switchToTime" style={{ width: "50rem", position: "absolute", top: "7rem", "left": "0", display: "none" }}>
                    <div style={{ backgroundColor: "#1F66AB", width: "3px", height: "2rem", position: "absolute", top: "-2rem", left: "35%" }}></div>
                    <Stack style={{ backgroundColor: "#B9D8F5", border: "2px solid #1F66AB", padding: "1rem", width: "80%" }}>
                        <Stack direction="horizontal" gap={2} >
                            <p style={{ margin: "0", fontSize: "1.3rem" }}>開始時間 :</p>
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
                            <p style={{ margin: "0", fontSize: "1.3rem" }}>結束時間 :</p>
                            <Form.Group controlId="endYear">
                                <Form.Control placeholder="YYYY" onKeyDown={handleWindow} />
                            </Form.Group>
                            <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                            <Form.Group controlId="endMonth">
                                <Form.Control placeholder="YYYY" onKeyDown={handleWindow} />
                            </Form.Group>
                            <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                            <Form.Group controlId="endDay">
                                <Form.Control placeholder="YYYY" onKeyDown={handleWindow} />
                            </Form.Group>
                        </Stack>
                    </Stack>
                </div>
            </div>
        </div>

    )
}

export default ViewButtons;