import { useState } from "react";
import ViewButtons from "../components/ViewButtons";
import ViewTable from "../components/ViewTable";
const ViewContainer = () => {
    const [startTime, setStartTime] = useState({ startYear: "", startMonth: "", startDay: "" });
    const [endTime, setEndTime] = useState({ endYear: "", endMonth: "", endDay: "" });
    const [timeRange, setTimeRange] = useState([]);
    const [viewMode, setViewMode] = useState("normal");

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
    const [datas, setDatas] = useState(initialDatas);
    const [chosenData, setChosenData] = useState({});

    return (
        <div>
            <ViewButtons startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} setViewMode={setViewMode} setTimeRange={setTimeRange} datas={datas} />
            <ViewTable datas={datas} setDatas={setDatas} startTime={startTime} endTime={endTime} viewMode={viewMode} timeRange={timeRange} chosenData={chosenData} setChosenData={setChosenData} />
        </div>
    )
}

export default ViewContainer;