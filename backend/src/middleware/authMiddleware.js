const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (Format is usually "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token mathematically
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user based on the ID in the token, attach it to req.user, but don't include the password
      req.user = await User.findById(decoded.id).select('-password');

      next(); // The user is valid, let them proceed to the next function (like adding to cart)
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };