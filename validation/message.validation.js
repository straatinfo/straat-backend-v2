const Joi = require('joi');

const getSchema = {
  query: {
    _conversation: Joi.string().required().description('Conversation ID'),
    keyword: Joi.string().required().description('Keyword of the service to call, ENUM["all", "byid", "latest"]'),
    page: Joi.number(),
    count: Joi.number(),
    _reporter: Joi.string().required().description('iyak ka '),
  }
};

const createSchema = {
  query: {
    _conversation: Joi.string().required().description('Conversation ID')
  },
  body: {
    _author: Joi.string().required().description('User ID that authored the message'),
    body: Joi.string().required()
  }
};

const updateSchema = {
  body: {
    body: Joi.string().required()
  }
};

module.exports = {
  getSchema,
  createSchema,
  updateSchema
};
