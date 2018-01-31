const passport = require('passport');
const AuthRoute = require('./authentication.route');
const ReportRoute = require('./report.route');
const ReportTypeRoute = require('./reportType.route');
const CategoryRoute = require('./category.route');
const PriorityRoute = require('./priority.route');
const HostRoute = require('./host.route');

module.exports = (app) => {
  app.get('/', welcomePage);
  app.use('/v1/api/auth', AuthRoute);
  app.use('/v1/api/reportType', ReportTypeRoute);
  app.use('/v1/api/category', CategoryRoute);
  app.use('/v1/api/priority', PriorityRoute);
  app.use('/v1/api/report', ReportRoute);
  app.use('/v1/api/host', HostRoute);
};

const welcomePage = (req, res, next) => {
  res.status(200).send({ message: `Success` });
};
