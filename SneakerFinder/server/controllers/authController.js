const jwt = require('jsonwebtoken');
const db = require('../db');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userExists.length > 0) {
            return res.status(400).json({ message: 'Email már létezik!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        res.status(201).json({ message: 'Felhasználó sikeresen regisztrálva!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hiba történt a regisztráció során!' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Hibás email vagy jelszó!' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Hibás email vagy jelszó!' });
        }

        const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Sikeres bejelentkezés', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hiba történt a bejelentkezés során!' });
    }
};

module.exports = { register, login };
