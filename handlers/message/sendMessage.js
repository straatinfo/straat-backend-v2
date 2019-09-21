
const Promise = require('bluebird');

const conversationHelper = require('../../helpers/conversationV2.helper');
const messageHelper = require('../../helpers/messageV2.helper');
const lib = require('../../lib');

const internals = {};

internals.catchError = function (err, req, res) {
  console.log(err);
  return res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
};

function validateParams (req, res, next) {
  var schema = {
    user: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: User ID'
      }
    },
    text: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Text'
      }
    },
    _conversation: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Conversation ID'
      }
    },
    _report: {
      optional: true,
      isString: {
        errorMessage: 'Invalid Parameter: Report ID'
      }
    },
    _team: {
      optional: true,
      isString: {
        errorMessage: 'Invalid Parameter: Team ID'
      }
    },
    type: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Type'
      }
    }
  };

  req.checkBody(schema);
  const validationErrors = req.validationErrors();

  if (validationErrors) {
    const errorObject = lib.errorResponses.validationError(validationErrors);
    // req.logger.warn(errorObject, 'POST /api/hosts');
    return res.status(errorObject.httpCode).send(errorObject);
  } else {
    return next();
  }
}


function getUser (req, res, next) {
  const userId = req.body.user;

  return req.db.User.findOne({
    _id: userId
  })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 102,
          httpCode: 200,
          message: 'Invalid Parameter: User ID'
        });
      }

      req.$scope.user = user;
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function getConversation (req, res, next) {
  const conversationId = req.body._conversation;
  return conversationHelper.__getConversationById(conversationId)
    .then((conversation) => {
      if (!conversation) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 102,
          httpCode: 200,
          message: 'Invalid Parameter: Conversation ID'
        });
      }

      req.$scope.conversation = conversation;
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function createNewMessage (req, res, next) {
  const { user, _conversation, text } = req.body;
  return messageHelper.__createMessage(_conversation, user, text)
    .then((message) => {
      req.$scope.message = message;
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function createUnreadMessages (req, res, next) {
  const { user, _conversation, text, _team, _report, type } = req.body;
  const message = req.$scope.message;
  const conversation = req.$scope.conversation;
  return Promise.mapSeries(conversation.participants, async (participant) => {
    let unreadMessage;
    if (participant && participant._user) {
      unreadMessage = await req.db.UnreadMessage.create({
        _message: message && message._id,
        _conversation: _conversation,
        _user: participant._user,
        type: type,
        _team: _team,
        _report: _report
      });
    }
  
    return unreadMessage;
  })
    .then((unreadMessages) => {
      req.$scope.unreadMessages = unreadMessages;
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function broadcastMessage (req, res, next) {
  const { user, _conversation, text, _team, _report, type } = req.body;
  const message = req.$scope.message;
  const conversation = req.$scope.conversation;

  return Promise.mapSeries(conversation.participants, async (participant) => {
    let sentMessages;
    if (participant && participant._user) {
      let userFC = await req.db.User.findById(participant._user);
      userFC = userFC && userFC.toObject ? userFC.toObject() : userFC;
      let firebaseTokens = userFC.firebaseTokens;
      const unreadMessages = req.db.UnreadMessage.find({
        _user: user
      });
      if (firebaseTokens) {
        const tokens = firebaseTokens.map((ft) => ft.token);
        const message = {
          data: {
            text: text || '',
            _conversation: _conversation || '',
            _report: _report || '',
            _team: _team || '',
            type: type || '',
            _author: user || ''
          },
          notification: {
            title: `New report update`,
            body: unreadMessages && unreadMessages.count > 0 ? `You have ${unreadMessages.count} new messages` :``,
            tag: process.env.DEFAULT_ANDROID_NOTIF_TAG || `New report update`
          },
          android: {
            ttl: 3600 * 1000,
            notification: {
              icon: process.env.DEFAULT_ANDROID_NOTIF_ICON,
              click_action: '.ReportsActivity',
              title: `New report update`,
              body: unreadMessages && unreadMessages.count > 0 ? `You have ${unreadMessages.count} new messages` :``,
              color: process.env.DEFAULT_ANDROID_NOTIF_COLOR,
              sound : process.env.DEFAULT_ANDROID_NOTIF_SOUND
            }
          }
        };
  
        sentMessages = await req.lib.fcm.sendToMultipleTokenAsync(message, tokens);
      }
    }
    return sentMessages;
  })
    .then((sentMessages) => {
      console.log('SEND MESSAGE STATUS: ', sentMessages);
      req.$scope.sentMessages = sentMessages;
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function respond (req, res, next) {
  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200
  });
}

module.exports = {
  validateParams,
  getUser,
  getConversation,
  createNewMessage,
  createUnreadMessages,
  broadcastMessage,
  respond
};
