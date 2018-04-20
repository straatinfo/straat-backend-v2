/**
 * Conversation V2 API
 * Created by John Higgins M. Avila
 * Description: this file will hold conversation related apis
 * 
 */
// Dependencies
const ConversationHelper = require('../helpers/conversationV2.helper');

const getConversation = async function (req, res, next) {
  try {
    let data;
    if (req.query._conversation) {
      const conversation = await ConversationHelper.getConversation('conversation', req.query._conversation);
      data = conversation;
    }
    else if (req.query.type && req.query._user) {
      const conversations = await ConversationHelper.getConversation('userconversationsbytype', req.query._user, req.query.type);
      data = conversations;
    }
    else if (req.query._user) {
      const conversations = await ConversationHelper.getConversation('userconversations', req.query._user);
      data = conversations;
    }
    if (data) {
      res.status(200).send({
        status: 1,
        payload: data,
        message: 'Successfully fetch conversation(s)'
      });
    } else {
      res.status(404).send({
        status: 0,
        error: 'INVALID_QUERY_PARAMETERS',
        message: 'Invalid query object: cannot find data',
        statusCode: 404
      });
    }
  }
  catch (e) {
    console.log(e);
    if (e.statusCode) {
      return res.status(e.statusCode).send(e);
    }
    res.status(500).send({
      status: 0,
      error: e,
      statusCode: 500
    });
  }
}

const createConversation = async function (req, res, next) {
  try {
    const type = req.query.type;
    const { title, _author, _profilePic, _chatee, _team } = req.body;
    let conversation;
    if (type.toLowerCase() === 'private') {
      conversation = await ConversationHelper.createConversation(type, _author, _chatee, _profilePic);
    }
    else if (type.toLowerCase() === 'team') {
      conversation = await ConversationHelper.createConversation(type, _author, _team, _profilePic);
    }
    else if (type.toLowerCase() === 'group') {
      conversation = await ConversationHelper.createConversation(type, _author, title, _profilePic);
    }
    if (conversation) {
      res.status(200).send({
        status: 1,
        payload: conversation,
        message: 'Successfully created conversation'
      });
    } else {
      res.status(400).send({
        status: 0,
        error: 'INVALID_CONVERSATION_INPUT',
        message: 'Invalid data given',
        statusCode: 400
      });
    }
  }
  catch (e) {
    console.log(e);
    if (e.statusCode) {
      return res.status(e.statusCode).send(e);
    }
    res.status(500).send({
      status: 0,
      error: e,
      statusCode: 500
    });
  }
}

const updateConversation = async function (req, res, next) {
  try {
    const _conversation = req.params._conversation;
    const { title, _profilePic, _remover, _user } = req.body;
    const { action } = req.query;
    let conversation;
    if (action.toLowerCase() === 'update') {
      conversation = await ConversationHelper.updateConversation(action, _conversation, title, _profilePic);
    }
    else if (action.toLowerCase() === 'add') {
      if (!_user) {
        return res.status(400).send({
          status: 0,
          error: 'INVALID_CONVERSATION_INPUT',
          message: 'Invalid data given',
          statusCode: 400
        });
      }
      conversation = await ConversationHelper.updateConversation(action, _conversation, _user);
    }
    else if (action.toLowerCase() === 'remove') {
      if (!_user) {
        return res.status(400).send({
          status: 0,
          error: 'INVALID_CONVERSATION_INPUT',
          message: 'Invalid data given',
          statusCode: 400
        });
      }
      conversation = await ConversationHelper.updateConversation(action, _conversation, _remover, _user);
    }
    if (conversation) {
      res.status(200).send({
        status: 1,
        payload: conversation,
        message: 'Successfully updated conversation'
      });
    } else {
      res.status(400).send({
        status: 0,
        error: 'INVALID_CONVERSATION_INPUT',
        message: 'Invalid data given',
        statusCode: 400
      });
    }
  }
  catch (e) {
    console.log(e);
    if (e.statusCode) {
      return res.status(e.statusCode).send(e);
    }
    res.status(500).send({
      status: 0,
      error: e,
      statusCode: 500
    });
  }
}

const deleteConversation = async function (req, res, next) {
  try {
    const { _user } = req.query;
    const { _conversation } = req.params;
    if (!_user) {
      return res.status(400).send({
        status: 0,
        err: 'INVALID_USER_ID',
        statusCode: 400,
        message: 'User ID is invalid'
      });
    }
    const conversation = await ConversationHelper.deleteConversation(_conversation, _user);
    res.status(200).send({
      status: 1,
      message: 'Successfully deleted the conversation',
      payload: conversation
    });
  }
  catch (e) {
    console.log(e);
    if (e.statusCode) {
      return res.status(e.statusCode).send(e);
    }
    res.status(500).send({
      status: 0,
      error: e,
      statusCode: 500
    });
  }
}

module.exports = {
  getConversation,
  createConversation,
  updateConversation,
  deleteConversation
};
