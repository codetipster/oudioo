const express = require('express');
const { registerUser, loginUser, verifyEmail } = require('../controllers/userController');

const router = express.Router();

// Route to register a new user
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user and send a verification email to the user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: An error occurred while registering the user
 */
router.post('/register', registerUser);

// Route to log in a user
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a registered user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Ok! returns a user token
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: An error occurred while logging in the user
 */
router.post('/login', loginUser);

// Route to verify a user's email
/**
 * @swagger
 * /users/verify-email:
 *   get:
 *     summary: Verify a user's email
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Email verification token
 *     responses:
 *       200:
 *         description: Email verified successfully, and user redirected to a success page
 *       400:
 *         description: Verification token has expired
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while verifying the email
 */
router.get('/verify-email', verifyEmail);

module.exports = router;
