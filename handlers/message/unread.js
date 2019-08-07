const _ = require('lodash');

function validateParams (req, res, next) {
  const userId = req.params.userId || req.query.userId || null
  const conversationId = req.params.conversationId || req.query.conversationId || null;

  if (!userId) {
    return res.status(400).send({
      status: 'ERROR',
      statusCode: 101,
      httpCode: 400,
      message: 'Invalid user ID'
    });
  }

  if (!conversationId) {
    return res.status(400).send({
      status: 'ERROR',
      statusCode: 101,
      httpCode: 400,
      message: 'Invalid conversation ID'
    });
  }

  req.$scope.userId = userId;
  req.$scope.conversationId = conversationId;
  next();
}

function getUnreadMessage (req, res, next) {
  const { userId, conversationId } = req.$scope;

  return req.db.UnreadMessage.find({ _user: userId, _conversation: conversationId })
    .populate('_message')
    .populate('_user', '-password')
    .then((unreadMessages) => {
      res.status(200).send({
        status: 'SUCCESS',
        statusCode: 0,
        httpCode: 200,
        data: unreadMessages,
        unreadMessages
      });
    })
    .catch((err) => {
      console.error('Get Unread Message ERROR', err);
      res.status(500).send({
        status: 'ERROR',
        statusCode: 100,
        httpCode: 500,
        message: 'Internal server error'
      })
    });
}

function getUnreadMessageCountGroupByReportType (req, res, next) {
  const { userId } = req.$scope;

  return req.db.UnreadMessage.find({ _user: userId, _report: { $ne: null } })
    .populate({
      path: '_report',
      populate: {
        path: '_reportType'
      }
    })
      .then((unreadMessages) => {
        const a = _.filter(unreadMessages, (um) => um && um._report && um._report._reportType && um._report._reportType.code == 'A').length
        const b = _.filter(unreadMessages, (um) => um && um._report && um._report._reportType && um._report._reportType.code == 'B').length
        const c = _.filter(unreadMessages, (um) => um && um._report && um._report._reportType && um._report._reportType.code == 'C').length
        res.status(200).send({
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          a, b, c
        })
      })
      .catch((err) => {
        console.error('Get Unread Message ERROR', err);
        res.status(500).send({
          status: 'ERROR',
          statusCode: 100,
          httpCode: 500,
          message: 'Internal server error'
        })
      });
}

function deleteUnreadMessage (req, res, next) {
  const { userId, conversationId } = req.$scope;

  return req.db.UnreadMessage.remove({ _user: userId, _conversation: conversationId })
    .then(() => {
      res.status(201).send({
        status: 'SUCCESS',
        statusCode: 0,
        httpCode: 201
      });
    })
    .catch((err) => {
      console.error('Delete Unread Message ERROR', err);
      res.status(500).send({
        status: 'ERROR',
        statusCode: 100,
        httpCode: 500,
        message: 'Internal server error'
      })
    });
}

module.exports = {
  validateParams,
  getUnreadMessage,
  deleteUnreadMessage,
  getUnreadMessageCountGroupByReportType
};
