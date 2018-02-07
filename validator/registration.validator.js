const ErrorHelper = require('../helpers/error.helper');

const accessCodeRequestFormValidator = (req, res, next) => {
  const messages = [];

  req.checkBody('email', 'Email must be empty').notEmpty();
  req.checkBody('email', 'Invalid Email').isEmail();
  req.checkBody('fname', 'Firstname must not be empty').notEmpty();
  req.checkBody('lname', 'Lastname must not be empty').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    errors.forEach(function (error) {
      messages.push(error.msg);
    });
    return ErrorHelper.ClientError(res, messages, 400);
  }
  next();
};

module.exports = {
  accessCodeRequestFormValidator: accessCodeRequestFormValidator
};
