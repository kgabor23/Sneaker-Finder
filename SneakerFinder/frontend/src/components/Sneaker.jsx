import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'frontend/src/styles/sneaker.css';

const shoeData = {
    "YEEZY 350 v2 ZEBRA": {
        images: [
            "/images/sneakers/zebra.webp",
            "/images/sneakers/zebra2.webp",
            "/images/sneakers/zebra3.webp"
        ],
        description: "The Yeezy Boost 350 V2 Zebra is one of the most iconic colorways in the Adidas Yeezy lineup. " +
            "Featuring a black and white striped Primeknit upper, " +
            "it’s a bold statement for any sneaker enthusiast. The design is paired with Adidas' " +
            "Boost cushioning for ultimate comfort. Whether you're wearing them casually " +
            "or as part of a sneaker collection, these shoes never fail to turn heads."
    },
    "YEEZY 350 v2 OREO": {
        images: [
            "/images/sneakers/oreo.webp",
            "/images/sneakers/oreo2.webp",
            "/images/sneakers/oreo3.webp"
        ],
        description: "The Yeezy 350 V2 Oreo features a sleek black Primeknit upper with a " +
            "contrasting white stripe that gives it a unique and stylish look. The Boost cushioning offers superior comfort, " +
            "making it a great choice for all-day wear. This sneaker blends minimalism with high-end sneaker culture, " +
            "making it versatile for many different outfits. " +
            "The Oreo colorway is perfect for those who prefer a subtle yet bold design."
    },
    "YEEZY 350 v2 DAZZLING BLUE": {
        images: [
            "/images/sneakers/dazzling.webp",
            "/images/sneakers/dazzling2.webp",
            "/images/sneakers/dazzling3.webp"
        ],
        description: "The Dazzling Blue Yeezy 350 V2 stands out with its deep black upper and bright electric blue stripe, " +
            "creating a visually striking contrast. The Primeknit upper is both stylish and breathable, " +
            "ensuring comfort with every step. The iconic Boost cushioning guarantees a responsive and soft feel, " +
            "while the blue accent adds a touch of personality to the shoe. " +
            "Whether you're a fan of Yeezys or just looking for a bold sneaker, the Dazzling Blue colorway is a must-have."
    },
    "YEEZY 500 UTILITY BLACK": {
        images: [
            "/images/sneakers/utility.webp",
            "/images/sneakers/utility2.webp",
            "/images/sneakers/utility3.webp"
        ],
        description: "The Yeezy 500 Utility Black offers a sleek monochromatic black design, " +
            "perfect for those who prefer an understated, yet stylish look. " +
            "The combination of premium suede and mesh provides durability and comfort, " +
            "making it ideal for everyday wear. With its chunky silhouette, this sneaker adds an edgy, " +
            "futuristic vibe to any outfit. The Utility Black colorway is versatile, " +
            "fitting seamlessly into both casual and streetwear looks."
    },
    "YEEZY 700 v2 TEPHRA": {
        images: [
            "/images/sneakers/tephra.webp",
            "/images/sneakers/tephra2.webp",
            "/images/sneakers/tephra3.webp"
        ],
        description: "The Yeezy 700 V2 Tephra brings a bold, earthy look with its blend of neutral tones, " +
            "including greys, browns, and blacks. The chunky silhouette and rugged design offer a futuristic, " +
            "yet grounded aesthetic. With its high-quality leather and mesh construction, " +
            "this shoe ensures both comfort and durability. " +
            "It’s perfect for sneakerheads looking for a statement piece that combines both fashion-forward and practical elements."
    },
    "AIR FORCE 1 SUPREME WHITE": {
        images: [
            "/images/sneakers/supremeW.webp",
            "/images/sneakers/supremeW2.webp",
            "/images/sneakers/supremeW3.webp"
        ],
        description: "The Air Force 1 Supreme White is a timeless classic, " +
            "featuring an all-white leather upper that embodies minimalistic elegance. " +
            "The Supreme box logo adds a touch of luxury and streetwear credibility, making this sneaker a coveted item among collectors." +
            " The Air Force 1’s durable construction and cushioned sole make it perfect for daily use. " +
            "Whether paired with jeans or athleisure, this sneaker elevates any outfit with its clean and iconic design."
    },
    "AIR FORCE 1 SUPREME BLACK": {
        images: [
            "/images/sneakers/supremeB.webp",
            "/images/sneakers/supremeB2.webp",
            "/images/sneakers/supremeB3.webp"
        ],
        description: "The Air Force 1 Supreme Black features a sleek, " +
            "all-black design with premium leather that exudes both sophistication and edge. " +
            "The Supreme branding on the side makes this sneaker a statement piece for those who appreciate high-end streetwear. " +
            "Built with a cushioned sole and durable construction, these shoes offer both comfort and style. " +
            "Whether you're hitting the streets or making a fashion statement, " +
            "the Air Force 1 Supreme Black will always be in style."
    },
    "AIR JORDAN 1 BUBBLEGUM": {
        images: [
            "/images/sneakers/bubble.webp",
            "/images/sneakers/bubble2.webp",
            "/images/sneakers/bubble3.webp"
        ],
        description: "Inspired by the playful and nostalgic color of bubblegum, " +
            "the Air Jordan 1 Bubblegum features a striking mix of patent leather and smooth leather. " +
            "The soft pink hues contrast beautifully with the bold black accents, creating a unique, attention-grabbing design. " +
            "The iconic Jordan silhouette is paired with a durable rubber sole that provides comfort and stability. " +
            "Ideal for sneaker collectors or anyone looking for a fun, stylish twist on a classic silhouette."
    }
};

function ShoeDetails() {
    const { id } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const shoe = shoeData[id];

    useEffect(() => {
        if (shoe) {
            document.title = `${id} - Sneaker Details`;
        }
    }, [id]);

    const prevImage = () => {
        setCurrentIndex((currentIndex === 0) ? shoe.images.length - 1 : currentIndex - 1);
    };

    const nextImage = () => {
        setCurrentIndex((currentIndex === shoe.images.length - 1) ? 0 : currentIndex + 1);
    };

    const changeImage = (index) => {
        setCurrentIndex(index);
    };

    if (!shoe) {
        return <div>Shoe not found</div>;
    }

    return (
        <div
            className="shoe-container"
            style={{
                backgroundImage: `url('/images/backgrounds/mainbg.jpg')`
            }}
        >
            <div className="card">
                <h2 className="shoe-title">{id}</h2>
                <div className="carousel">
                    <button onClick={prevImage}>&#9665;</button>
                    <img className="shoe-image" src={shoe.images[currentIndex]} alt="Shoe"/>
                    <button onClick={nextImage}>&#9655;</button>
                </div>
                <div className="thumbnail-container">
                    {shoe.images.map((image, index) => (
                        <img
                            key={index}
                            className="thumbnail"
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => changeImage(index)}
                        />
                    ))}
                </div>
                <p className="shoe-description">{shoe.description}</p>
                <Link to="/finder">
                    <button className="back-button">Back to List</button>
                </Link>
            </div>
        </div>
    );
}

export default ShoeDetails;