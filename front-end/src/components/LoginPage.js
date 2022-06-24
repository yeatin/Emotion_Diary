import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ password, setPassword }) => {
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            verifyPassword();
        }
    }

    const verifyPassword = () => {
        const loginFail = document.querySelector(".loginFail");
        loginFail.style.display = "none";
        if (password === "0620") {
            document.cookie = "verified=true;";
            navigate("/view");
            window.location.reload();
        }
        else {
            loginFail.style.display = "block";
        }
    };

    return (
        <div>
            <Container style={{ textAlign: "center", width: "50vw", marginTop: "15vh" }}>
                <Row><p style={{ fontSize: "2.5rem" }}>我的行事曆</p></Row>
                <Row>
                    <Form.Control
                        type="password"
                        id="password"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Password"
                        style={{
                            height: "13vh", border: "solid 2px #8394ff", textAlign: "center", fontSize: "2rem", margin: "8vh 0"
                        }}
                        onChange={handlePasswordChange}
                        onKeyPress={handleEnter}
                    />
                </Row>
                <Row>
                    <Button
                        variant="outline-primary"
                        style={{ width: "10vw", height: "5rem", margin: "0 auto", fontSize: "2.5rem" }}
                        onClick={verifyPassword}
                    >登入
                    </Button>
                </Row>
                <Row>
                    <Alert className="loginFail" variant="danger" style={{ width: "15vw", margin: "1rem auto", display: "none" }}>
                        密碼錯誤
                    </Alert>
                </Row>
            </Container>
        </div>

    )
}

export default LoginPage;