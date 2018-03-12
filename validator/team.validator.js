const ErrorHelper = require('../helpers/error.helper');
const TeamHelper = require('../helpers/team.helper');

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

const updateTeamFormValidator = async (req, res, next) => {
  try {
    const messages = [];
    req.checkBody('email', 'Email must be a valid email add').isEmail();
    const checkT = await TeamHelper.getTeamById(req.params.teamId);
    if (checkT.err || !checkT.team) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Team ID'}, 422);
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
}


module.exports = {
  createTeamFormValidator: createTeamFormValidator,
  updateTeamFormValidator: updateTeamFormValidator
};


