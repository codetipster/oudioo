const { User } = require('../models');

const verifyAccountMiddleware = async (req, res, next) => {
  try {
    // Get the user ID from the JWT token
    const userId = req.user.id;

    // Retrieve the user from the database
    const user = await User.findOne({ where: { id: userId } });

    // Check if the user's account is verified
    if (!user || user.status !== 'verified') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // User is authorized, pass control to the next middleware
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = verifyAccountMiddleware;
