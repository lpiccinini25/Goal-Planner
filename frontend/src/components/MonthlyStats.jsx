import api from "../api";
import React, {useState, useEffect} from "react";

function MonthlyStats({timestamp}) {
    const [Tasks, setTasks] = useState([])
    const [MonthlyPoints, setMonthlyPoints] = useState(0)

    
    const getTasks = (timestamp) => {
        api
            .get(`/api/tasks/thismonth/?timestamp=${timestamp}`)
            .then((res) => res.data)
            .then((data) => {
                setTasks(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const calculatePoints = (Tasks) => {
        let total = 0
        console.log('ran')
        for (const task of Tasks) {
            if (task.complete === true) {
                total += task.importance
            }
        }
        setMonthlyPoints(total)
    }

    useEffect(() => {
        getTasks(timestamp);
      }, [timestamp]); 
      
    useEffect(() => {
    if (Tasks.length) {
        calculatePoints(Tasks);
    }}, [Tasks]);

    return (
        <h1>Completed Monthly Tasks {MonthlyPoints}</h1>
    )
}

export default MonthlyStats