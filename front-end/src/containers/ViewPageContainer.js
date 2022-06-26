import { useState, useEffect } from "react";
import ViewButtons from "../components/ViewButtons";
import ViewTable from "../components/ViewTable";
const ViewContainer = () => {
    const [startTime, setStartTime] = useState({ startYear: "", startMonth: "", startDay: "" });
    const [endTime, setEndTime] = useState({ endYear: "", endMonth: "", endDay: "" });
    const [timeRange, setTimeRange] = useState([]);
    const [viewMode, setViewMode] = useState("normal");
    const [chosenType, setChosenType] = useState(-1);

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
    const [datas, setDatas] = useState([]);
    const [chosenData, setChosenData] = useState({});
    const [cost, setCost] = useState(null);
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
            convertKeyName(json.data);
            setDatas(json.data);
        }
        catch (err) {
            console.log("err in fetching datas", err);
        }
    }

    useEffect(() => {
        fetchDatas();
    }, [])

    return (
        <div>
            <ViewButtons startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} setViewMode={setViewMode} setTimeRange={setTimeRange} datas={datas} chosenType={chosenType} setChosenType={setChosenType} cost={cost} setCost={setCost} setKeywordDatas={setKeywordDatas} />
            <ViewTable datas={datas} setDatas={setDatas} startTime={startTime} endTime={endTime} viewMode={viewMode} timeRange={timeRange} chosenData={chosenData} setChosenData={setChosenData} chosenType={chosenType} keywordDatas={keywordDatas} />
        </div>
    )
}

export default ViewContainer;