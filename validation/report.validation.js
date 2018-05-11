const Joi = require('joi');

const getSchema = {
  query: {
    _reporter: Joi.string().required(),
    _reportType: Joi.string()
  }
};

module.exports = {
  getSchema
};
