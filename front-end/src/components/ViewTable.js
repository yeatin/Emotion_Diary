import Table from 'react-bootstrap/Table';
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

const ViewTable = ({ datas, setDatas, viewMode, timeRange, chosenData, setChosenData, chosenType, keywordDatas }) => {

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
        const contentTypeName = document.querySelector(".contentTypeName");
        const contentCost = document.querySelector(".contentCost");
        const contentMood = document.querySelector(".contentMood");
        const contentStartTime = document.querySelector(".contentStartTime");
        const contentEndTime = document.querySelector(".contentEndTime");
        closeContent.addEventListener("click", () => {
            contentContainer.style.display = "none";
            contentContainer.style.zIndex = "-1";
        });
        contentTime0.value = data.yearMonthDay.slice(0, 4)
        contentTime1.value = data.yearMonthDay.slice(4, 6)
        contentTime2.value = data.yearMonthDay.slice(6, 8)
        contentLocationId.value = data.locationId;
        contentCountry.value = data.country;
        contentCity.value = data.city;
        contentStreet.value = data.street;
        contentBuilding.value = data.building;
        contentEventName.value = data.eventName;
        contentTypeName.value = data.typeName;
        contentCost.value = data.cost.toString();
        contentMood.value = data.mood;
        contentStartTime.value = data.startTime;
        contentEndTime.value = data.endTime;
        toggleWindow("contentContainer");
        contentContainer.style.display = "block";
        contentContainer.style.zIndex = "2";
    }

    return (
        <div>
            <div style={{ position: "relative", overflowY: "auto", height: "35rem", marginTop: "3rem" }}>
                <Table striped bordered hover responsive variant='blue'
                    style={{ margin: "0 auto", width: "90%", backgroundColor: "#B9D8F5" }}>
                    <thead style={{ backgroundColor: "#1F66AB", color: "#fff", borderBottom: "solid 3px #fff" }}>
                        <tr style={{ fontSize: "1.5rem" }}>
                            <th>???????????????Event_name???</th>
                            <th>???_???_??????Year_Month_Day???</th>
                            <th>???????????????Location_id???</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            viewMode === "keyword" ?
                                keywordDatas.map((data, index) => {
                                    if (data)
                                        return (
                                            <tr
                                                key={index}
                                                id={index}
                                                style={{ fontSize: "1.4rem", fontWeight: "900", cursor: "pointer" }}
                                                onClick={() => handleContent(data)}>
                                                <td>{data.eventName}</td>
                                                <td>{data.yearMonthDay}</td>
                                                <td>{data.locationId}</td>
                                            </tr>
                                        )
                                    return null;
                                })
                                :
                                datas.map((data, index) => {
                                    if (viewMode === "time") {
                                        return timeRange[0] <= data.yearMonthDay && data.yearMonthDay <= timeRange[1] ? (
                                            <tr
                                                key={`row${index}`}
                                                id={`row${index}`}
                                                style={{ fontSize: "1.4rem", fontWeight: "900", cursor: "pointer" }}
                                                onClick={() => handleContent(data)}>
                                                <td>{data.eventName}</td>
                                                <td>{data.yearMonthDay}</td>
                                                <td>{data.locationId}</td>
                                            </tr>
                                        )
                                            : null;
                                    }
                                    else if (viewMode === "type") {
                                        return data.typeName === chosenType ? (
                                            <tr
                                                key={`row${index}`}
                                                id={`row${index}`}
                                                style={{ fontSize: "1.4rem", fontWeight: "900", cursor: "pointer" }}
                                                onClick={() => handleContent(data)}>
                                                <td>{data.eventName}</td>
                                                <td>{data.yearMonthDay}</td>
                                                <td>{data.locationId}</td>
                                            </tr>
                                        )
                                            : null;
                                    }
                                    else {
                                        return (
                                            <tr
                                                key={index}
                                                id={index}
                                                style={{ fontSize: "1.4rem", fontWeight: "900", cursor: "pointer" }}
                                                onClick={() => handleContent(data)}>
                                                <td>{data.eventName}</td>
                                                <td>{data.yearMonthDay}</td>
                                                <td>{data.locationId}</td>
                                            </tr>
                                        )
                                    }
                                })}
                    </tbody>
                </Table>
            </div>
            <div className="contentContainer smallWindow" id="contentContainer"
                style={{ position: "absolute", top: "5rem", left: "15rem", padding: "2rem 4rem", backgroundColor: "#A9BDDD", border: "solid 2px #5271A1", display: "none" }}
            >
                <p
                    className="closeContent"
                    style={{ position: "absolute", top: "0.5rem", right: "1rem", cursor: "pointer", fontSize: "1.5rem" }}>X</p>
                <Form>
                    <fieldset disabled>
                        <Stack>
                            <Stack direction="horizontal" gap={2}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>?????????</p>
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
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>????????????????????????</p>
                                <Form.Control style={{ width: "5rem" }} className="contentLocationId"></Form.Control>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>???</p>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control className="contentCountry" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control className="contentCity" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control className="contentStreet" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem", width: "7rem" }}>???????????????</p>
                                <Form.Control style={{ width: "10rem", maxWidth: "100%" }} className="contentBuilding"></Form.Control>
                            </Stack>
                            <p style={{ margin: "1rem 0 0 0", fontSize: "1.3rem" }}>?????????</p>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control className="contentEventName" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control className="contentTypeName" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control className="contentCost" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control className="contentMood" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control className="contentStartTime" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>???????????????</p>
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

export default ViewTable;