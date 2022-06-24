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
    const [datas, setDatas] = useState(initialDatas);
    const [chosenData, setChosenData] = useState({});
    const [locations, setLocations] = useState([]);
    const [types, setTypes] = useState([]);
    const [locationMax, setLocationMax] = useState(-1);
    const [keywordDatas, setKeywordDatas] = useState([]);

    const fetchDatas = async () => {
        try {
            const data = await fetch("http://localhost:5000/view");
            const json = await data.json();
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
            setDatas(json);
        }
        catch (err) {
            console.log("err in fetching datas", err);
        }
    }

    useEffect(() => {
        fetchDatas();
    }, [])

    useEffect(() => {
        let max = -1;
        locations.forEach((location) => max = location.locationId > max ? location.locationId : max);
        if (max >= 0) {
            setLocationMax(max);
        }
    }, [locations])

    return (
        <div>
            <EditButtons datas={datas} chosenData={chosenData} types={types} setViewMode={setViewMode} setKeywordDatas={setKeywordDatas} />
            <EditTable datas={datas} setDatas={setDatas} chosenData={chosenData} setChosenData={setChosenData} locations={locations} setLocations={setLocations} types={types} setTypes={setTypes} locationMax={locationMax} setLocationMax={setLocationMax} viewMode={viewMode} keywordDatas={keywordDatas} />
        </div>
    )
}

export default EditPageContainer;