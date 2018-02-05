const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const ConversationHelper = require('../helpers/conversation.helper');

const getConversations = async (req, res, next) => {
  try {
    const getC = await ConversationHelper.getConversations();
    if (getC.err) {
      return ErrorHelper.ClientError(res, {error: getC.err}, 400);
    }
    SuccessHelper.success(res, getC.conversations);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getConversationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getC = await ConversationHelper.getConversationById(id);
    if (getC.err) {
      return ErrorHelper.ClientError(res, {error: getC.err}, 400);
    }
    SuccessHelper.success(res, getC.conversation);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getUserConversations = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const getC = await ConversationHelper.getUserConversations(userId);
    if (getC.err) {
      return ErrorHelper.ClientError(res, {error: getC.err}, 400);
    }
    SuccessHelper.success(res, getC.conversations);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const createConversation = async (req, res, next) => {
  try {
    const createC = await ConversationHelper.createConversation(req.body);
    if (createC.err) {
      return ErrorHelper.ClientError(res, {error: createC.err});
    }
    SuccessHelper.success(res, createC.conversation);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateConversation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateC = await ConversationHelper.updateConversation(id, req.body);
    if (updateC.err) {
      return ErrorHelper.ClientError(res, {error: updateC.err}, 400);
    }
    SuccessHelper.success(res, createC.conversation);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const deleteConversation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteC = await ConversationHelper.deleteConversation(id);
    if (deleteC.err) {
      return ErrorHelper.ClientError(res, {error: deleteC.err}, 400);
    }
    SuccessHelper.success(res, deleteC.conversation);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const addParticipant = async (req, res, next) => {
  const { userId, conversationId } = req.params;
  try {
    const addP = await ConversationHelper.addParticipant(conversationId, userId);
    if (addP.err) {
      return ErrorHelper.ClientError(res, {error: addP.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const removeParticipant = async (req, res, next) => {
  const { userId, conversationId } = req.params;
  try {
    const removeP = await ConversationHelper.removeParticipant(conversationId, userId);
    if (removeP.err) {
      return ErrorHelper.ClientError(res, {error: removeP.err}, 400);
    }
    SuccessHelper.success(res, { message: 'Success' });
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getConversations: getConversations,
  getUserConversations: getUserConversations,
  getConversationById: getConversationById,
  createConversation: createConversation,
  updateConversation: updateConversation,
  deleteConversation: deleteConversation,
  addParticipant: addParticipant,
  removeParticipant: removeParticipant
};
