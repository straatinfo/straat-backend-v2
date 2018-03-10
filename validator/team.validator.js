const ErrorHelper = require('../helpers/error.helper');

const createTeamFormValidator = async (req, res, next) => {
  const messages = [];

  req.checkBody('teamName', 'Name of team cannot be empty').notEmpty();
  req.checkParams('userId', 'User ID cannot be empty').notEmpty();
  req.checkBody('teamEmail', 'Email cannot be empty').notEmpty();
  req.checkBody('teamEmail', 'Invalid email').isEmail();
  req.checkBody('isVolunteer', 'Is volunteer cannot be empty').notEmpty();
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
  createTeamFormValidator: createTeamFormValidator
};


