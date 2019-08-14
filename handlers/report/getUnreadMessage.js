const Promise = require('bluebird');

async function populateUnreadMessage (req, res, next) {
  const reports = req.reports;
  const userId = req.query.userId || req.query._reporter;

  if (!userId) return next();
  
  if (!Array.isArray(reports)) {
    try {
      const r = (reports.toObject) ? reports.toObject() : reports;
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

async function populateUnreadMessageForTeams (req, res, next) {
  const userId = req.query.userId || req.query._reporter || req.params.userId || req.params._user;
  const teams = req.teams;
  if (!userId) return next();

  if (!Array.isArray(teams)) {
    try {
      const t = (teams.toObject) ? teams.toObject() : reports;
      const conversationId = t._conversation && t._conversation._id;
      const unreadMessage = await req.db.UnreadMessage.find({  _user: userId, _conversation: conversationId });
      const conversation = {
        ...t._conversation,
        unreadMessageCount: unreadMessage.length || 0
      };
      const populatedTeam = {
        ...t,
        _conversation: conversation
      };

      req.teams = populatedTeam;
      req.team = populatedTeam;
      return next();
    }
    catch (e) {
      console.error('unread message populattion error', e);
      return next();
    }
  }

  try {
    const populatedTeams = await Promise.mapSeries(teams, async (team) => {
      try {
        const t = team.toObject ? team.toObject() : team;
        const conversationId = t._conversation && t._conversation._id;

        const unreadMessage = await req.db.UnreadMessage.find({  _user: userId, _conversation: conversationId });
        const conversation = {
          ...t._conversation,
          unreadMessageCount: unreadMessage.length || 0
        }
        return {
          ...t,
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

    req.teams = populatedTeams;
    next();
  }
  catch (e) {
    console.error('unread message populattion error', e);
    next();
  }
}

module.exports = {
  populateUnreadMessage,
  populateUnreadMessageForTeams
};
