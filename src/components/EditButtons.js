import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const EditButtons = ({ datas, chosenData }) => {
    const navigate = useNavigate();

    const toggleWindow = (id) => {
        const smallWindow = document.querySelector(`#${id}`);
        if (smallWindow.style.display === "none") {
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
            case "view":
                navigate("/view");
                break;
            case "createData":
                handleCreateData();
                break;
            case "copyData":
                copyData(chosenData);
                break;
            case "deleteData":
                copyData(chosenData);
                break;
            case "editType":
                handleType();
                break;
            default:
                toggleWindow(type);
                break;
        }
    }

    const handleCreateData = () => {
        const contentContainer = document.querySelector(".contentContainer");
        const closeContent = document.querySelector(".closeContent");

        const contentTime0 = document.querySelector(".contentTime0");
        const contentTime1 = document.querySelector(".contentTime1");
        const contentTime2 = document.querySelector(".contentTime2");
        const contentLocationId = document.querySelector(".contentLocationId");
        const contentCountry = document.querySelector(".contentCountry");
        const contentCity = document.querySelector(".contentCity");
        const contentStreet = document.querySelector(".contentStreet");
        const contentBuilding = document.querySelector(".contentBuilding");
        const contentEventName = document.querySelector(".contentEventName");
        const contentTypeId = document.querySelector(".contentTypeId");
        const contentCost = document.querySelector(".contentCost");
        const contentMood = document.querySelector(".contentMood");
        const contentStartTime = document.querySelector(".contentStartTime");
        const contentEndTime = document.querySelector(".contentEndTime");
        closeContent.addEventListener("click", () => contentContainer.style.display = "none");
        contentTime0.value = "";
        contentTime1.value = "";
        contentTime2.value = "";
        contentLocationId.selectedIndex = 0;
        contentCountry.value = "";
        contentCity.value = "";
        contentStreet.value = "";
        contentBuilding.value = "";
        contentEventName.value = "";
        contentTypeId.selectedIndex = 0;
        contentCost.value = "";
        contentMood.value = "";
        contentStartTime.value = "";
        contentEndTime.value = "";
        toggleWindow("contentContainer");
    }
    /*
    const uniqueArray = [];
    datas.forEach(item => {
        if (!uniqueArray[item.typeId]) {
            uniqueArray[item.typeId] = 1;
        }
    })
    */

    const copyData = (data) => {
        //call db;
    }

    const deleteData = (data) => {
        //call db;
    }

    const handleType = () => {
        toggleWindow("editType");
    }

    return (
        <div>
            <div>
                <Alert variant="primary" style={{ width: "20rem", height: "5rem", fontSize: "3rem", textAlign: "center", margin: "0", padding: "0" }}>編輯頁面</Alert>
            </div>
            <div style={{ margin: "5rem auto 0 auto", width: "90%", position: "relative" }}>
                <ButtonGroup style={{ width: "70rem", margin: "0 auto" }}>
                    <Button variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("view")}
                    >切換至檢視介面
                    </Button>
                    <Button
                        variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("createData")}
                    >
                        事件寫入
                    </Button>
                    <Button
                        variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("copyData")}
                    >
                        事件複製</Button>
                    <Button
                        variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("deleteData")}
                    >
                        事件刪除</Button>
                    <Button
                        variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("editType")}
                    >
                        事件類別新增/刪除</Button>
                </ButtonGroup>
                <div id="editType" style={{ width: "40rem", margin: "0", position: "absolute", top: "7rem", "left": "5rem", display: "none" }}>
                    <div style={{ backgroundColor: "#1F66AB", width: "3px", height: "2rem", position: "absolute", top: "-2rem", left: "35%" }}></div>
                    <Stack style={{ backgroundColor: "#B9D8F5", border: "2px solid #1F66AB", padding: "1rem" }}>
                        <Stack direction="horizontal" gap={2} >
                            <p style={{ margin: "0", fontSize: "1.3rem", width: "10rem" }}>開始時間：</p>
                            <Form.Group controlId="startYear">
                                <Form.Control placeholder="YYYY" />
                            </Form.Group>
                            <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                            <Form.Group controlId="startMonth">
                                <Form.Control placeholder="MM" />
                            </Form.Group>
                            <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                        </Stack>
                    </Stack>
                </div>
            </div>
        </div >
    )
}

export default EditButtons;