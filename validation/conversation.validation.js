const Joi = require('joi');

const createSchema = {
  query: {
    type: Joi.string().required().description('keyword enum["TEAM", "PRIVATE", "GROUP", "GLOBAL"]'),
  },
  body: {
    title: Joi.string().description('Title of the conversation'),
    _author: Joi.string().required().description('User ID of the reporter who initiates the chat'),
    _profilePic: Joi.string(),
    _chatee: Joi.string().description('User Id of the reporter that will be chatted')
  }
};

const updateSchema = {
  params: {
    _conversation: Joi.string().required().description('Conversation ID that will be updated')
  },
  query: {
    action: Joi.string().required().description('Key word to use in selecting service ENUM: ["update", "add", "remove"]')
  },
  body: {
    _remover: Joi.string().description('User ID that initiates the removal of user'),
    _user: Joi.string().description('User to be added'),
    title: Joi.string().description('Title of the conversation'),
    _profilePic: Joi.string()
  }
};

const getSchema = {
  query: {
    type: Joi.string().description('keyword enum["TEAM", "PRIVATE", "GROUP", "REPORT", "GLOBAL"]'),
    _conversation: Joi.string().description('Conversation ID that will be updated'),
    _user: Joi.string().description('User ID of the reporter')
  }
};

const deleteSchema = {
  query: {
    _user: Joi.string().required().description('User ID of the author')
  }
};

module.exports = {
  createSchema,
  updateSchema,
  getSchema,
  deleteSchema
};
