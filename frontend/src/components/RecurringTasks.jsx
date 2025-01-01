import React, {useState, useEffect} from "react";
import "../styles/Home.css"
import "../styles/Task.css"
import "../styles/Form.css"
import api from "../api";


function RecurringTasks({ task, onDelete, callback}) {

    const [completed, setCompleted] = useState(task.complete);
    const [show, setShow] = useState(false)


    const handleOnMouseEnter = () => {
        setShow(true)
    }

    const handleOnMouseLeave = () => {
        setShow(false)
    }

    return (
        <div className={`
        ${task.importance === 4 ? 'Essential' : ''}
        ${task.importance ===  3 ? 'Vital' : ''}
        ${task.importance === 2 ? 'Fair' : ''}
        ${task.importance === 1 ? 'Trivial' : 'Unchosen'}
        ${completed === true ? 'task-completed' : 'task-container'}
        `} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            <div className={`checkbox-container`}>
                <span className="task-title">{task.title}</span>
                {show && <button className="delete-button" onClick={() => onDelete(task.id)}>
                Delete
                </button>}
            </div>
        </div>
    );
}

export default RecurringTasks