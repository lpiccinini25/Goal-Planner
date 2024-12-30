import api from "../api";
import React, {useState, useEffect} from "react";

function Stats({timestamp, reloadTrigger}) {
    const [MonthlyPoints, setMonthlyPoints] = useState(0)
    const [WeeklyPoints, setWeeklyPoints] = useState(0)
    const [LastWeeksPoints, setLastWeekPoints] = useState(0)
    const [Difference, setDifference] = useState("")
    const [UpOrDown, setUpOrDown] = useState("")

    
    const getTasks = async (period, timestamp) => {
        try {
        const res = await api.get(`/api/tasks/${period}/?timestamp=${timestamp}`)
        console.log(`/api/tasks/${period}/`)
        console.log(res.data);
        return res.data;
        } catch (err) {
            alert(err)
        }
    };

    const calculatePoints = (Tasks) => {
        let total = 0
        console.log('ran')
        for (const task of Tasks) {
            if (task.complete === true) {
                total += task.importance
            }
        }
        return total
    }

    const CalculateDifference = () => {
        if (LastWeeksPoints === 0 & WeeklyPoints !== 0) {
            setDifference("are infinitely better")
        } else if (LastWeeksPoints === WeeklyPoints) {
            setDifference("did not change")
        } else {
            const Percentage = WeeklyPoints / LastWeeksPoints
            if (Percentage < 1) {
                setDifference(100*(1-Percentage))
                setUpOrDown("Decreased")
            } else {
                setDifference(100*(Percentage-1))
                setUpOrDown("Increased")
            }

        }
    }

    useEffect(() => {
        async function fetchData() {
          const MonthlyTasks = await getTasks("thismonth", timestamp);
          const WeeklyTasks = await getTasks("thisweek", timestamp);
          const LastWeeksTasks = await getTasks("lastweek", timestamp);
      
          setMonthlyPoints(calculatePoints(MonthlyTasks));
          setWeeklyPoints(calculatePoints(WeeklyTasks));
          setLastWeekPoints(calculatePoints(LastWeeksTasks));
        }

        fetchData();
    }, [timestamp, reloadTrigger]);

    useEffect(() => {
        CalculateDifference();
    }, [WeeklyPoints, LastWeeksPoints])

    return (
        <div>
            <h1>Completed Monthly Tasks {MonthlyPoints}</h1>
            <h1>Completed Weekly Tasks {WeeklyPoints}</h1>
            <h1>You {UpOrDown} {Difference} compared to last week</h1>
        </div>
    )
}

export default Stats