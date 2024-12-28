import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [timestamp, setTimestamp] = useState(date.getTime());

    const onChange = date => {
        setDate(date);
        const temp = date.getTime();
        setTimestamp(temp);
        getNotes(temp);
    };

    useEffect(() => {
        getNotes(timestamp);
    }, [timestamp]);

    const getNotes = (timestamp) => {
        api
            .get(`/api/notes/?timestamp=${timestamp}`)
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes(timestamp);
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post(`/api/notes/?timestamp=${timestamp}`, { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes(timestamp);
            })
            .catch((err) => alert(err));
    };


    return (
        <div>
            <div>
                <Calendar onChange={onChange} value={date} />
                {console.log(timestamp)}
            </div>
            <div>
                <h2>{timestamp}</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;