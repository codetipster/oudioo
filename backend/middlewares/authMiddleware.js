require('dotenv').config();
const jwt = require('jsonwebtoken'); //  import the jsonwebtoken package
const { User } = require('../models');  // import the User model

const authMiddleware = async (req, res, next) => { // create a middleware function
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('decoded token', decoded)
    const userId = decoded.id;

    // Find the user in the database by ID
    const user = await User.findByPk(userId);
    //console.log('user', user)

    // Attach the user object to the request object
    req.user = user;
    
    // In your authMiddleware
    //console.log('USER FROM MIDDLEWARE', req.user);

    // Call the next middleware function or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
