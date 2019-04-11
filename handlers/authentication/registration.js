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
    },
    password: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Password'
      },
      isLength: {
        errorMessage: 'Invalid Parameter: Password (length should be 7 characters long and not more than 30 characters)',
        options: { min: 7, max: 30 }
      }
    },
    houseNumber: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: House Number'
      },
    },
    streetName: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Street Name'
      },
    },
    city: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: City'
      },
    },
    state: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: State'
      },
    },
    postalCode: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Postal Code'
      },
    },
    fname: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Firstname'
      },
    },
    lname: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Lastname'
      },
    },
    gender: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Gender'
      }
    },
    username: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Username'
      }
    },
    _host: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Host ID'
      }
    },
    isVolunteer: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Is Volunteer'
      }
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

function validateHostInput (req, res, next) {
  var schema = {
    email: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Email'
      },
      isEmail: 'Invalid Parameter: Email'
    },
    password: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Password'
      },
      isLength: {
        errorMessage: 'Invalid Parameter: Password (length should be 7 characters long and not more than 30 characters)',
        options: { min: 7, max: 30 }
      }
    },
    houseNumber: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: House Number'
      },
    },
    streetName: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Street Name'
      },
    },
    city: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: City'
      },
    },
    state: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: State'
      },
    },
    postalCode: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Postal Code'
      },
    },
    hostName: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Host Name'
      },
    },
    lat: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Latitude'
      },
    },
    long: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Longitude'
      },
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

function validateEmail (req, res, next) {
  return req.db.User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Invalid Parameter: Email - Already in used' 
        });
      }

      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function checkHost (req, res, next) {
  const _host = req.body._host;
  return req.db.User.findById(_host)
    .populate({
      path: '_activeDesign',
      populate: {
        path: '_profilePic',
        select: { _id: true, secure_url: true }
      }
    })
    .then((host) => {
      if (!host) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Invalid Parameter: Host ID'
        });
      }
      req.$scope.host = host;
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function checkTeam (req, res, next) {
  if (!req.body._team || req.body._team == '') {
    return next();
  }

  return req.db.Team.findById(req.body._team)
    .then((team) => {
      if (!team) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Invalid parameter: Team ID'
        });
      }

      req.$scope.team = team;
      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function getUserRole (req, res, next) {
  return req.db.Role.findOne({ code: 'USER'})
    .then((role) => {
      req.$scope.role = role;

      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function getHostRole (req, res, next) {
  return req.db.Role.findOne({ code: 'HOST'})
    .then((role) => {
      req.$scope.role = role;

      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function register (req, res, next) {
  const userEncryption = new req.db.User();
  const hashedPassword = userEncryption.encryptPassword(req.body.password);
  const userInput = {
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    houseNumber: req.body.houseNumber,
    streetName: req.body.streetName,
    city: req.body.city,
    country: req.body.country,
    state: req.body.state,
    postalCode: req.body.postalCode
  };

  const role = req.$scope.role;

  if (role.code.toUpperCase() === 'HOST') {
    userInput.hostName = req.body.hostName;
    userInput.lat = req.body.lat;
    userInput.long = req.body.long;
    userInput._long = role._id;
  } else {
    userInput.fname = req.body.fname;
    userInput.lname = req.body.lname;
    userInput.gender = req.body.gender;
    userInput._host = req.body._host;
    userInput.isVolunteer = req.body.isVolunteer || true;
  }

  const newUser = new req.db.User(userInput);

  return newUser.save()
    .then((user) => {
      req.$scope.user = user;
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function appendToHost (req, res, next) {
  const host = req.$scope.host;
  const user = req.$scope.user;
  return req.db.User.findByIdAndUpdate(host._id,
    { '$addToSet': { 'reporters': user._id } },
    { 'new': true, 'upsert': true })
    .then((host) => {
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function joinTeam (req, res, next) {
  const user = req.$scope.user;
  if (!req.body._team || req.body._team == '') {
    return next();
  }

  return teamInviteHelper.sendRequest(user._id, req.body._team)
    .then(({err}) => {
      if (err) {
        return internals.catchError(err, req, res);
      }
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function createTeam (req, res, next) {
  let teamInput;
  const host = req.$scope.host;
  const user = req.$scope.user;

  if (req.body._team && req.body._team != '') {
    return next();
  }

  if (req.body.isVolunteer === true || req.body.isVolunteer === 'true' || req.body.isVolunteer == 1) {
    teamInput = {
      teamName: req.body.teamName,
      teamEmail: req.body.teamEmail,
      _host: host._id,
      createdBy: user._id,
      creationMethod: 'REGISTRATION',
      isVolunteer: true,
      isApproved: true,
      _profilePic: req.body._profilePic
    }
  } else {
    teamInput = {
      teamName: req.body.teamName,
      teamEmail: req.body.teamEmail,
      _host: host._id,
      createdBy: user._id,
      creationMethod: 'REGISTRATION',
      isVolunteer: false,
      isApproved: false,
      _profilePic: req.body._profilePic
    }
  }

  return teamHelperV2.createTeam(user._id, host._id, teamInput)
    .then((team) => {
      req.$scope.team = team;
      
      return teamHelperV2.setActiveTeam(user._id, team._id);
    })
    .then(() => {
      return userHelper.findUserById(user._id);
    })
    .then((data) => {
      if (data.user && data.user._id) {
        req.$scope.user = data.user;
      }
      return next();
    })
    .catch((err) => {
      if (err.statusCode && err.statusCode == 400) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: err.message
        });
      }
      return internals.catchError(err, req, res);
    });
}

function sendTeamRequest (req, res, next) {
  const team = req.$scope.team;
  const { fname, lname, phoneNumber } = req.body;
  if (req.body.isVolunteer == true || req.body.isVolunteer == 'true' || req.body.isVolunteer == 1) {
    return next();
  }
  return mailingHelper.sendNewTeamRequestNotif(team, {fname, lname, phoneNumber})
    .then(({err}) => {
      if (err) {
        return internals.catchError(err, req, res);
      }
      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}


function respond (req, res, next) {
  const user = req.$scope.user;
  const host = req.$scope.host;
  const data = {
    user: user,
    setting: user.setting,
    token: JwtService.tokenForUser(user),
    _activeDesign: host._activeDesign
  };

  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    data: data
  });

  return (undefined);
}

module.exports = {
  validateUserParams,
  validateHostInput,
  validateEmail,
  checkHost,
  checkTeam,
  getUserRole,
  getHostRole,
  register,
  appendToHost,
  joinTeam,
  createTeam,
  sendTeamRequest,
  respond
};
