import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <h1>Event app</h1>
                <Link to="/">
                    <h3 className="small-box">Home </h3>
                </Link>

                <Link to="/read">
                    <h3 className="small-box">Read </h3>
                </Link>
                <Link to="/login">
                    <h3 className="small-box">Login </h3>
                </Link>
                <Link to="/register">
                    <h3 className="small-box">Register </h3>
                </Link>
            </div>
        </>
    );
};

export default Navbar;
