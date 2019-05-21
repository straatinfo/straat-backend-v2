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
  const user = req.user;

  console.log('user', user);
  if (user.email !== req.body.email) {
    return res.status(400).send({
      status: 'ERROR',
      statusCode: 102,
      httpCode: 400,
      message: 'Invalid Parameter: Email'
    });
  }

  next();
}

async function refreshUserData (req, res, next) {
  try {
    // require _activeTeam
    // problem in reporting cause by user dont have activeTeam even it has a team
    // this will be remove if setup of active team is fix

    // start
    const user = await UserHelper.findUserById(req.user._id)
    const data = {
      user: user.user,
      setting: user.user.setting,
      token: JwtService.tokenForUser(user.user),
      _activeDesign: (user.user.toObject()._host && user.user.toObject()._host._activeDesign) ? user.user.toObject()._host._activeDesign : null
    }
    res.status(200).send({
      status: 'SUCCESS',
      statusCode: 0,
      httpCode: 200,
      data: data
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: 'ERROR',
      statusCode: 100,
      httpCode: 500,
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  validateUserParams,
  checkEmail,
  refreshUserData
};
