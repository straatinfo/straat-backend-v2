const Joi = require('joi');

const putSchema = {
  query: {
    keyword: Joi.string().required(),
    _user: Joi.string().required(),
    _team: Joi.string().required()
  }
};

const postSchema = {
  query: {
    _host: Joi.string().required(),
    _user: Joi.string().required()
  },
  body: {
    teamName: Joi.string().required(),
    teamEmail: Joi.string().email().required(),
    description: Joi.string(),
    isVolunteer: Joi.boolean().required(),
    creationMethod: Joi.string().required()
  }
};

module.exports = {
  putSchema,
  postSchema
};
