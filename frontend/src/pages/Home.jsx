import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task"
import "../styles/Home.css"
import Calendar from 'react-calendar'
import '../styles/Calendar.css';
import Dropdown from "../components/Dropdown"
import MonthlyStats from "../components/MonthlyStats"

function Home() {
    const [Tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [timestamp, setTimestamp] = useState(date.getTime());
    const [deleteMode, setDeleteMode] = useState(false)
    const [importance, setImportance] = useState(0)

    const options = ['Essential (4 points)', 'Vital (3 points)', 'Fair (2 points)', 'Trivial (1 point)']

    const setTaskImportance = (value) => {
        setImportance(value)
    }

    const activateDeleteMode = (e) => {
        if (deleteMode === false) {
            setDeleteMode(true)
        } else {
            setDeleteMode(false)
        }
        getTasks(timestamp)
    }

    const onChange = date => {
        setDate(date);
        const temp = date.getTime();
        setTimestamp(temp);
        getTasks(temp);
    };

    useEffect(() => {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        setTimestamp(startOfToday.getTime())
        getTasks(startOfToday.getTime());
    }, []);

    const getTasks = (timestamp) => {
        api
            .get(`/api/tasks/?timestamp=${timestamp}`)
            .then((res) => res.data)
            .then((data) => {
                setTasks(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteTask = (id) => {
        api
            .delete(`/api/task/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!");
                else alert("Failed to delete task.");
                getTasks(timestamp);
            })
            .catch((error) => alert(error));
    };

    const createTask = (e) => {
        e.preventDefault();

        if (importance === 0) {
            alert('Please choose an importance level')
            return;
        }

        api
            .post(`/api/tasks/?timestamp=${timestamp}`, { title , importance})
            .then((res) => {
                if (res.status === 201) alert("Task created!");
                else alert("Failed to make task.");
                getTasks(timestamp);
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="entire-page">
            <div className="top-container">
                <div>
                    <Calendar className="calendar" onChange={onChange} value={date} />
                    {console.log(timestamp)}
                </div>
                <div>
                    <h2>Create a Task</h2>
                    <form onSubmit={createTask}>
                        <label htmlFor="title">Task:</label>
                        <br />
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <Dropdown options={options} callback={setTaskImportance}/>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
                <div>
                    <button onClick={activateDeleteMode}>Delete Tasks</button>
                    <MonthlyStats timestamp={timestamp} />
                </div>
            </div>
            <div className="task-section">
                <h2>{timestamp}</h2>
                {Tasks.map((task) => (
                    <Task task={task} onDelete={deleteTask} key={task.id} show={deleteMode}/>
                ))}
            </div>
        </div>
    );
}
export default Home