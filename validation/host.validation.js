const Joi = require('joi');

const putSchema = {
  query: {
    email: Joi.string().email().required()
  }
};

const deleteSchema = {
  query: {
    email: Joi.string().email().required()
  }
};

module.exports = {
  putSchema,
  deleteSchema
};
