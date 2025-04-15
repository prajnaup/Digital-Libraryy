const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    req.user.role = decoded.role; 
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).send('Access denied. Admins only.');
  }
};