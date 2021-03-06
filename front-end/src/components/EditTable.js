import Table from 'react-bootstrap/Table';
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

const EditTable = ({ datas, setDatas, chosenData, setChosenData, locations, setLocations, types, setTypes, locationMax, setLocationMax, viewMode, keywordDatas, fetchRevise, fetchNew }) => {

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

    const handleUpdate = (data) => {
        const updateContent = document.forms["updateContent"].elements;
        const updateContentContainer = document.querySelector("#updateContentContainer");
        updateContent.time0.value = data.yearMonthDay.slice(0, 4)
        updateContent.time1.value = data.yearMonthDay.slice(4, 6)
        updateContent.time2.value = data.yearMonthDay.slice(6, 8)
        updateContent.locationId.value = data.locationId;
        updateContent.country.value = data.country;
        updateContent.city.value = data.city;
        updateContent.street.value = data.street;
        updateContent.building.value = data.building;
        updateContent.eventName.value = data.eventName;
        updateContent.typeId.value = data.typeId;
        updateContent.cost.value = data.cost?.toString();
        updateContent.mood.value = data.mood;
        updateContent.startTime.value = data.startTime;
        updateContent.endTime.value = data.endTime;
        toggleWindow("updateContentContainer");
        //updateContentContainer?????????????????????
        updateContentContainer.style.display = "block";
        updateContentContainer.style.zIndex = "2";
    }

    const handleLocation = (event) => {
        let elements;
        if (event.target.id.includes("add")) {
            elements = document.forms["addContent"].elements;
        }
        else {
            elements = document.forms["updateContent"].elements;
        }
        const value = event.target.value;

        if (value === "add") {
            elements.country.value = "";
            elements.city.value = "";
            elements.street.value = "";
            elements.building.value = "";
            elements.country.disabled = false;
            elements.city.disabled = false;
            elements.street.disabled = false;
            elements.building.disabled = false;
            let max = -1;
            locations.forEach((location) => max = location.locationId > max ? location.locationId : max);
            if (max >= 0) {
                setLocationMax(max);
            }
        }
        else {
            locations.forEach((location) => {
                if (location.locationId === parseInt(value)) {
                    elements.country.value = location.country;
                    elements.city.value = location.city;
                    elements.street.value = location.street;
                    elements.building.value = location.building;
                    elements.country.disabled = true;
                    elements.city.disabled = true;
                    elements.street.disabled = true;
                    elements.building.disabled = true;
                    return;
                }
            })
            setLocationMax(-1);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let elements;
        if (event.target.id.includes("add")) {
            elements = document.forms["addContent"].elements;
        }
        else {
            elements = document.forms["updateContent"].elements;
        }
        let newData = {
            Event_name: elements.eventName.value,
            Type_id: parseInt(elements.typeId.value),
            Year: elements.time0.value,
            Month: elements.time1.value,
            Day: elements.time2.value,
            Start_time: elements.startTime.value,
            End_time: elements.endTime.value,
            Location_id: elements.typeId.value,
            Cost: parseInt(elements.cost.value) || 0,
            Mood: elements.mood.value,
            Country: elements.country.value,
            City: elements.city.value,
            Street: elements.street.value,
            Building: elements.building.value
        };

        if (event.target.id.includes("add")) {
            //setDatas(newDatas);
            //call db to insert data
            fetchNew(newData).then(
                result => result ? toggleWindow("addContentContainer") : {}
            )
        }
        else if (event.target.id.includes("update")) {
            //call db to update data
            let oldData = {};
            datas.forEach((data) => {
                if (data.eventName === elements.eventName.value && data.yearMonthDay === elements.time0.value + elements.time1.value + elements.time2.value) {
                    oldData.O_event_name = data.eventName;
                    oldData.O_type_id = data.typeId;
                    oldData.O_year_month_day = data.yearMonthDay;
                    oldData.O_start_time = data.startTime;
                    oldData.O_end_time = data.endTime;
                    oldData.O_location_id = data.locationId;
                    oldData.O_cost = data.cost;
                    oldData.O_mood = data.mood;
                    oldData.O_country = data.country;
                    oldData.O_city = data.city;
                    oldData.O_street = data.street;
                    oldData.O_building = data.building;
                    return;
                }
            })
            newData = { ...newData, ...oldData };
            fetchRevise(newData).then(
                result => result ? toggleWindow("updateContentContainer") : {}
            )
        }

    }

    return (
        <div>
            <div style={{ position: "relative", overflowY: "auto", height: "35rem", marginTop: "3rem" }}>
                <Table striped bordered hover responsive variant='blue'
                    style={{ margin: "0 auto", width: "90%", backgroundColor: "#B9D8F5" }}>
                    <thead style={{ backgroundColor: "#1F66AB", color: "#fff", borderBottom: "solid 3px #fff" }}>
                        <tr style={{ fontSize: "1.5rem" }}>
                            <th>??????</th>
                            <th>???????????????Event_name???</th>
                            <th>???_???_??????Year_Month_Day???</th>
                            <th>???????????????Location_id???</th>
                            <th>????????????</th>
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
                                                    <p
                                                        
                                                        style={{ textDecoration: "underline", cursor: "pointer" }}
                                                    >??????
                                                    </p>
                                                </td>
                                            </tr>
                                        )
                                    return null;
                                })
                                :
                                datas.map((data, index) => {
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
                                                <p
                                                    onClick={() => handleUpdate(data)}
                                                    style={{ textDecoration: "underline", cursor: "pointer" }}
                                                >??????
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })}
                    </tbody>
                </Table>

            </div>
            <div className="smallWindow" id="addContentContainer"
                style={{ position: "absolute", top: "3rem", left: "15rem", padding: "2rem 4rem", backgroundColor: "#A9BDDD", border: "solid 2px #5271A1", display: "none" }}
            >
                <p
                    className="closeContent"
                    style={{ position: "absolute", top: "0.5rem", right: "1rem", cursor: "pointer", fontSize: "1.5rem" }}
                    onClick={() => toggleWindow("addContentContainer")}
                >X
                </p>
                <Form name="addContent">
                    <fieldset>
                        <Stack>
                            <Stack direction="horizontal" gap={2}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>?????????</p>
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
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>??????????????????????????????????????????</p>
                                <Form.Group>
                                    <Form.Select
                                        id="addContentLocationId"
                                        style={{ width: "5rem" }}
                                        name="locationId"
                                        className="contentLocationId"
                                        onChange={handleLocation}
                                    >
                                        <option value="add">??????</option>
                                        {
                                            locations.map((location, index) => {
                                                return <option key={index} value={location.locationId}>{location.locationId}</option>

                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>???</p>
                                {
                                    locationMax >= 0 ?
                                        <Stack direction="horizontal" className="contentAddLocation">
                                            <p style={{ margin: "0", fontSize: "1.3rem" }}>????????????????????????</p>
                                            <p style={{ margin: "0", fontSize: "1.3rem", textDecoration: "underline" }}>{locationMax + 1}</p>
                                            <p style={{ margin: "0", fontSize: "1.3rem" }}>???</p>
                                        </Stack>
                                        : <></>
                                }
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="Country" name="country" className="contentCountry" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="City" name="city" className="contentCity" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="Street" name="street" className="contentStreet" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem", width: "7rem" }}>???????????????</p>
                                <Form.Control placeholder="Building" name="building" style={{ width: "10rem", maxWidth: "100%" }} className="contentBuilding"></Form.Control>
                            </Stack>
                            <p style={{ margin: "1rem 0 0 0", fontSize: "1.3rem" }}>?????????</p>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="Event_name" name="eventName" className="contentEventName" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????????????????</p>
                                <Form.Group>
                                    <Form.Select
                                        style={{ width: "5rem" }}
                                        name="typeId"
                                        className="contentTypeId"
                                    >
                                        {
                                            types.map((type, index) => {
                                                return <option key={index} value={type.typeId}>{type.typeId}</option>

                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="Cost" name="cost" className="contentCost" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="Mood" name="mood" className="contentMood" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="Start_time" name="startTime" className="contentStartTime" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="End_time" name="endTime" className="contentEndTime" />
                                </Form.Group>
                            </Stack>
                            <Button
                                id="addButton"
                                type="submit"
                                variant="primary"
                                style={{ width: "5rem", margin: "1rem auto 0 auto" }}
                                onClick={handleSubmit}
                            >??????
                            </Button>
                        </Stack>
                    </fieldset>
                </Form>
            </div>
            <div className="smallWindow" id="updateContentContainer"
                style={{ position: "absolute", top: "3rem", left: "15rem", padding: "2rem 4rem", backgroundColor: "#A9BDDD", border: "solid 2px #5271A1", display: "none" }}
            >
                <p
                    className="closeContent"
                    style={{ position: "absolute", top: "0.5rem", right: "1rem", cursor: "pointer", fontSize: "1.5rem" }}
                    onClick={() => toggleWindow("updateContentContainer")}
                >X
                </p>
                <Form name="updateContent">
                    <fieldset>
                        <Stack>
                            <Stack direction="horizontal" gap={2}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>?????????</p>
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
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>??????????????????????????????????????????</p>
                                <Form.Group>
                                    <Form.Select
                                        id="updateContentLocationId"
                                        style={{ width: "5rem" }}
                                        name="locationId"
                                        className="contentLocationId"
                                        onChange={handleLocation}
                                    >
                                        <option value="add">??????</option>
                                        {
                                            locations.map((location, index) => {
                                                return <option key={index} value={location.locationId}>{location.locationId}</option>

                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>???</p>
                                {
                                    locationMax >= 0 ?
                                        <Stack direction="horizontal" className="contentAddLocation">
                                            <p style={{ margin: "0", fontSize: "1.3rem" }}>????????????????????????</p>
                                            <p style={{ margin: "0", fontSize: "1.3rem", textDecoration: "underline" }}>{locationMax + 1}</p>
                                            <p style={{ margin: "0", fontSize: "1.3rem" }}>???</p>
                                        </Stack>
                                        : <></>
                                }
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control disabled placeholder="Country" name="country" className="contentCountry" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control disabled placeholder="City" name="city" className="contentCity" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control disabled placeholder="Street" name="street" className="contentStreet" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem", width: "7rem" }}>???????????????</p>
                                <Form.Control disabled placeholder="Building" name="building" style={{ width: "10rem", maxWidth: "100%" }} className="contentBuilding"></Form.Control>
                            </Stack>
                            <p style={{ margin: "1rem 0 0 0", fontSize: "1.3rem" }}>?????????</p>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="Event_name" name="eventName" className="contentEventName" disabled />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????????????????</p>
                                <Form.Group>
                                    <Form.Select
                                        style={{ width: "5rem" }}
                                        name="typeId"
                                        className="contentTypeId"
                                    >
                                        {
                                            types.map((type, index) => {
                                                return <option key={index} value={type.typeId}>{type.typeId}</option>

                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>?????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="Cost" name="cost" className="contentCost" />
                                </Form.Group>
                            </Stack>
                            <Stack direction="horizontal" gap={2} style={{ marginTop: "1rem" }}>
                                <p style={{ margin: "0", fontSize: "1.3rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="Mood" name="mood" className="contentMood" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="Start_time" name="startTime" className="contentStartTime" />
                                </Form.Group>
                                <p style={{ fontSize: "1.5rem", margin: "0 0 0 1rem" }}>???????????????</p>
                                <Form.Group>
                                    <Form.Control placeholder="End_time" name="endTime" className="contentEndTime" />
                                </Form.Group>
                            </Stack>
                            <Button
                                id="updateButton"
                                type="submit"
                                variant="primary"
                                style={{ width: "5rem", margin: "1rem auto 0 auto" }}
                                onClick={handleSubmit}
                            >??????
                            </Button>
                        </Stack>
                    </fieldset>
                </Form>
            </div>
        </div>
    )
}

export default EditTable;