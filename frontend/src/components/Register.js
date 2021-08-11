import React, { useState } from 'react';
import axios from 'axios';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SubmitBtn = async () => {
        let data = {
            name,
            email,
            password,
        };
        console.log(data);
        await axios.post('/api/register', data);
        setName('');
        setEmail('');
        setPassword('');
    };
    return (
        <div>
            <h3>Login</h3>
            <h3>Name : </h3>
            <input onChange={(e) => setName(e.target.value)} value={name} />

            <h3>Email : </h3>
            <input onChange={(e) => setEmail(e.target.value)} value={email} />

            <h3>Password : </h3>
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button
                onClick={() => {
                    SubmitBtn();
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default Register;
