const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authMiddleware');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sneaker_finder'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.get('/', (req, res) => {
    res.send('Szerver működik!');
});

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Ez az email már regisztrálva van!' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, 'user'], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Database insert error' });
            }
            res.status(201).json({ message: 'Regisztráció sikeres' });
        });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Felhasználó nem található' });
        }

        const user = results[0];

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: 'Hibás jelszó' });
        }

        // Token generálása (role hozzáadása a payloadhoz)
        const token = jwt.sign({ email: user.email, id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Bejelentkezés sikeres', token });
    });
});

app.get('/api/shoes', authenticateToken, (req, res) => {
    db.query('SELECT * FROM shoes', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database query error' });
        } else {
            res.json(results);
        }
    });
});

app.post('/api/favorites', authenticateToken, (req, res) => {
    const { shoeId } = req.body;
    const userId = req.user.id;

    db.query('INSERT INTO favorites (user_id, shoe_id) VALUES (?, ?)', [userId, shoeId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Database insert error' });
        }
        res.status(200).json({ message: 'Cipő hozzáadva a kedvencekhez' });
    });
});

app.post('/api/rating', authenticateToken, (req, res) => {
    const { shoeId, rating } = req.body;
    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Értékelésnek 1 és 5 között kell lennie' });
    }

    db.query('INSERT INTO ratings (user_id, shoe_id, rating) VALUES (?, ?, ?)', [userId, shoeId, rating], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Database insert error' });
        }
        res.status(200).json({ message: 'Értékelés sikeres' });
    });
});

app.post('/api/admin/shoes', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Nem jogosult a művelet végrehajtására' });
    }

    const { brand, silhouette, colorway, color, cut } = req.body;

    db.query('INSERT INTO shoes (brand, silhouette, colorway, color, cut) VALUES (?, ?, ?, ?, ?)', [brand, silhouette, colorway, color, cut], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Database insert error' });
        }
        res.status(201).json({ message: 'Cipő sikeresen hozzáadva' });
    });
});

app.delete('/api/admin/comments/:id', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Nem jogosult a művelet végrehajtására' });
    }

    const commentId = req.params.id;

    db.query('DELETE FROM comments WHERE id = ?', [commentId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Database delete error' });
        }
        res.status(200).json({ message: 'Komment sikeresen törölve' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
