const ErrorHelper = require('../helpers/error.helper');
const UserHelper = require('../helpers/user.helper');

const feedbackFormValidator = async (req, res, next) => {
  try {
    const messages = [];

    req.checkBody('feedback', 'Feeadback cannot be empty').notEmpty();
    req.checkBody('reporterName', 'Reporter Name cannot be empty').notEmpty();
    req.checkBody('reporterEmail', 'Reporter Email cannot be empty').notEmpty();
    req.checkBody('reporterEmail', 'Invalid Email').isEmail();

    if (!req.params.userId) {
      return ErrorHelper.ClientError(res, {error: 'Invalid User ID'}, 400);
    }

    const getR = await UserHelper.findUserById(req.params.userId);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    if (!getR.user) {
      return ErrorHelper.ClientError(res, {error: 'Invalid User ID'}, 400);
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
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};


module.exports = {
  feedbackFormValidator: feedbackFormValidator
};

