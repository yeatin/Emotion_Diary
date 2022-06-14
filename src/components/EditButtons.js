import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const EditButtons = ({ datas }) => {
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
            default:
                toggleWindow(type);
                break;
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
                <Alert variant="primary" style={{ width: "20rem", height: "5rem", fontSize: "3rem", textAlign: "center", margin: "0", padding: "0" }}>編輯頁面</Alert>
            </div>
            <div style={{ margin: "5rem auto 0 auto", width: "90%", position: "relative" }}>
                <ButtonGroup style={{ width: "70rem", margin: "0 auto" }}>
                    <Button variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("view")}
                    >切換至檢視介面
                    </Button>
                    <Button variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("switchToTime")}
                    >事件寫入
                    </Button>
                    <Button variant="outline-secondary"
                        style={{ height: "5rem", fontSize: "1.4rem" }}
                        onClick={() => handleButton("switchToType")}
                    >事件複製</Button>
                    <Button variant="outline-secondary" style={{ height: "5rem", fontSize: "1.4rem" }}>事件刪除</Button>
                    <Button variant="outline-secondary" style={{ height: "5rem", fontSize: "1.4rem" }}>事件類別新增/刪除</Button>
                </ButtonGroup>
            </div>
        </div >
    )
}

export default EditButtons;