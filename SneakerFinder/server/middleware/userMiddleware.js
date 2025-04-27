const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Nincs jogosultságod ehhez a művelethez' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Érvénytelen token' });
        }

        req.user = decoded;
        next();
    });
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin jogosultság szükséges' });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
