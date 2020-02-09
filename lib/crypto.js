const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const config = require('../config');

function hashString (string, salt = 10) {
  return bcrypt.hashSync(string, bcrypt.genSaltSync(salt));
}

function signJwt (userId) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: userId, iat: timestamp}, config.session_secret);
}

module.exports = {
  hashString,
  signJwt
};