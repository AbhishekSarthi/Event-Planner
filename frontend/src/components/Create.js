import React, { useState } from 'react';
import axios from 'axios';
const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');

    const SubmitBtn = async () => {
        let data = {
            title,
            body,
            author,
        };
        console.log(data);
        await axios.patch('/api', data);
        setTitle('');
        setBody('');
        setAuthor('');
    };

    return (
        <>
            <h3>Add an Event</h3>
            <h3>Title : </h3>
            <input onChange={(e) => setTitle(e.target.value)} value={title} />

            <h3>Body : </h3>
            <input onChange={(e) => setBody(e.target.value)} value={body} />

            <h3>Author : </h3>
            <input onChange={(e) => setAuthor(e.target.value)} value={author} />

            <button
                onClick={() => {
                    SubmitBtn();
                }}
            >
                Submit
            </button>
        </>
    );
};

export default Create;
