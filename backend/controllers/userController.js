const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const crypto = require('crypto');


// generate an email verification token for the user to verify the email address.
function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex'); // generate a random string
}

// Function to handle user registration(sign up).
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        // Check if the email and username are unique
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
          return res.status(400).json({ error: 'Email is already in use.' });
        }
    
        const usernameExists = await User.findOne({ where: { username } });
        if (usernameExists) {
          return res.status(400).json({ error: 'Username is already in use.' });
        }
    
        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Save the new user to the database
        const newUser = await User.create({
          username,
          email,
          password_hash: hashedPassword,
          created_at: new Date(),
        });
    
        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully.', user: newUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
      }
};

exports.loginUser = async (req, res) => {
  // Your login logic here
};
