const ErrorHelper = require('../helpers/error.helper');
const RoleHelper = require('../helpers/role.helper');

const registrationFormValidator = async (req, res, next) => {

  try {
    const messages = [];
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
    req.checkBody('houseNumber', 'House Number must not be empty').notEmpty();
    req.checkBody('streetName', 'Street Name must not be empty').notEmpty();
    req.checkBody('city', 'City must not be empty').notEmpty();
    req.checkBody('country', 'Country must not be empty').notEmpty();
    req.checkBody('state', 'State must not be empty').notEmpty();
    req.checkBody('postalCode', 'Postal Code must not be empty').notEmpty();
    req.checkBody('_role', 'Role must not be empty').notEmpty();
    const getRole = await RoleHelper.findRoleById(req.body._role);
    if (getRole.err) {
      messages.push('Invalid Role');
      return ErrorHelper.ClientError(res, messages, 400);
    }
    if (getRole.role.code.toUpperCase() === 'ADMIN') {
      messages.push('Invalid Role');
      return ErrorHelper.ClientError(res, messages, 400);
    }

    if (getRole.role.code.toUpperCase() === 'HOST') {
      // validation for host
      req.checkBody('hostName', 'No hostname').notEmpty();
      req.checkBody('lat', 'Invalid Latitude').notEmpty();
      req.checkBody('long', 'Invalid Longitude').notEmpty();
    } else {
      // validation for users
      req.checkBody('fname', 'Firstname must not be empty').notEmpty();
      req.checkBody('fname', 'Invalid Name input').isLength({ min: 2 });
      req.checkBody('lname', 'Lastname must not be empty').notEmpty();
      req.checkBody('lname', 'Invalid Lastname input').isLength({ min: 2 });
      req.checkBody('username', 'Username must not be empty').notEmpty();
      req.checkBody('gender', 'Gender Must not be empty').notEmpty();
      req.checkBody('_host', 'Host ID Must not be empty').notEmpty();
      req.checkBody('isVolunteer', 'isVolunteer field must not be empty').notEmpty();
    }
    const errors = req.validationErrors();

    if (errors) {
      errors.forEach(function (error) {
        messages.push(error.msg);
      });
      return ErrorHelper.ClientError(res, messages, 400);
    }

    if (req.body.password !== req.body.confirmedPassword) {
      messages.push('Passwords do not match');
      return ErrorHelper.ClientError(res, messages, 400);
    }

    next();
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }

};

module.exports = {
  registrationFormValidator: registrationFormValidator
};


