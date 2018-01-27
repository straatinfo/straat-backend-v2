const passport = require('passport');
const AuthRoute = require('./authentication.route');

module.exports = (app) => {
  app.get('/', welcomePage);
  app.use('/v1/api/auth', AuthRoute);
};

const welcomePage = (req, res, next) => {
  res.status(200).send({ message: `Success` });
};
