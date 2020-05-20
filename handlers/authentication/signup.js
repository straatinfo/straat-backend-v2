const Transaction = require('mongoose-transactions');

const internals = {};
internals.catchError = async function (err, req, res) {
  req.log.error(err, 'POST /v4/api/authentication/signup');

  if (req.$scope.transaction && req.$scope.transaction.rollback) {
    await req.$scope.transaction.rollback();
    req.$scope.transaction.clean();
  }

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

  if (!req.body._team) {
    schema.teamName = {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Team Name'
      }
    };

    schema.teamEmail = {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Team Email'
      }
    }
  }

  req.checkBody(schema);
  req.check('gender', 'Invalid Parameter: Gender').isIn(['M', 'F'])
  const validationErrors = req.validationErrors();

  if (validationErrors) {
    const errorObject = req.lib.errorResponses.validationError(validationErrors);
    req.log.warn(errorObject, 'POST /v4/api/authentication/signup');
    return res.status(errorObject.httpCode).send(errorObject);
  } else {
    return next();
  }
}

function validateEmail (req, res, next) {
  return req.db.User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        const error = {
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Invalid Parameter: Email - Already in used' 
        };
  
        req.log.warn(error, 'POST /v4/api/authentication/signup');
        return res.status(400).send(error);
      }

      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function checkHost (req, res, next) {
  const _host = req.body._host;
  return req.db.Host.findById(_host)
    .then((host) => {
      if (!host) {
        const error = {
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Invalid Parameter: Host ID'
        };
        req.log.warn(error, 'POST /v4/api/authentication/signup');
        return res.status(400).send(error);
      }
      req.$scope.host = host;
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
} 

function checkTeam (req, res, next) {
  // used if the user wants to join team
  if (!req.body._team || req.body._team == '') {
    return next();
  }

  return req.db.Team.findById(req.body._team)
    .then((team) => {
      if (!team) {
        const error = {
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Invalid parameter: Team ID'
        };

        req.log.warn(error, 'POST /v4/api/authentication/signup');
        return res.status(400).send(error);
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

async function createUser (req, res, next) {
  try {
    const transaction = new Transaction();
    req.$scope.transaction = transaction;
    const userId = await req.$scope.transaction.insert('User', {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      houseNumber: req.body.houseNumber,
      streetName: req.body.streetName,
      city: req.body.city,
      country: req.body.country,
      state: req.body.state,
      postalCode: req.body.postalCode,
      fname: req.body.fname,
      lname: req.body.lname,
      gender: req.body.gender,
      _host: req.body._host,
      _role: (await req.db.Role.findOne({ code: 'USER' }))._id,
      isVolunteer: (req.body.isVolunteer !== null) ? req.body.isVolunteer : true
    });

    req.$scope.userId = userId;

    next();
  }
  catch (err) {
    internals.catchError(err, req, res)
  }
}

async function joinTeam (req, res, next) {
  const transaction = req.$scope.transaction;
  const userId = req.$scope.userId;
  if (!req.body._team || req.body._team == '') {
    return next();
  }

  try {
    const teamInvite = await transaction.insert('TeamInvite', {
      _user: userId,
      _team: req.body._team,
      isRequest: true
    });

    next();
  } catch (err) {
    internals.catchError(err, req, res);
  }
}


async function createTeam (req, res, next) {
  const transaction = req.$scope.transaction;
  let teamInput;
  const host = req.$scope.host;
  const userId = req.$scope.userId;

  if (req.body._team && req.body._team != '') {
    return next();
  }

  if (req.body.isVolunteer === true || req.body.isVolunteer === 'true' || req.body.isVolunteer == 1) {
    teamInput = {
      teamName: req.body.teamName,
      teamEmail: req.body.teamEmail,
      _host: host._id,
      createdBy: userId,
      creationMethod: 'REGISTRATION',
      isVolunteer: true,
      isApproved: true,
      _profilePic: req.body._profilePic || req.body._teamProfilePic
    }
  } else {
    teamInput = {
      teamName: req.body.teamName,
      teamEmail: req.body.teamEmail,
      _host: host._id,
      createdBy: userId,
      creationMethod: 'REGISTRATION',
      isVolunteer: false,
      isApproved: false,
      _profilePic: req.body._profilePic || req.body._teamProfilePic
    }
  }

  try {
    const teamId = await transaction.insert('Team', teamInput);

    const teamMember = await transaction.insert('TeamMember', {
      _user: userId,
      _team: teamId,
      active: true,
      isLeader: true
    });

    next();
  } catch (err) {
    internals.catchError(err, req, res)
  }
}

async function commitTransaction (req, res, next) {
  try {
    const transaction = req.$scope.transaction;
    await transaction.run();

    next();
  } catch (e) {
    internals.catchError(e, req, res);
  }
}

function sendTeamRequest (req, res, next) {
  const { fname, lname, phoneNumber } = req.body;
  if (req.body.isVolunteer == true || req.body.isVolunteer == 'true' || req.body.isVolunteer == 1) {
    return next();
  }
  return req.lib.mail.sendNewTeamRequestNotif({ teamName: req.body.teamName, teamEmail: req.body.teamEmail }, {fname, lname, phoneNumber})
    .then((result) => {
      req.log.info(result, 'POST /v4/api/authentication/signup');
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function getUserData (req, res, next) {
  return req.db.User.findById(req.$scope.userId)
    .then((user) => {
      req.$scope.user = user;

      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function getTeamData (req, res, next) {
  if (!req.body._team || req.body._team == '') {
    return next();
  }
  const user = req.$scope.userData;
  const token = req.$scope.token;
  const teamId = req.$scope.teamId;

  return req.db.TeamMember.find({ _team: team._id })
    .populate('_user')
    .then((teamMembers) => {
      const tokens = teamMembers.reduce((pv, cv) => {
          if (cv && cv._user && cv._user.firebaseTokens) {
            cv._user.firebaseTokens.map(ft => {
              pv.push(ft.token);
            });
          }
          return pv;
        }, []);

      req.$scope.fcmTokens = tokens;
      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

async function sendNotification (req, res, next) {
  if (!req.body._team || req.body._team == '') {
    return next();
  }
  const user = req.$scope.userData;
  const token = req.$scope.token;
  try {
    const fcmTokens = req.$scope.fcmTokens || [];
    const teamId = req.body._team || req.body.teamId;
    const teamRequests = await req.db.TeamInvite.find({ _team: teamId });
    const message = {
      data: {
        teamId: teamId || '',
        teamRequestsCount: String(teamRequests.length) || '0',
        customPayloadId: 'NEW_USER_REQUEST_NOTIFICATION_GROUP'
      },
      notification: {
        title: `New request to join team`,
        body: teamRequests && teamRequests.length > 0 ? `There are ${teamRequests.length} new requests` :``,
      },
      android: {
        ttl: 3600 * 1000,
        notification: {
          icon: process.env.DEFAULT_ANDROID_NOTIF_ICON,
          click_action: '.MyTeamActivity',
          title: `New request to join team`,
          body: teamRequests && teamRequests.length > 0 ? `There are ${teamRequests.length} new requests` :``,
          color: process.env.DEFAULT_ANDROID_NOTIF_COLOR,
          sound : process.env.DEFAULT_ANDROID_NOTIF_SOUND,
          tag: 'NEW_USER_REQUEST_NOTIFICATION_GROUP'
        }
      },
      apns: {
        payload: {
          aps: {
            'content-available': 1,
            alert: teamRequests && teamRequests.length > 0 ? `New request to join team\nThere are ${teamRequests.length} new requests` :`New request to join team`,
            badge: teamRequests && teamRequests.length || 0,
            sound: 'default'
          }
        }
      }
    };

    const sendMessages = await req.lib.fcm.sendToMultipleTokenAsync(message, fcmTokens);
    req.log.info(sendMessages, 'POST /v4/api/authentication/signup');
  } catch (e) {
    internals.catchError(e, req, res);
  }

  next();
}

function respond (req, res, next) {
  const userId = req.$scope.userId;
  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    token: req.lib.crypto.signJwt(userId)
  });
}

module.exports = {
  validateUserParams,
  validateEmail,
  checkHost,
  checkTeam,
  getUserRole,
  createUser,
  joinTeam,
  createTeam,
  commitTransaction,
  sendTeamRequest,
  getUserData,
  getTeamData,
  sendNotification,
  respond
};
