const ErrorHelper = require('../helpers/error.helper');
const HostHelper = require('../helpers/host.helper');

const createConversationFormValidator = async (req, res, next) => {
  try {
    const messages = [];

    req.checkBody('_author', 'Author must not be empty').notEmpty();
    req.checkBody('type', 'Type must not be empty').notEmpty();
    if (req.body.type.toUpperCase() === 'TEAM') {
      req.checkBody('_team', 'Team cannot be empty for conversation type: TEAM').notEmpty();
    }

    const errors = req.validationErrors();

    if (errors) {
      errors.forEach(function (error) {
        messages.push(error.msg);
      });
      return ErrorHelper.ClientError(res, messages, 400);
    }

    next();
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};


module.exports = {
  createConversationFormValidator: createConversationFormValidator
};


