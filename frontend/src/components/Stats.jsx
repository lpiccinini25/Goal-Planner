import api from "../api";
import React, {useState, useEffect} from "react";
import "../styles/Stats.css"

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
            setDifference("an infinitely greater ")
            setUpOrDown("of")
        } else if (LastWeeksPoints === WeeklyPoints) {
            setDifference("the same")
            setUpOrDown("of")
        } else {
            const Percentage = WeeklyPoints / LastWeeksPoints
            if (Percentage < 1) {
                setDifference(Math.round(100*(1-Percentage)))
                setUpOrDown("less")
            } else {
                setDifference(Math.round(100*(Percentage-1)))
                setUpOrDown("more")
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
            <h1 className="stats">Earned Points This Month: {MonthlyPoints}</h1>
            <h1 className="stats">Earned Points This Week: {WeeklyPoints}</h1>
            <h1 className="stats">You earned {Difference}% {UpOrDown} points compared to last week</h1>
        </div>
    )
}

export default Stats