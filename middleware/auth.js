const jwt = require('jsonwebtoken');
const config = require('../config/keys');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  //Check if there is no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token

  try {
    const decoded = jwt.verify(token, config.jwtSecreat);

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
