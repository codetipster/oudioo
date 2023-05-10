const express = require('express');
const { registerUser,
    loginUser, 
    verifyEmail, 
    logoutUser, 
    getAllUsers, 
    resetPassword,
    confirmResetPassword,
    getUserById  
   } = require('../controllers/userController');

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


/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout a user by clearing the stored JWT token on the client side
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: An error occurred while logging out the user
 */
router.post('/logout', logoutUser);


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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all registered users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns a list of all registered users
 *       500:
 *         description: An error occurred while fetching users
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Send a password reset email to the user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while processing the password reset request
 */
router.post('/reset-password', resetPassword);

// Route to confirm reset password
/**
 * @swagger
 * /users/confirm-reset-password:
 *   post:
 *     summary: Confirm and reset the user's password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password has been successfully updated
 *       400:
 *         description: Password reset token has expired
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while resetting the password
 */
router.post('/confirm-reset-password', confirmResetPassword);

// Route to get a specific user by id
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a specific user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while retrieving the user
 */
router.get('/:id', getUserById);



module.exports = router;
