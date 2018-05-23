const AuthRoute = require('./authentication.route');
const ReportTypeRoute = require('./reportType.route');
const ReportRoute = require('./report.route');
const CategoryRoute = require('./category.route');
const HostRoute = require('./host.route');
const TeamRoute = require('./team.route');
const TeamInviteRoute = require('./teamInvite.route');
const ConversationRoute = require('./conversation.route');
const ReporterRoute = require('./reporter.route');
const DesignRoute = require('./design.route');
const RegistrationRoute = require('./registration.route');
const UploadRoute = require('./upload.route');
const UserRoute = require('./user.route');
const FeedbackRoute = require('./feedback.route');
const MessageRoute = require('./message.route');
const LanguageRoute = require('./language.route');
const ConversationRouteV2 = require('./conversationV2.route');
const MessageRouteV2 = require('./messageV2.route');
const TeamRouteV2 = require('./teamV2.route');
const HostMigrationRoute = require('./hostMigration.route');

// const TestRoute = require('./test.route');
 const TestRoute = require('./test.route');

module.exports = (app) => {
  app.get('/', function(req, res, next) {
    res.send({message: 'Web API is now online, waiting for requests..', status: 1, online: true});
  });
  app.use('/v1/api/auth/', AuthRoute);
  app.use('/v1/api/reportType/', ReportTypeRoute);
  app.use('/v1/api/report', ReportRoute);
  app.use('/v1/api/category', CategoryRoute);
  app.use('/v1/api/host', HostRoute);
  app.use('/v1/api/team', TeamRoute);
  app.use('/v1/api/teamInvite', TeamInviteRoute);
  // app.use('/v1/api/conversation', ConversationRoute);
  app.use('/v1/api/reporter', ReporterRoute);
  app.use('/v1/api/design', DesignRoute);
  app.use('/v1/api/registration', RegistrationRoute);
  app.use('/v1/api/upload', UploadRoute);
  app.use('/v1/api/user', UserRoute);
  app.use('/v1/api/feedback', FeedbackRoute);
  app.use('/v1/api/message', MessageRoute);
  app.use('/v1/api/language', LanguageRoute);
  app.use('/v2/api/conversation', ConversationRouteV2);
  app.use('/v2/api/message', MessageRouteV2);
  app.use('/v2/api/team', TeamRouteV2);
   app.use('/v1/api/test', TestRoute);
  app.use('/v1/api/hostmigration', HostMigrationRoute);

   
};
