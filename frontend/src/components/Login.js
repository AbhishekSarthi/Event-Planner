import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SubmitBtn = async () => {
        let data = {
            email,
            password,
        };
        console.log(data);
        await axios.post('/api/login', data);

        setEmail('');
        setPassword('');
    };
    return (
        <div>
            <h3>Login</h3>

            <h3>Email : </h3>
            <input onChange={(e) => setEmail(e.target.value)} value={email} />

            <h3>Password : </h3>
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Link to="/read">
                <button
                    onClick={() => {
                        SubmitBtn();
                    }}
                >
                    Submit
                </button>
            </Link>
        </div>
    );
};

export default Login;
