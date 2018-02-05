const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const MessageHelper = require('../helpers/Message.helper');

const getConversationMessages = async (req, res, next) => {
  const { conversationId } = req.params;
  try {
    const getCM = await MessageHelper.getConversationMessages(conversationId);
    if (getCM.err) {
      return ErrorHelper.ClientError(res, {error: getCM.err}, 400);
    }
    SuccessHelper.success(res, getCM.messages);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getConversationMessagesByPage = async (req, res, next) => {
  const { conversationId, pageNumber } = req.params;
  try {
    const getCM = await MessageHelper.getConversationByPage(conversationId, pageNumber);
    if (getCM.err) {
      return ErrorHelper.ClientError(res, {error: getCM.err}, 400);
    }
    SuccessHelper.success(res, getCM.messages);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const createM = await MessageHelper.sendMessage(req.body);
    if (createM.err) {
      return ErrorHelper.ClientError(res, {error: createM.err}, 400);
    }
    SuccessHelper.success(res, createM.message);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateM = await MessageHelper.updateMessage(id);
    if (updateM.err) {
      return ErrorHelper.ClientError(res, {error: updateM.err}, 400);
    }
    SuccessHelper.success(res, updateM.message);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteM = await MessageHelper.deleteMessage(id);
    if (deleteM.err) {
      return ErrorHelper.ClientError(res, {error: deleteM.err}, 400);
    }
    SuccessHelper.success(res, deleteM.message);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getConversationMessages: getConversationMessages,
  getConversationMessagesByPage: getConversationMessagesByPage,
  createMessage: createMessage,
  updateMessage: updateMessage,
  deleteMessage: deleteMessage
};
