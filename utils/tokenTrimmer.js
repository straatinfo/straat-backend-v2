const _ = require('lodash');

function tokenTrimmer (req, res, next) {
  req.log.info({ value: req.headers['authorization'] }, 'Authorization Header');
  if(req.headers['authorization']) {
    const token = _.trim(req.headers['authorization'], 'Bearer');
    req.headers['authorization'] = token.trimLeft();
  }
  next();
}

module.exports = tokenTrimmer;
