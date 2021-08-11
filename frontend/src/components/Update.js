import React, { useState } from 'react';
import axios from 'axios';
const Update = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [id, setId] = useState('');
    const UpdateBtn = async () => {
        console.log('hello');
        let data = {
            title,
            body,
            author,
        };
        console.log(data);
        await axios.patch(`/api/${id}`, data);
        setId('');
        setTitle('');
        setBody('');
        setAuthor('');
    };

    return (
        <div>
            <h3>Update posts</h3>
            <h3>Enter Id</h3>
            <input onChange={(e) => setId(e.target.value)} value={id} />
            <h3>Title : </h3>
            <input onChange={(e) => setTitle(e.target.value)} value={title} />

            <h3>Body : </h3>
            <input onChange={(e) => setBody(e.target.value)} value={body} />

            <h3>Author : </h3>
            <input onChange={(e) => setAuthor(e.target.value)} value={author} />

            <button
                onClick={() => {
                    UpdateBtn();
                }}
            >
                Update
            </button>
        </div>
    );
};

export default Update;
