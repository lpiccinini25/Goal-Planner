import React, {useState, useEffect} from "react";
import "../styles/Home.css"
import "../styles/Task.css"
import "../styles/Form.css"
import api from "../api";
function Upcoming({timestamp}) {
    const [Tasks, setTasks] = useState([])
    const [tasksDone, setTasksDone] = useState(false)

    const getTasks = async () => {
        const resp = await api.get(`api/tasks/nextmonth/?timestamp=${timestamp}`)
        setTasks(resp.data)
        console.log("future tasks: " + resp.data.length)
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (

        <div>
            {Tasks.map((task) => (
                <h1>{task.title} - {task.task_date}</h1>
                ))}
        </div>
    )
}

export default Upcoming