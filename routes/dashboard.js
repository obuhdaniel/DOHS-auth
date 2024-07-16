// backend/routes/dashboard.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

// Protected route example
router.get('/', authenticate, (req, res) => {
    // Access user information from req.user
    const { username } = req.user;

    res.json({ message: `Welcome, ${username}! This is your protected dashboard.` });
});

module.exports = router;
