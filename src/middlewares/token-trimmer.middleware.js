const _ = require('lodash');

const tokenTrimmer = (req, res, next) => {
  if(req.headers['authorization']) {
    console.log(req.headers);
    const token = _.trim(req.headers['authorization'], 'Bearer');
    req.headers['authorization'] = token.trimLeft();
    console.log(req.headers['authorization']);
  }
  next();
};

module.exports = {
  tokenTrimmer: tokenTrimmer
};
