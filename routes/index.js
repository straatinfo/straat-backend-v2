module.exports = (app) => {
  app.get('/echo', (req, res, next) => {
    res.status(200).send('Echo is working');
  })
  app.use(require('./authentication.route'));
  app.use(require('./role.route'));
  app.use(require('./host.route'))
};
