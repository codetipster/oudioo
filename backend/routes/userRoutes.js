const express = require('express');
const { registerUser, loginUser, verifyEmail } = require('../controllers/userController');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to verify a user's email
router.get('/verify-email', verifyEmail);

module.exports = router;
