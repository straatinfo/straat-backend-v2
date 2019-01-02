const ErrorHelper = require('../helpers/error.helper');
const RoleHelper = require('../helpers/role.helper');

const createHostFormValidator = async (req, res, next) => {
  try {
    const messages = [];

    req.checkBody('email', 'Email must not be empty').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('hostPersonalEmail', 'Personal Email must not be empty').notEmpty();
    req.checkBody('hostPersonalEmail', 'Invalid Personal Email').isEmail();
    req.checkBody('lname', 'Host Lastname is required').notEmpty();
    req.checkBody('fname', 'Host Firstname is required').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
    req.checkBody('houseNumber', 'House Number must not be empty').notEmpty();
    req.checkBody('streetName', 'Street Name must not be empty').notEmpty();
    req.checkBody('city', 'City must not be empty').notEmpty();
    req.checkBody('country', 'Country must not be empty').notEmpty();
    req.checkBody('state', 'State must not be empty').notEmpty();
    req.checkBody('postalCode', 'Postal Code must not be empty').notEmpty();
    req.checkBody('_role', 'Role must not be empty').notEmpty();
    req.checkBody('hostName', 'No hostname').notEmpty();
    req.checkBody('lat', 'Invalid Latitude').notEmpty();
    req.checkBody('long', 'Invalid Longitude').notEmpty();
    
    const getRole = await RoleHelper.findRoleById(req.body._role);
    if (getRole.err) {
      messages.push('Invalid Role');
      return ErrorHelper.ClientError(res, messages, 400);
    }
    if (!getRole.role || getRole.role.code.toUpperCase() !== 'HOST') {
      messages.push('Invalid Role');
      return ErrorHelper.ClientError(res, messages, 400);
    };

    if (!req.body.username) {
      req.body.username = req.body.email;
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
  createHostFormValidator: createHostFormValidator
};
