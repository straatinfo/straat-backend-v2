const _ = require('lodash');

const tokenTrimmer = (req, res, next) => {
  console.log(req.headers['authorization']);
  if(req.headers['authorization']) {
    const token = _.trim(req.headers['authorization'], 'Bearer');
    req.headers['authorization'] = token.trimLeft();
  }
  next();
}

module.exports = {
  tokenTrimmer: tokenTrimmer
};
