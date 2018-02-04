const jwt = require('jwt-simple');
const Config = require('../config');
module.exports = {
  tokenForUser: (user) => {
    const timestamp = new Date().getTime();
    console.log(user._id);
    return jwt.encode({sub: user._id, iat: timestamp}, Config.SESSION_SECRET);
  }
}
