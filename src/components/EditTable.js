import Table from 'react-bootstrap/Table';
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

const EditTable = ({ datas, setDatas, chosenData, setChosenData, locations, setLocations, types, setTypes, locationMax, setLocationMax }) => {

    const handleSelect = (id, data) => {
        const selectedCircle = document.querySelector(`#${id}`);
        if (data === chosenData) {
            setChosenData({});
            selectedCircle.style.backgroundColor = "transparent";
            selectedCircle.style.borderColor = "#000";
            return;
        }
        const allCircles = document.querySelectorAll(".circle");
        allCircles.forEach(circle => {
            circle.style.backgroundColor = "transparent";
            circle.style.borderColor = "#000";
        })
        selectedCircle.style.backgroundColor = "#BD3E5C";
        selectedCircle.style.borderColor = "#BD3E5C";
        setChosenData(data);
    }

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
        contentCountry.disabled = false;
        contentCity.disabled = false;
        contentStreet.disabled = false;
        contentBuilding.disabled = false;
        toggleWindow("contentContainer");
    }

    const handleLocation = (event) => {
        const contentCountry = document.querySelector(".contentCountry");
        const contentCity = document.querySelector(".contentCity");
        const contentStreet = document.querySelector(".contentStreet");
        const contentBuilding = document.querySelector(".contentBuilding");
        const value = event.target.value;
        console.log("value", value);
        if (value === "新增") {
            contentCountry.value = "";
            contentCity.value = "";
            contentStreet.value = "";
            contentBuilding.value = "";
            contentCountry.disabled = false;
            contentCity.disabled = false;
            contentStreet.disabled = false;
            contentBuilding.disabled = false;
            let max = -1;
            locations.forEach((location) => max = location.locationId > max ? location.locationId : max);
            if (max >= 0) {
                setLocationMax(max);
            }
        }
        else {
            locations.forEach((location) => {
                if (location.locationId == value) {
                    contentCountry.value = location.country;
                    contentCity.value = location.city;
                    contentStreet.value = location.street;
                    contentBuilding.value = location.building;
                    contentCountry.disabled = true;
                    contentCity.disabled = true;
                    contentStreet.disabled = true;
                    contentBuilding.disabled = true;
                    return;
                }
            })
            setLocationMax(-1);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const addContent = document.forms['addContent'];
        const contentContainer = document.querySelector(".contentContainer");
        const elements = addContent.elements;
        const newData = {
            eventName: elements.eventName.value,
            typeId: parseInt(elements.typeId.value),
            yearMonthDay: elements.time0.value + elements.time1.value + elements.time2.value,
            startTime: elements.startTime.value,
            endTime: elements.endTime.value,
            locationId: elements.typeId.value,
            cost: parseInt(elements.cost.value),
            mood: elements.mood.value,
            country: elements.country.value,
            city: elements.city.value,
            street: elements.street.value,
            building: elements.building.value
        };
        //send to db
        //setDatas();
        //console.log("newData: ", newData);
        contentContainer.style.display = "none";
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
                                    onClick={() => handleSelect(`circle${index}`, data)}>
                                    <div id={`circle${index}`}
                                        className="circle"
                                        style={{ border: "solid 3px #000", borderRadius: "50%", width: "1.5rem", height: "1.5rem", margin: "0.7rem auto" }}>
                                    </div>
                                </td>
                                <td>{data.eventName}</td>
                                <td>{data.yearMonthDay}</td>
                                <td>{data.locationId}</td>
                                <td style={{ textAlign: "center" }}>
                                    <a
                                        onClick={() => handleContent(data)}
                                        style={{ textDecoration: "underline", cursor: "pointer" }}
                                    >修改
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div className="contentContainer smallWindow" id="contentContainer"
                style={{ position: "absolute", top: "3rem", left: "15rem", padding: "2rem 4rem", backgroundColor: "#A9BDDD", border: "solid 2px #5271A1", display: "none" }}
            >
                <p
                    className="closeContent"
                    style={{ position: "absolute", top: "0.5rem", right: "1rem", cursor: "pointer", fontSize: "1.5rem" }}
                    onClick={() => {
                        const contentContainer = document.querySelector(".contentContainer");
                        contentContainer.style.display = "none";
                    }}
                >X
                </p>
                <Form name="addContent">
                    <fieldset>
                        <Stack>
                            <Stack direction="horizontal" gap={2}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>時間：</p>
                                <Form.Group>
                                    <Form.Control placeholder="YYYY" name="time0" className="contentTime0" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                                <Form.Group>
                                    <Form.Control placeholder="MM" name="time1" className="contentTime1" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0" }}>\</p>
                                <Form.Group>
                                    <Form.Control placeholder="DD" name="time2" className="contentTime2" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>地點：（查詢已儲存的地點編號</p>
                                <Form.Group>
                                    <Form.Select
                                        style={{ width: "5rem" }}
                                        name="locationId"
                                        className="contentLocationId"
                                        onChange={handleLocation}
                                    >
                                        <option value="add">新增</option>
                                        {
                                            locations.map((location) => {
                                                return <option value={location.locationId}>{location.locationId}</option>

                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>）</p>
                                {
                                    locationMax >= 0 ?
                                        <Stack direction="horizontal" className="contentAddLocation">
                                            <p style={{ margin: "0", fontSize: "1.3rem" }}>（新增地點編號：</p>
                                            <p style={{ margin: "0", fontSize: "1.3rem", textDecoration: "underline" }}>{locationMax}</p>
                                            <p style={{ margin: "0", fontSize: "1.3rem" }}>）</p>
                                        </Stack>
                                        : <></>
                                }
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>國家：</p>
                                <Form.Group>
                                    <Form.Control placeholder="Country" name="country" className="contentCountry" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>城市：</p>
                                <Form.Group>
                                    <Form.Control placeholder="City" name="city" className="contentCity" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>街道：</p>
                                <Form.Group>
                                    <Form.Control placeholder="Street" name="street" className="contentStreet" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem", width: "7rem" }}>建築名稱：</p>
                                <Form.Control placeholder="Building" name="building" style={{ width: "10rem", maxWidth: "100%" }} className="contentBuilding"></Form.Control>
                            </Stack>
                            <p style={{ margin: "1rem 0 0 0", fontSize: "1.3rem" }}>事件：</p>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>事件名稱：</p>
                                <Form.Group>
                                    <Form.Control placeholder="Event_name" name="eventName" className="contentEventName" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>事件種類代號：</p>
                                <Form.Group>
                                    <Form.Select
                                        style={{ width: "5rem" }}
                                        name="typeId"
                                        className="contentTypeId"
                                    >
                                        {
                                            types.map((type) => {
                                                return <option value={type.typeId}>{type.typeId}</option>

                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>花費：</p>
                                <Form.Group>
                                    <Form.Control placeholder="Cost" name="cost" className="contentCost" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>事件心情：</p>
                                <Form.Group>
                                    <Form.Control placeholder="Mood" name="mood" className="contentMood" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>開始時間：</p>
                                <Form.Group>
                                    <Form.Control placeholder="Start_time" name="startTime" className="contentStartTime" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>結束時間：</p>
                                <Form.Group>
                                    <Form.Control placeholder="End_time" name="endTime" className="contentEndTime" />
                                </Form.Group>
                            </Stack>
                            <Button
                                type="submit"
                                variant="primary"
                                style={{ width: "5rem", margin: "1rem auto 0 auto" }}
                                onClick={handleSubmit}
                            >套用
                            </Button>
                        </Stack>
                    </fieldset>
                </Form>
            </div>
        </div>
    )
}

export default EditTable;