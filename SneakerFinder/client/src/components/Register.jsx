import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/register.css';

function Register() {
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
            <div className="register-container">
                <h2>Register</h2>
                <form id="registerForm">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                    />

                    <button type="submit">Register</button>
                </form>
                <p id="message"></p>

                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>

            <Link to="/">
                <button className="homepage-btn">Go to Homepage</button>
            </Link>
        </div>
    );
}

export default Register;
