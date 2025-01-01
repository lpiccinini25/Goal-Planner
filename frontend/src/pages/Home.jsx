import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task"
import "../styles/Home.css"
import Calendar from 'react-calendar'
import '../styles/Calendar.css';
import Dropdown from "../components/Dropdown"
import Stats from "../components/Stats"
import RecurringTasks from "../components/RecurringTasks";

function Home() {
    const [Tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [timestamp, setTimestamp] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime());
    const [deleteMode, setDeleteMode] = useState(false)
    const [importance, setImportance] = useState(0)
    const [currentDate, setCurrentDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
    const [reloadTrigger, setReloadTrigger] = useState(0)
    const [recurring, setRecurring] = useState(false)
    const [recurringTasks, setRecurringTasks] = useState([])
    const [hasRecurring, setHasRecurring] = useState(false)
    const [tasksLoaded, setTasksLoaded] = useState(false); 
    const [tasksProcessed, setTasksProcessed] = useState(false);

    const options = ['Essential (4 points)', 'Vital (3 points)', 'Fair (2 points)', 'Trivial (1 point)']

    const causeReload = () => {
        setReloadTrigger(prev => prev + 1)
    }

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
        createRecurringTasks()
    }

    const onChange = date => {
        const dateOnly = date.toISOString().split("T")[0];
        setDate(dateOnly);
        const temp = date.getTime();
        setTimestamp(temp);
        getTasks(temp);
    };

    useEffect(() => {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const dateOnly = startOfToday.toISOString().split("T")[0];
        setDate(dateOnly);
        setTimestamp(startOfToday.getTime())
        getTasks(startOfToday.getTime());
    }, []);

    const getTasks = async (timestamp) => {
        try {
          const res = await api.get(`/api/tasks/?timestamp=${timestamp}`);
          setTasks(res.data);
        } catch (err) {
          alert(err);
        } finally {
          // Mark that we've finished loading tasks (even if empty)
          setTasksLoaded(true);
        }
      };

    const deleteTask = (id) => {
        api
            .delete(`/api/task/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!");
                else alert("Failed to delete task.");
                getTasks(timestamp);
                createRecurringTasks()
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
            .post(`/api/tasks/?timestamp=${timestamp}`, { title , importance, recurring})
            .then((res) => {
                if (res.status === 201) alert("Task created!");
                else alert("Failed to make task.");
                getTasks(timestamp);
            })
            .catch((err) => alert(err));
    };

    const createTaskRecurring = async (title, importance) => {
        try {
          await api.post(`/api/tasks/?timestamp=${currentDate.getTime()}`, {
            title,
            importance,
          });
        } catch (err) {
          alert(err);
        }
      };
    const handleRecurring = () => {
        setRecurring(!recurring)
    }

    const createRecurringTasks = async () => {
        try {
          const resp = await api.get("/api/tasks/recurring/");
          const fetchedRecurringTasks = resp.data;
          console.log("Recurring tasks fetched:", fetchedRecurringTasks);
    
          setRecurringTasks(fetchedRecurringTasks);
    
          const currentTaskTitles = new Set(Tasks.map((t) => t.title));

          console.log(currentTaskTitles.size)
          const tasksToCreate = fetchedRecurringTasks.filter(
            (t) => !currentTaskTitles.has(t.title)
          );
    
          for (const task of tasksToCreate) {
            await createTaskRecurring(task.title, task.importance);
          }
    
          getTasks(timestamp);
        } catch (err) {
          console.error("Error fetching recurring tasks:", err);
        }
      };
    

    useEffect(() => {
        if (!tasksProcessed && tasksLoaded) {
          console.log("Creating recurring tasks for today...");
          setTasksProcessed(true); 
          createRecurringTasks();
        }
      }, [Tasks, timestamp, currentDate, tasksProcessed]);
    
    useEffect(() => {
        if (recurringTasks.length === 0) {
            setHasRecurring(false)
          } else {
            setHasRecurring(true)
          }
    }, [recurringTasks])


    return (
        <div className="entire-page">
            <div className="top-container">
                <div>
                    <Calendar className="calendar" onChange={onChange} value={new Date(timestamp)} />
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
                        <div className="inline">
                            <span className="recurring">Make Recurring</span>
                            <input type="checkbox" className="checkbox" onClick={handleRecurring}></input>
                        </div>
                        <Dropdown options={options} callback={setTaskImportance}/>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
                <div>
                    <Stats reloadTrigger={reloadTrigger} timestamp={currentDate.getTime()} />
                </div>
            </div>
            <div className="task-section">
                <h1>Tasks For {date}</h1>
                {Tasks.map((task) => (
                    <Task task={task} onDelete={deleteTask} key={task.id} callback={causeReload}/>
                ))}
            </div>
            <div className="recurring-tasks">
                <h1>Recurring Tasks</h1>
                {hasRecurring && recurringTasks.map((task) => (
                    <RecurringTasks task={task} onDelete={deleteTask} key={task.id} callback={causeReload}/>
                ))}
                {!hasRecurring && <h2>    No Recurring Tasks</h2>}
            </div>

        </div>
    );
}
export default Home