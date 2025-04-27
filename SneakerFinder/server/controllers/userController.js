const db = require('../db');

const getUser = (req, res) => {
    const { email } = req.params;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Hiba történt a felhasználói adatok lekérdezésekor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Felhasználó nem található' });
        }
        res.json(results[0]);
    });
};

const updateUser = (req, res) => {
    const { email } = req.params;
    const { name, password } = req.body;

    db.query('UPDATE users SET name = ?, password = ? WHERE email = ?', [name, password, email], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Hiba történt a felhasználó frissítésekor' });
        }
        res.json({ message: 'Felhasználó frissítve' });
    });
};

const deleteUser = (req, res) => {
    const { email } = req.params;

    db.query('DELETE FROM users WHERE email = ?', [email], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Hiba történt a felhasználó törlésénél' });
        }
        res.json({ message: 'Felhasználó törölve' });
    });
};

const setAdmin = (req, res) => {
    const { email } = req.params;

    db.query('UPDATE users SET role = "admin" WHERE email = ?', [email], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Hiba történt az admin jogosultság beállításakor' });
        }
        res.json({ message: 'Felhasználó adminná téve' });
    });
};

module.exports = { getUser, updateUser, deleteUser, setAdmin };
