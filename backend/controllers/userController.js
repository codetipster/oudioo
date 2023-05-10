const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const crypto = require('crypto');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/emailService'); //import the sendVerificationEmail function from the mailer service


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
          return res.status(400).json({ error: 'Email is already in use.', email });
        }
    
        const usernameExists = await User.findOne({ where: { username } });
        if (usernameExists) {
          return res.status(400).json({ error: 'Username is already in use.', username });
        }
    
        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate an email verification token for the user to verify the email address.
        const verificationToken = generateVerificationToken();

        // Set the expiration time for the verification token
        const verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        // Save the new user to the database
        const newUser = await User.create({
            username,
            email,
            password_hash: hashedPassword,
            created_at: new Date(),
            verification_token: verificationToken,
            verification_token_expires: verificationTokenExpires,
        });

        // Send the verification email to the user
        await sendVerificationEmail(email, verificationToken);
    
        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully.', user: newUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user.', details: error.message });
      }
};

exports.verifyEmail = async (req, res) => {
    try {
      // Get the token from the request URL
      const { token } = req.query;
  
      // Find the user with the matching verification token
      const user = await User.findOne({ where: { verification_token: token } });
  
      // If the user is not found, return an error response
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Check if the verification token has expired
      if (user.verification_token_expires < new Date()) {
        return res.status(400).json({ error: 'Verification token has expired.' });
      }
  
      // Update the user's status to "verified" and clear the verification token and expiration time
      await user.update({
        status: 'verified',
        verification_token: null,
        verification_token_expires: null,
      });


        // Respond with a success message
      console.log('User verified successfully.');
  
      // Redirect the user to a success page
      return res.redirect('/verify-email/success');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while verifying the email.' });
    }
};


// Function to handle user login.
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if the email is registered
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
  
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
  
    // Generate a JWT token for the user that expires in 1 hour
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    // Respond with the token which the client stores and sends in subsequent requests to authenticate the user when accesing protected routes
    res.json({ token });
};

// Function to handle user logout
exports.logoutUser = (req, res) => {
  // The client should remove the JWT token stored in their application
  // No server-side action is required since JWT tokens are stateless
  res.status(200).json({ message: 'User logged out successfully.' });
};

// Function to get all registered users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users.', details: error.message });
  }
};


// Function to handle password reset request
exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body; // Get the email from the request body (the email address entered by the user)
    const user = await User.findOne({ where: { email } }); // Find the user with the matching email address in the database

    if (!user) {
      return res.status(404).json({ error: 'User not found.' }); // If the user is not found, return an error response
    }

    // Generate a password reset token
    const passwordResetToken = crypto.randomBytes(32).toString('hex'); // generate a random string
    const passwordResetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Update the user's password reset token and expiration time
    await user.update({
      password_reset_token: passwordResetToken,
      password_reset_token_expires: passwordResetTokenExpires,
    });

    // Send the password reset email to the user
    await sendPasswordResetEmail(email, passwordResetToken);

    res.status(200).json({ message: 'Password reset email sent.' }); // Respond with a success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the password reset request.', details: error.message });
  }
};

exports.confirmResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the user with the matching password reset token
    const user = await User.findOne({ where: { password_reset_token: token } });

    // If the user is not found, return an error response
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the password reset token has expired
    if (user.password_reset_token_expires < new Date()) {
      return res.status(400).json({ error: 'Password reset token has expired.' });
    }

    // Hash the new password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and clear the password reset token and expiration time
    await user.update({
      password_hash: hashedPassword,
      password_reset_token: null,
      password_reset_token_expires: null,
    });

    // Respond with a success message
    res.status(200).json({ message: 'Password has been successfully updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while resetting the password.', details: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the request parameters

    // Find the user with the specified id
    const user = await User.findByPk(id);

    // If the user is not found, return an error response
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Respond with the found user
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the user.', details: error.message });
  }
};