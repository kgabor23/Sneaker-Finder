const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.get('/', (req, res) => {
    res.send('Hello from Sneaker Finder Backend!');
});

app.get('/api/shoes', (req, res) => {
    const sql = "SELECT * FROM shoes";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(data);
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
