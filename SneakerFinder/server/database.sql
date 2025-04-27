CREATE DATABASE IF NOT EXISTS sneaker_finder;

USE sneaker_finder;

CREATE TABLE IF NOT EXISTS shoes (
    id VARCHAR(255) PRIMARY KEY,
    brand VARCHAR(255),
    silhouette VARCHAR(255),
    colorway VARCHAR(255),
    color VARCHAR(255),
    cut VARCHAR(255)
    );

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255),
    shoe_id VARCHAR(255),
    comment_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (shoe_id) REFERENCES shoes(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255),
    shoe_id VARCHAR(255),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (shoe_id) REFERENCES shoes(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255),
    shoe_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (shoe_id) REFERENCES shoes(id) ON DELETE CASCADE
    );

INSERT INTO shoes (id, brand, silhouette, colorway, color, cut) VALUES
    ('CP9654', 'Adidas', 'Yeezy 350', 'Zebra', 'white', 'low'),
    ('BY1604', 'Adidas', 'Yeezy 350', 'Oreo', 'black', 'low'),
    ('GY7164', 'Adidas', 'Yeezy 350', 'Dazzling Blue', 'black', 'low'),
    ('F36640', 'Adidas', 'Yeezy 500', 'Utility Black', 'black', 'low'),
    ('FU7914', 'Adidas', 'Yeezy 700', 'Tephra', 'grey', 'low'),
    ('CU9225-100', 'Nike', 'Air Force 1', 'Supreme White', 'white', 'low'),
    ('CU9225-001', 'Nike', 'Air Force 1', 'Supreme Black', 'black', 'low'),
    ('DD9335-641', 'Nike', 'Jordan 1', 'Atmosphere', 'pink', 'high');

INSERT INTO users (name, email, password, role) VALUES
    ('Gabor Kovacs', 'kg.gabor23@gmail.com', '$2y$10$Q4.r9j5fQ.c82YGX/70wkeh1Lg9y5i8/a5.V7b3y.r1y7Vw2.c74m', 'admin'),
    ('Test User', 'user@mail.com', '$2y$10$nF.r8k7fQ.d93ZGX/81xkeh2Mg0z6j9/b6.W8c4z.s2z8Wx3.d85n', 'user');
