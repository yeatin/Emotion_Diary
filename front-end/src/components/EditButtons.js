import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const EditButtons = ({ datas, chosenData, types, setViewMode, setKeywordDatas, fetchCopy, setLocationMax, locations, fetchNewType, fetchDeleteData, fetchDeleteType }) => {
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
                deleteData(chosenData);
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
        addContent.country.disabled = false;
        addContent.city.disabled = false;
        addContent.street.disabled = false;
        addContent.building.disabled = false;
        let max = -1;
        locations.forEach((location) => max = location.locationId > max ? location.locationId : max);
        if (max >= 0) {
            setLocationMax(max);
        }
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
        fetchCopy(data);
    }

    const deleteData = (data) => {
        fetchDeleteData(data);
    }

    const handleType = () => {
        const typeForm = document.forms["typeForm"].elements;
        typeForm.addTypeId.value = "";
        typeForm.deleteTypeId.value = "無";
        toggleWindow("editType");
    }

    const handleSubmitType = (event) => {
        event.preventDefault();
        const typeForm = document.forms["typeForm"].elements;
        if (typeForm.addTypeId.value) {
            fetchNewType(typeForm.addTypeId.value);
        }
        if (typeForm.deleteTypeId.value !== "無") {
            fetchDeleteType(parseInt(typeForm.deleteTypeId.value));
            //console.log("delete=", typeForm.deleteTypeId.value);
        }
        typeForm.addTypeId.value = "";
        typeForm.deleteTypeId.value = "無";
        toggleWindow("editType");
    }

    const handleViewKeyowrd = (event) => {
        if (event.key === "Enter") {
            if (event.target.value === "") {
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
                            if (parseInt(year) === int || parseInt(month) === int || parseInt(day) === int) {
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

    return (
        <div>
            <div>
                <Alert variant="primary" style={{ width: "20rem", height: "5rem", fontSize: "3rem", textAlign: "center", margin: "0", padding: "0" }}>編輯頁面</Alert>
            </div>
            <div style={{ margin: "5rem auto 0 auto", width: "90%", position: "relative" }}>
                <ButtonGroup style={{ width: "100%", margin: "0 auto" }}>
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
                    <Stack style={{ width: "20rem" }}>
                        <p style={{ margin: "0", fontSize: "1.3rem", border: "solid #000 2px", textAlign: "center" }}>關鍵字搜尋</p>
                        <Form.Group>
                            <Form.Control id="editKeyword" style={{ height: "100%", padding: "0.7rem" }} onKeyDown={handleViewKeyowrd} />
                        </Form.Group>
                    </Stack>
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
                                                    return <option key={"type" + type.typeId} value={type.typeId}>{type.typeId}</option>
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