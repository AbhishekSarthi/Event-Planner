import React, { useState } from 'react';
import axios from 'axios';

const Delete = () => {
    const [id, setId] = useState('');

    const DeleteBtn = async () => {
        console.log('hello');
        await axios.delete(`/api/${id}`);
        setId('');
    };
    return (
        <div>
            <h3>Delete a posts</h3>
            <h3>Enter Id</h3>
            <input onChange={(e) => setId(e.target.value)} value={id} />

            <button
                onClick={() => {
                    DeleteBtn();
                }}
            >
                Delete
            </button>
        </div>
    );
};

export default Delete;
