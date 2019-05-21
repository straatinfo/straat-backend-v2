const lib = require('../../lib');
const JwtService = require('../../service/token.service');
const teamHelperV2 = require('../../helpers/teamV2.helper');
const teamInviteHelper = require('../../helpers/teamInvite.helper');
const userHelper = require('../../helpers/user.helper');
const mailingHelper = require('../../helpers/mailing.helper');

// @TODO need to apply registration v2 logic
const internals = {};
internals.catchError = function (err, req, res) {
  console.log(err);
  // @TODO add fallback user deletion here.
  return res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
};

function validateUserParams (req, res, next) {
  var schema = {
    email: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Email'
      },
      isEmail: 'Invalid Parameter: Email'
    }
  };

  req.checkBody(schema);
  req.check('gender', 'Invalid Parameter: Gender').isIn(['M', 'F'])
  const validationErrors = req.validationErrors();

  if (validationErrors) {
    const errorObject = lib.errorResponses.validationError(validationErrors);
    // req.logger.warn(errorObject, 'POST /api/hosts');
    return res.status(errorObject.httpCode).send(errorObject);
  } else {
    return next();
  }
}

function checkEmail (req, res, next) {
  console.log(req.user)
}

module.exports = {
  validateUserParams,
  checkEmail
};
