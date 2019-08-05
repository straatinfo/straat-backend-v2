const Promise = require('bluebird');

async function populateUnreadMessage (req, res, next) {
  const reports = req.reports;
  
  if (!Array.isArray(reports)) {
    try {
      const r = (reports.toObject) ? reports.toObject() : reports;
      const userId = r._reporter && r._reporter._id;
      const conversationId = r._conversation && r._conversation._id;
      const unreadMessage = await req.db.UnreadMessage.find({  _user: userId, _conversation: conversationId });
      const conversation = {
        ...r._conversation,
        unreadMessageCount: unreadMessage.length || 0
      };
      const populatedReport = {
        ...r,
        _conversation: conversation
      };

      req.reports = populatedReport;
      req.report = populatedReport;
      return next();
    }
    catch (e) {
      console.error('unread message populattion error', e);
      return next();
    }
  }

  try {
    const populatedReports = await Promise.mapSeries(reports, async (report) => {
      try {
        const r = report.toObject ? report.toObject() : report;
        const userId = r._reporter && r._reporter._id;
        const conversationId = r._conversation && r._conversation._id;

        const unreadMessage = await req.db.UnreadMessage.find({  _user: userId, _conversation: conversationId });
        const conversation = {
          ...r._conversation,
          unreadMessageCount: unreadMessage.length || 0
        }
        return {
          ...r,
          _conversation: conversation
        };
      }
      catch (e) {
        const conversation = {
          ...r._conversation,
          unreadMessageCount: 0
        }
        return {
          ...r,
          _conversation: conversation
        };
      }
    });
    req.reports = populatedReports;
    next();
  }
  catch (e) {
    console.error('unread message populattion error', e);
    next();
  }
}

module.exports = {
  populateUnreadMessage
};
