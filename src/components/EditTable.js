import Table from 'react-bootstrap/Table';
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

const EditTable = ({ datas, chosenData, setChosenData }) => {

    const handleSelect = (id) => {
        const allCircles = document.querySelectorAll(".circle");
        allCircles.forEach(circle => {
            circle.style.backgroundColor = "transparent";
            circle.style.borderColor = "#000";
        })
        const selectedCircle = document.querySelector(`#${id}`);
        selectedCircle.style.backgroundColor = "#BD3E5C";
        selectedCircle.style.borderColor = "#BD3E5C";
    }

    const handleContent = (data) => {
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
        contentTime0.value = data.yearMonthDay.slice(0, 4)
        contentTime1.value = data.yearMonthDay.slice(4, 6)
        contentTime2.value = data.yearMonthDay.slice(6, 8)
        contentLocationId.value = data.locationId;
        contentCountry.value = data.country;
        contentCity.value = data.city;
        contentStreet.value = data.street;
        contentBuilding.value = data.building;
        contentEventName.value = data.eventName;
        contentTypeId.value = data.typeId;
        contentCost.value = data.cost.toString();
        contentMood.value = data.mood;
        contentStartTime.value = data.startTime;
        contentEndTime.value = data.endTime;
        contentContainer.style.display = "block";
    }

    return (
        <div style={{ position: "relative" }}>
            <Table striped bordered hover responsive variant='blue'
                style={{ margin: "5rem auto 0 auto", width: "90%", backgroundColor: "#B9D8F5" }}>
                <thead style={{ backgroundColor: "#1F66AB", color: "#fff", borderBottom: "solid 3px #fff" }}>
                    <tr style={{ fontSize: "1.5rem" }}>
                        <th>選取</th>
                        <th>活動名稱（Event_name）</th>
                        <th>年_月_日（Year_Month_Day）</th>
                        <th>地點代號（Location_id）</th>
                        <th>修改內容</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, index) => {
                        return (
                            <tr
                                key={index}
                                id={`editRow${index}`}
                                style={{ fontSize: "1.4rem", fontWeight: "900" }}
                            >
                                <td
                                    style={{ padding: "0" }}
                                    onClick={() => handleSelect(`circle${index}`)}>
                                    <div id={`circle${index}`}
                                        className="circle"
                                        style={{ border: "solid 3px #000", borderRadius: "50%", width: "1.5rem", height: "1.5rem", margin: "0.7rem auto" }}>
                                    </div>
                                </td>
                                <td>{data.eventName}</td>
                                <td>{data.yearMonthDay}</td>
                                <td>{data.locationId}</td>
                                <td style={{ textAlign: "center" }}><a onClick={() => handleContent(data)} style={{ textDecoration: "underline", cursor: "pointer" }}>修改</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div className="contentContainer"
                style={{ position: "absolute", top: "3rem", left: "15rem", padding: "2rem 4rem", backgroundColor: "#A9BDDD", border: "solid 2px #5271A1", display: "none" }}
            >
                <p
                    className="closeContent"
                    style={{ position: "absolute", top: "0.5rem", right: "1rem", cursor: "pointer", fontSize: "1.5rem" }}>X</p>
                <Form>
                    <fieldset disabled>
                        <Stack>
                            <Stack direction="horizontal" gap={2}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>時間：</p>
                                <Form.Group>
                                    <Form.Control className="contentTime0" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                                <Form.Group>
                                    <Form.Control className="contentTime1" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                                <Form.Group>
                                    <Form.Control className="contentTime2" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>地點：（地點編號</p>
                                <Form.Control style={{ width: "5rem" }} className="contentLocationId"></Form.Control>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>）</p>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>國家：</p>
                                <Form.Group>
                                    <Form.Control className="contentCountry" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>城市：</p>
                                <Form.Group>
                                    <Form.Control className="contentCity" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>街道：</p>
                                <Form.Group>
                                    <Form.Control className="contentStreet" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem", width: "7rem" }}>建築名稱：</p>
                                <Form.Control style={{ width: "10rem", maxWidth: "100%" }} className="contentBuilding"></Form.Control>
                            </Stack>
                            <p style={{ margin: "1rem 0 0 0", fontSize: "1.3rem" }}>事件：</p>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>事件名稱：</p>
                                <Form.Group>
                                    <Form.Control className="contentEventName" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>事件種類代號：</p>
                                <Form.Group>
                                    <Form.Control className="contentTypeId" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>花費：</p>
                                <Form.Group>
                                    <Form.Control className="contentCost" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>事件心情：</p>
                                <Form.Group>
                                    <Form.Control className="contentMood" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>開始時間：</p>
                                <Form.Group>
                                    <Form.Control className="contentStartTime" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>結束時間：</p>
                                <Form.Group>
                                    <Form.Control className="contentEndTime" />
                                </Form.Group>
                            </Stack>
                        </Stack>
                    </fieldset>
                </Form>
            </div>
        </div>
    )
}

export default EditTable;