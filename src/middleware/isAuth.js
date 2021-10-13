const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const JWT_SECRET = require('../../config').ACCESS_TOKEN;
const User = require('../../models/user');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return next();
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return next();
    }

    req.user = user;
    next();
  });
}