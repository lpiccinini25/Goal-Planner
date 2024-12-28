import React, {useState} from "react";
import "../styles/Note.css"


function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    const [completed, setCompleted] = useState(false);
    const complete = (e) => {
        console.log(e.target.checked);
        setCompleted(e.target.checked);
    };
    return (
        <div className="note-container">
            <div class="title-checkbox-row">
                <h1 class="title">{note.title}</h1>
                <input 
                type="checkbox" 
                class="checkbox" 
                id="exampleCheckbox" 
                checked={completed}
                onChange={complete}
                />
            </div>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note