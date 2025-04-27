const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token szükséges a hozzáféréshez!' });
    }

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Érvénytelen token!' });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
