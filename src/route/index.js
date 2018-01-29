const passport = require('passport');
const AuthRoute = require('./authentication.route');
const IncidentRoute = require('./incident.route');
const IncidentTypeRoute = require('./incidentType.route');
const CategoryRoute = require('./category.route');
const UrgencyRoute = require('./urgency.route');
const HostRoute = require('./host.route');

module.exports = (app) => {
  app.get('/', welcomePage);
  app.use('/v1/api/auth', AuthRoute);
  app.use('/v1/api/incidentType', IncidentTypeRoute);
  app.use('/v1/api/category', CategoryRoute);
  app.use('/v1/api/urgency', UrgencyRoute);
  app.use('/v1/api/incident', IncidentRoute);
  app.use('/v1/api/host', HostRoute);
};

const welcomePage = (req, res, next) => {
  res.status(200).send({ message: `Success` });
};
