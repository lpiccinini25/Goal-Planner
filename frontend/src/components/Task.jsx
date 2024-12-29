import React, {useState} from "react";
import "../styles/Task.css"
import api from "../api";


function Task({ task, onDelete, show}) {
    const formattedDate = new Date(task.created_at).toLocaleDateString("en-US")

    const [completed, setCompleted] = useState(false);
    const complete = async () => {
        try {
            const resp = api.patch(`api/tasks/update/${task.id}/`, {complete : !completed})
            console.log(!completed)
            setCompleted(!completed)
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className="task-container">
            <div className="checkbox-container">
                <span className="task-title">{task.title}</span>
                <input 
                type="checkbox" 
                className="checkbox" 
                id="exampleCheckbox" 
                onChange={complete}
                />
            </div>
            <p className="task-date">{formattedDate}</p>
            {show && <button className="delete-button" onClick={() => onDelete(task.id)}>
                Delete
            </button>}
        </div>
    );
}

export default Task