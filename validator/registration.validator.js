const ErrorHelper = require('../helpers/error.helper');
const RoleHelper = require('../helpers/role.helper');

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

const registerWithCodeFormValidator = async (req, res, next) => {
  try {
    const messages = [];
    req.checkBody('code', 'Code is required').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
    req.checkBody('houseNumber', 'House Number must not be empty').notEmpty();
    req.checkBody('streetName', 'Street Name must not be empty').notEmpty();
    req.checkBody('city', 'City must not be empty').notEmpty();
    req.checkBody('country', 'Country must not be empty').notEmpty();
    req.checkBody('state', 'State must not be empty').notEmpty();
    req.checkBody('postalCode', 'Postal Code must not be empty').notEmpty();
    req.checkBody('fname', 'Firstname must not be empty').notEmpty();
    req.checkBody('fname', 'Invalid Name input').isLength({ min: 2 });
    req.checkBody('lname', 'Lastname must not be empty').notEmpty();
    req.checkBody('lname', 'Invalid Lastname input').isLength({ min: 2 });
    req.checkBody('username', 'Username must not be empty').notEmpty();
    req.checkBody('gender', 'Gender Must not be empty').notEmpty();
    req.checkBody('isVolunteer', 'isVolunteer field must not be empty').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      errors.forEach(function (error) {
        messages.push(error.msg);
      });
      return ErrorHelper.ClientError(res, messages, 400);
    }
    const getRole = await RoleHelper.getRoleByCode('USER');
    if (getRole.err) {
      return ErrorHelper.ClientError(res, {error: getRole.err}, 400);
    }
    req.body._role = getRole.role._id;
    
    next();
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  accessCodeRequestFormValidator: accessCodeRequestFormValidator,
  registerWithCodeFormValidator: registerWithCodeFormValidator
};
