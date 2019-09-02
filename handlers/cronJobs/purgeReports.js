const moment = require('moment');

function createQuery (req, res, next) {
  const query = {
    $or: [
      {
        status: {
          $in: ['NEW', 'INPROGRESS']
        },
        updatedAt: {
          $lte: moment().subtract(5, 'd')
        }
      },
      {
        status: {
          $in: ['EXPIRED']
        },
        updatedAt: {
          $lte: moment().subtract(4, 'd')
        }
      },
      {
        status: {
          $in: ['DONE']
        },
        updatedAt: {
          $lte: moment().subtract(3, 'd')
        }
      }
    ]
  };
  req.$scope.reportQuery = query;
  next();
}

function getReportIds (req, res, next) {
  const query = req.$scope.reportQuery;

  return req.db.Report.find(query)
    .then((reports) => {
      const ids = reports.map(r => r._id);
      req.$scope.reportIds = ids;
      next();
    })
    .catch((e) => {
      console.log('ERROR in purging reports', e);
      res.status(500).send({
        status: 'ERROR',
        httpCode: 500,
        statusCode: 100,
        statusMessage: 'Internal server error'
      });
    });
}

function getAllConversationIds (req, res, next) {
  const ids = req.$scope.reportIds;
  return req.db.Conversation.find({
    _report: {
      $in: ids
    }
  })
    .then((conversations) => {
      const convoIds = conversations.map(c => c._id);
      req.$scope.convoIds = convoIds;
      next();
    })
    .catch((e) => {
      console.log('ERROR in purging reports', e);
      res.status(500).send({
        status: 'ERROR',
        httpCode: 500,
        statusCode: 100,
        statusMessage: 'Internal server error'
      });
    });
}

function getMessagesIds (req, res, next) {
  const convoIds = req.$scope.convoIds;
  return req.db.Message.find({
    _conversation: {
      $in: convoIds
    }
  })
    .then((messages) => {
      const messageIds = messages.map(m => m._id);
      req.$scope.messageIds = messageIds;
      next();
    })
    .catch((e) => {
      console.log('ERROR in purging reports', e);
      res.status(500).send({
        status: 'ERROR',
        httpCode: 500,
        statusCode: 100,
        statusMessage: 'Internal server error'
      });
    });
}

function deleteAllMessages (req, res, next) {
  const messageIds = req.$scope.messageIds;

  return req.db.Message.remove({
    _id: {
      $in: messageIds
    }
  })
  .then(() => {
    next();
  })
  .catch((e) => {
    console.log('ERROR in purging reports', e);
    res.status(500).send({
      status: 'ERROR',
      httpCode: 500,
      statusCode: 100,
      statusMessage: 'Internal server error'
    });
  });
}

function deleteAllConversation (req, res, next) {
  const convoIds = req.$scope.convoIds;
  return req.db.Conversation.remove({
    _id: {
      $in: convoIds
    }
  })
    .then(() => {
      next();
    })
    .catch((e) => {
      console.log('ERROR in purging reports', e);
      res.status(500).send({
        status: 'ERROR',
        httpCode: 500,
        statusCode: 100,
        statusMessage: 'Internal server error'
      });
    });
}

function deleteAllHostReportsAndReporterReports (req, res, next) {
  next();
}

function logic (req, res, next) {
  const reportIds = req.$scope.reportIds;

  return req.db.Report.remove({
    _id: {
      $in: reportIds
    }
  })
    .then(() => {
      return res.status(200).send({
        status: 'SUCCESS',
        httpCode: 200,
        statusCode: 0
      })
    })
    .catch((e) => {
      console.log('ERROR in purging reports', e);
      res.status(500).send({
        status: 'ERROR',
        httpCode: 500,
        statusCode: 100,
        statusMessage: 'Internal server error'
      });
    });
}

module.exports = {
  createQuery,
  getReportIds,
  getAllConversationIds,
  getMessagesIds,
  deleteAllMessages,
  deleteAllConversation,
  deleteAllHostReportsAndReporterReports,
  logic
};
