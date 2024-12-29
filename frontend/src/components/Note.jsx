import React, {useState} from "react";
import "../styles/Note.css"


function Note({ note, onDelete, show}) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    const [completed, setCompleted] = useState(false);
    const complete = (e) => {
        console.log(e.target.checked);
        setCompleted(e.target.checked);
    };
    return (
        <div className="note-container">
            <div className="checkbox-container">
                <span className="task-title">{note.title}</span>
                <input 
                type="checkbox" 
                className="checkbox" 
                id="exampleCheckbox" 
                checked={completed}
                onChange={complete}
                />
            </div>
            <p className="note-date">{formattedDate}</p>
            {show && <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>}
        </div>
    );
}

export default Note