import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/login.css';

function Login() {
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    const images = [
        "images/backgrounds/register1.jpg",
        "images/backgrounds/register2.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        document.body.style.background = `url(${images[backgroundIndex]}) center / cover no-repeat`;
    }, [backgroundIndex]);

    return (
        <div>
        <div className="login-container">
            <h2>Log in</h2>
            <form id="loginForm">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />

                <button type="submit">Login</button>
            </form>
            <p id="message"></p>

            <Link to="/register">
                <button>Register</button>
            </Link>
        </div>
    <Link to="/">
        <button className="homepage-btn">Go to Homepage</button>
    </Link>
        </div>
);
}
export default Login;
