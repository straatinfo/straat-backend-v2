const Joi = require('joi');

const getSchema = {
  query: {
    _reporter: Joi.string().required()
  }
};

module.exports = {
  getSchema
};
