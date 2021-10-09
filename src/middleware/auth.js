const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const JWT_SECRET = require('../../config').ACCESS_TOKEN;
const User = require('../../models/user');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError(401, 'لا يمكنك الوصول إلى هذا الرابط'));
  }

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return next(createError(401, 'لا يمكنك الوصول إلى هذا الرابط'));
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return next(createError(401, 'لا يمكنك الوصول إلى هذا الرابط'));
    }

    req.user = user;
    next();
  });
}