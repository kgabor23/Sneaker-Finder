import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'frontend/src/styles/homepage.css';

function Homepage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        'images/backgrounds/oreoBackground.jpg',
        'images/backgrounds/zebraBackground.jpg',
        'images/backgrounds/350.webp'
    ];

    useEffect(() => {
        const autoChange = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(autoChange);
    }, []);

    const updateImage = () => {
        document.getElementById("slider").style.transform = `translateX(-${currentIndex * 100}vw)`;
    };

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    useEffect(() => {
        updateImage();
    }, [currentIndex]);

    return (
        <div>
            <div className="top-buttons">
                <button onClick={() => window.location.href = '/login'}>Log in</button>
                <button onClick={() => window.location.href = '/finder'}>Sneakers</button>
            </div>

            <div className="container">
                <div className="slider-wrapper">
                    <div className="slider" id="slider">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="slide"
                                style={{ backgroundImage: `url(${image})` }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="controls">
                    <img
                        className="arrow"
                        src="images/icons/blackArrowLeft.png"
                        alt="Left Arrow"
                        onClick={prevImage}
                    />
                    <img
                        className="arrow"
                        src="images/icons/blackArrowRight.png"
                        alt="Right Arrow"
                        onClick={nextImage}
                    />
                    <Link to="page1.html">
                        <img className="arrow" src="images/icons/road.png" alt="Go to page" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Homepage;