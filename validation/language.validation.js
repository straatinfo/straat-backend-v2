const Joi = require('joi');

const getSchema = {
  query: {
    baseWord: Joi.string().required()
  }
};

const postSchema = {
  query: {
    baseWord: Joi.string().required()
  },
  body: {
    code: Joi.string().required(),
    word: Joi.string().required()
  }
};

const putSchema = {
  query: {
    baseWord: Joi.string().required()
  },
  body: {
    code: Joi.string().required(),
    word: Joi.string().required()
  }
};

module.exports = {
  getSchema,
  postSchema,
  putSchema
};
