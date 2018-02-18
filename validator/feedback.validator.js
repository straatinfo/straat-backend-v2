const ErrorHelper = require('../helpers/error.helper');
const HostHelper = require('../helpers/host.helper');

const feedbackFormValidator = async (req, res, next) => {
  try {
    const messages = [];

    req.checkBody('feedback', 'Feeadback cannot be empty').notEmpty();

    if (!req.params.hostId) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Host ID'}, 400);
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
  feedbackFormValidator: feedbackFormValidator
};

