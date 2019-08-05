module.exports = (app) => {
  app.use(require('./authentication.route'));
  app.use(require('./utility.route'));
  app.use(require('./registration.route'));
  app.use(require('./host.route'));
  app.use(require('./message.route'));
};
