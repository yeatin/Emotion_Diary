import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const EditButtons = ({ datas, chosenData, types }) => {
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
        const addContent = document.forms["addContent"].elements;
        addContent.time0.value = "";
        addContent.time1.value = "";
        addContent.time2.value = "";
        addContent.locationId.selectedIndex = 0;
        addContent.country.value = "";
        addContent.city.value = "";
        addContent.street.value = "";
        addContent.building.value = "";
        addContent.eventName.value = "";
        addContent.typeId.selectedIndex = 0;
        addContent.cost.value = "";
        addContent.mood.value = "";
        addContent.startTime.value = "";
        addContent.endTime.value = "";
        toggleWindow("addContentContainer");
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

    const handleSubmitType = (event) => {
        event.preventDefault();
        const typeForm = document.forms["typeForm"].elements;
        if (typeForm.addTypeId.value) {
            //call db
            //console.log("add=", typeForm.addTypeId.value);
        }
        if (typeForm.deleteTypeId.value !== "無") {
            //call db
            //console.log("delete=", typeForm.deleteTypeId.value);
        }
        typeForm.addTypeId.value = "";
        typeForm.deleteTypeId.value = "";
        const editType = document.querySelector("#editType");
        editType.style.display = "none";
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
                        事件複製
                    </Button>
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
                <div id="editType" className="smallWindow" style={{ width: "40rem", margin: "0", position: "absolute", top: "7rem", "left": "45rem", display: "none" }}>
                    <div style={{ backgroundColor: "#1F66AB", width: "3px", height: "2rem", position: "absolute", top: "-2rem", left: "35%" }}></div>
                    <Form name="typeForm">
                        <fieldset>
                            <Stack gap={3} style={{ backgroundColor: "#B9D8F5", border: "2px solid #1F66AB", padding: "1rem" }}>
                                <Stack direction="horizontal" gap={2} >
                                    <p style={{ margin: "0", fontSize: "1.3rem", width: "10rem" }}>事件類別新增：</p>
                                    <Form.Group>
                                        <Form.Control name="addTypeId" />
                                    </Form.Group>
                                </Stack>
                                <Stack direction="horizontal" gap={2} >
                                    <p style={{ margin: "0", fontSize: "1.3rem", width: "10rem" }}>事件類別刪除：</p>
                                    <Form.Group>
                                        <Form.Select
                                            style={{ width: "5rem" }}
                                            name="deleteTypeId"
                                            className="deleteTypeId"
                                        >
                                            <option value="無">無</option>
                                            {
                                                types.map((type) => {
                                                    return <option key={"type"+type.typeId} value={type.typeId}>{type.typeId}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        style={{ width: "5rem", margin: "1rem auto 0 auto" }}
                                        onClick={handleSubmitType}
                                    >套用
                                    </Button>
                                </Stack>
                            </Stack>
                        </fieldset>
                    </Form>
                </div>
            </div>
        </div >
    )
}

export default EditButtons;