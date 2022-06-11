import { useState } from "react";
import ViewButtons from "../components/ViewButtons";
import ViewTable from "../components/ViewTable";
const ViewContainer = () => {
    const [startTime, setStartTime] = useState({ startYear: "", startMonth: "", startDay: "" });
    const [endTime, setEndTime] = useState({ endYear: "", endMonth: "", endDay: "" });

    return (
        <div>
            <ViewButtons startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
            <ViewTable />
        </div>
    )
}

export default ViewContainer;