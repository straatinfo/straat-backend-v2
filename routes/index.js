const AuthRoute = require('./authentication.route');

module.exports = (app) => {
  app.get('/', function(req, res, next) {
    res.send({message: 'Success'});
  });
  app.use('/v1/api/auth/', AuthRoute);
};
