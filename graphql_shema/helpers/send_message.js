const mongoose = require('mongoose');
const Promise = require('bluebird');

async function _verifyType (req) {
  const { type } = req.body;
  const validTypes = ['INDIVIDUAL', 'REPORT', 'TEAM'];
  if (!type || validTypes.indexOf(type) < 0) {
    throw {
      status: 'ERROR',
      statusCode: 0,
      httpCode: 400,
      message: 'Invalid Parameter: Type - Should include Enum[ "INDIVIDUAL", "REPORT", "TEAM" ]'
    };
  }
  return req;
}

async function _verifyConversation (req) {
  const { conversationId } = req.body;
  const isValidId = mongoose.isValidObjectId(conversationId);
  const error = {
    status: 'ERROR',
    statusCode: 0,
    httpCode: 400,
    message: 'Invalid Parameter: Conversation ID'
  };

  if (!conversationId || !isValidId) {
    throw error;
  }

  const conversation = await req.db.Conversation.findById(conversationId);

  if (!conversation) {
    throw error;
  }

  req.$scope.conversation = conversation;
  return req;
}

async function _createMessage (req) {
  const conversation = req.$scope.conversation;
  const user = req.user;
  const { type, reportId, teamId, body, attachments = [] } = req.body;
  let newMessage = {
    body,
    attachments: attachments.reduce((pv, cv) => {
      if (mongoose.isValidObjectId(cv)) pv = [...pv, cv];
      return pv;
    }, []),
    _conversation: conversation._id,
    _author: user._id
  };

  const message = await req.db.Message.create(newMessage);

  req.$scope.message = message;

  return req;
}

async function _createUnreadMessages (req) {
  const { conversation, message } = req.$scope;
  const { type, teamId, reportId } = req.body;
  const participants = conversation.participants;
  let newUnreadMessage = {
    _message: message._id,
    _conversation: conversation._id,
    _user: req.user._id,
    type: type
  };

  switch (type.toUpperCase()) {
    case 'TEAM':
      newUnreadMessage._team = teamId;
      break;
    case 'REPORT':
      newUnreadMessage._report = reportId;
      break;
    default:
      break;
  }

  const unreadMessages = await Promise.mapSeries(participants, async (participant) => {
    unreadMessage._user = participant;
    const unreadMessage = await req.db.UnreadMessge.create(unreadMessage);
    return unreadMessage;
  });

  req.$scope.unreadMessages = unreadMessages;

  return req;
}

async function _broadCast (req) {
  return req;
}

module.exports = {
  _verifyType,
  _verifyConversation,
  _createMessage,
  _createUnreadMessages,
  _broadCast
};
