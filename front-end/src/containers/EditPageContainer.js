import { useState, useEffect } from "react";
import EditButtons from "../components/EditButtons";
import EditTable from "../components/EditTable";

const EditPageContainer = () => {
    const initialDatas = [
        {
            eventName: "Apple",
            typeId: 1,
            yearMonthDay: "20200530",
            startTime: "",
            endTime: "",
            locationId: 0,
            cost: 50,
            mood: "Happy",
            country: "Taiwan",
            city: "Taipei",
            street: "BackStreet",
            building: ""
        },
        {
            eventName: "Banana",
            typeId: 2,
            yearMonthDay: "20210601",
            startTime: "",
            endTime: "",
            locationId: 1,
            cost: 50,
            mood: "Happy",
            country: "Taiwan",
            city: "Taipei",
            street: "BackStreet",
            building: ""
        },
        {
            eventName: "Candy",
            typeId: 3,
            yearMonthDay: "20220405",
            startTime: "",
            endTime: "",
            locationId: 2,
            cost: 50,
            mood: "Happy",
            country: "Taiwan",
            city: "Taipei",
            street: "BackStreet",
            building: ""
        },
        {
            eventName: "Dance",
            typeId: 4,
            yearMonthDay: "20220220",
            startTime: "",
            endTime: "",
            locationId: 3,
            cost: 50,
            mood: "Happy",
            country: "Taiwan",
            city: "Taipei",
            street: "BackStreet",
            building: ""
        }
    ];
    const initialLocations = [
        {
            locationId: 0,
            country: "Taiwan",
            city: "Taipei",
            street: "BackStreet",
            building: ""
        },
        {
            locationId: 1,
            country: "Taiwan",
            city: "Taipei",
            street: "BackStreet",
            building: ""
        },
        {
            locationId: 2,
            country: "Taiwan",
            city: "Taipei",
            street: "BackStreet",
            building: ""
        },
        {
            locationId: 3,
            country: "Taiwan",
            city: "Taipei",
            street: "BackStreet",
            building: ""
        }
    ]
    const initialTypes = [{
        typeId: 0,
        typeName: "emergency"
    },
    {
        typeId: 1,
        typeName: "school"
    },
    {
        typeId: 2,
        typeName: "work"
    },
    {
        typeId: 3,
        typeName: "food"
    }]
    const [viewMode, setViewMode] = useState("normal");
    const [datas, setDatas] = useState([]);
    const [chosenData, setChosenData] = useState({});
    const [locations, setLocations] = useState([]);
    const [types, setTypes] = useState([]);
    const [locationMax, setLocationMax] = useState(-1);
    const [keywordDatas, setKeywordDatas] = useState([]);

    const convertKeyName = (json) => {
        json.forEach(data => {
            for (let oldKey in data) {
                let temp;
                temp = oldKey.split("_");
                let newKey = temp[0].toLocaleLowerCase();
                temp.forEach((word, index) => {
                    if (index > 0) {
                        word = word[0].toUpperCase() + word.slice(1);
                        newKey += word;
                    }
                });
                data[newKey] = data[oldKey];
            }
        })
    }

    const fetchDatas = async () => {
        try {
            const data = await fetch("http://localhost:5000/view");
            const json = await data.json();
            if ((json.errno || !json.status.includes("record") && !json.status.includes("success"))) {
                throw json;
            }
            fetchLocations();
            fetchTypes();
            convertKeyName(json.data);
            setDatas(json.data);
            setViewMode("normal");
            return "success";
        }
        catch (err) {
            console.log("err in fetching datas", err);
        }
    }

    const fetchRevise = async (dataObj) => {
        try {
            const data = await fetch("http://localhost:5000/revise_data", {
                method: "put",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(dataObj)
            });
            const json = await data.json();
            if ((json.errno || !json.status.includes("record") && !json.status.includes("success"))) {
                throw json;
            }
            console.log("fetchRevise=", json);
            return "success";
        }
        catch (err) {
            console.log("error in fetchRevise", err);
        }
    }

    const fetchNew = async (dataObj) => {
        try {
            const data = await fetch("http://localhost:5000/new_data", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataObj)
            });
            const json = await data.json();
            if ((json.errno || !json.status.includes("record") && !json.status.includes("success"))) {
                throw json;
            }
            fetchDatas();
            return "success";
        }
        catch (err) {
            console.log("error in fetchNew", err);
        }
    }

    const fetchLocations = async () => {
        try {
            const data = await fetch("http://localhost:5000/location");
            const json = await data.json();
            if ((json.errno || !json.status.includes("record") && !json.status.includes("success"))) {
                throw json;
            }
            convertKeyName(json.data);
            setLocations(json.data);
            return "success";
        }
        catch (err) {
            console.log("error in fetchLocations", err);
        }
    }

    const fetchTypes = async () => {
        try {
            const data = await fetch("http://localhost:5000/type");
            const json = await data.json();
            if ((json.errno || !json.status.includes("record") && !json.status.includes("success"))) {
                throw json;
            }
            convertKeyName(json.data);
            setTypes(json.data);
            return "success";
        }
        catch (err) {
            console.log("error in fetchTypes", err);
        }
    }

    const fetchCopy = async (dataObj) => {
        try {
            const data = await fetch("http://localhost:5000/copy_data", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataObj)
            });
            const json = await data.json();
            if ((json.errno || !json.status.includes("record") && !json.status.includes("success"))) {
                throw json;
            }
            fetchDatas();
            return "success";
        }
        catch (err) {
            console.log("error in fetchCopy", err);
        }
    }

    const fetchNewType = async (type) => {
        try {
            const data = await fetch("http://localhost:5000/new_type", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Type_id: type })
            });
            const json = await data.json();
            if ((json.errno || !json.status.includes("record") && !json.status.includes("success"))) {
                throw json;
            }
            fetchDatas();
            return "success";
        }
        catch (err) {
            console.log("error in fetchNewType", err);
        }
    }

    const fetchDeleteData = async (dataObj) => {
        try {
            const data = await fetch("http://localhost:5000/delete_data", {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataObj)
            });
            const json = await data.json();
            if ((json.errno || !json.status.includes("record") && !json.status.includes("success"))) {
                throw json;
            }
            fetchDatas();
            return "success";
        }
        catch (err) {
            console.log("error in fetchCopy", err);
        }
    }

    const fetchDeleteType = async (deleteTypeId) => {
        try {
            const data = await fetch(`http://localhost:5000/delete_type/${deleteTypeId}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await data.json();
            if ((json.errno || !json.status.includes("record") && !json.status.includes("success"))) {
                throw json;
            }
            fetchDatas();
            return "success";
        }
        catch (err) {
            console.log("error in fetchDeleteType", err);
        }
    }

    useEffect(() => {
        fetchDatas();
    }, [])

    useEffect(() => {
        setChosenData({});
    }, [datas])

    useEffect(() => {
        let max = -1;
        locations.forEach((location) => max = location.locationId > max ? location.locationId : max);
        if (max >= 0) {
            setLocationMax(max);
        }
    }, [locations])

    return (
        <div>
            <EditButtons datas={datas} chosenData={chosenData} types={types} setViewMode={setViewMode} setKeywordDatas={setKeywordDatas} fetchCopy={fetchCopy} setLocationMax={setLocationMax} locations={locations} fetchNewType={fetchNewType} fetchDeleteData={fetchDeleteData} fetchDeleteType={fetchDeleteType} />
            <EditTable datas={datas} setDatas={setDatas} chosenData={chosenData} setChosenData={setChosenData} locations={locations} setLocations={setLocations} types={types} setTypes={setTypes} locationMax={locationMax} setLocationMax={setLocationMax} viewMode={viewMode} keywordDatas={keywordDatas} fetchRevise={fetchRevise} fetchNew={fetchNew} />
        </div>
    )
}

export default EditPageContainer;