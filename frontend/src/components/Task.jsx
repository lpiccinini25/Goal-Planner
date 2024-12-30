import React, {useState, useEffect} from "react";
import "../styles/Task.css"
import api from "../api";


function Task({ task, onDelete, show}) {

    const [completed, setCompleted] = useState(task.complete);

    const completeTask = async () => {
        try {
            const resp = api.patch(`api/tasks/update/${task.id}/`, {complete : !completed})
            console.log(!completed)
            setCompleted(!completed)
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className={`
        task-container
        ${task.importance === 4 ? 'Essential' : ''}
        ${task.importance ===  3 ? 'Vital' : ''}
        ${task.importance === 2 ? 'Fair' : ''}
        ${task.importance === 1 ? 'Trivial' : 'Unchosen'}
        `}>
            <div className={`checkbox-container`}>
                <span className="task-title">{task.title}</span>
                <input 
                type="checkbox" 
                className="checkbox" 
                id="exampleCheckbox" 
                onChange={completeTask}
                checked={completed}
                />
            </div>
            {show && <button className="delete-button" onClick={() => onDelete(task.id)}>
                Delete
            </button>}
        </div>
    );
}

export default Task