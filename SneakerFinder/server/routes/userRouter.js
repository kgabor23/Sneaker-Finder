const express = require('express');
const { getUser, updateUser, deleteUser, setAdmin } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middlewares/userMiddleware');

const router = express.Router();

router.get('/users/:email', authMiddleware, getUser);

router.put('/users/:email', authMiddleware, updateUser);

router.delete('/users/:email', authMiddleware, adminMiddleware, deleteUser);

router.put('/users/:email/set-admin', authMiddleware, adminMiddleware, setAdmin);

module.exports = router;
