const AuthRoute = require('./authentication.route');
const ReportTypeRoute = require('./reportType.route');
const ReportRoute = require('./report.route');
const CategoryRoute = require('./category.route');
const HostRoute = require('./host.route');
const TeamRoute = require('./team.route');
const TeamInviteRoute = require('./teamInvite.route');
const ConversationRoute = require('./conversation.route');
<<<<<<< HEAD

const TestRoute = require('./test.route');
=======
const ReporterRoute = require('./reporter.route');
const DesignRoute = require('./design.route');
>>>>>>> 128f8c64d6e5a41adbb3204c31daf429df67a486

module.exports = (app) => {
  app.get('/', function(req, res, next) {
    res.send({message: 'Success'});
  });
  app.use('/v1/api/auth/', AuthRoute);
  app.use('/v1/api/reportType/', ReportTypeRoute);
  app.use('/v1/api/report', ReportRoute);
  app.use('/v1/api/category', CategoryRoute);
  app.use('/v1/api/host', HostRoute);
  app.use('/v1/api/team', TeamRoute);
  app.use('/v1/api/teamInvite', TeamInviteRoute);
  app.use('/v1/api/conversation', ConversationRoute);
<<<<<<< HEAD

  app.use('/test', TestRoute);
=======
  app.use('/v1/api/reporter', ReporterRoute);
  app.use('/v1/api/design', DesignRoute);
>>>>>>> 128f8c64d6e5a41adbb3204c31daf429df67a486
};
