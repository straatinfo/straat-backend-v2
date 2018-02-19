const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const RegistrationHelper = require('../helpers/registration.helper');
const MailingHelper = require('../helpers/mailing.helper');
const UserHelper = require('../helpers/user.helper');
const TeamHelper = require('../helpers/team.helper');
const TeamInviteHelper = require('../helpers/teamInvite.helper');
const JwtService = require('../service/jwt.service');

const checkUserInput = async (req, res, next) => {
  const { username, email, teamEmail, teamName, code } = req.body;
  try {
    let checkUsername, checkEmail, checkTeamEmail, checkTeamName, checkCode;
    // check for username
    if (username) {
      checkUsername = await UserHelper.checkUserByCredentials(username);
      if (checkUsername.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200);
      }
      if (checkUsername.user) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200);
      }
    }
    // check for email
    if (email) {
      checkEmail = await UserHelper.checkUserByCredentials(email);
      if (checkEmail.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200);
      }
      if (checkEmail.user) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200);
      }
    }

    // check for teamEmail
    if (teamEmail) {
      checkTeamEmail = await TeamHelper.checkTeamByCredentials(teamEmail);
      if (checkTeamEmail.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200);
      }
      if (checkTeamEmail.team) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200);
      }
    }
    // check teamName
    if (teamName) {
      checkTeamName = await TeamHelper.checkTeamByCredentials(teamName);
      if (checkTeamName.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200);
      }
      if (checkTeamName.team) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200);
      }
    }
    // check code
    if (code) {
      checkCode = await RegistrationHelper.getHostId(code);
      if (checkCode.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200);
      }
      if (!checkCode._host) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200);
      }
    }
    SuccessHelper.success(res, {message: 'Valid input'});
  }
  catch (e) {
    ErrorHelper.ServerError(e);
  }

};

const requestForCode = async (req, res, next) => {
  try {
    const codeReq = await MailingHelper.sendRegistrationRequestNotif(req.body);
    if (codeReq.err) {
      return ErrorHelper.ClientError(res, {error: codeReq.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Successfully sent request'});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const registerWithCode = async (req, res, next) => {
  const { code } = req.body;
  try {
    const getHost = await RegistrationHelper.getHostId(code);
    if (getHost.err) {
      return ErrorHelper.ClientError(res, {error: getHost.err}, 400);
    }
    const input = {
      ...req.body,
      '_host': getHost._host
    };
    const createU = await UserHelper.createNewUser(input);
    if (createU.err) {
      return ErrorHelper.ClientError(res, {error: createU.err}, 400);
    }
    const getU = await UserHelper.findUserById(createU.user._id);

    // create or join team

    SuccessHelper.success(res, getU.user);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const registerWithCodeV2 = async (req, res, next) => {
  const { code } = req.body;
  try {
    const getHost = await RegistrationHelper.getHostId(code);
    if (getHost.err) {
      return ErrorHelper.ClientError(res, {error: getHost.err}, 400);
    }
    const input = {
      ...req.body,
      '_host': getHost._host
    };

    const checkUsername = await UserHelper.checkUserByCredentials(input.username);
    const checkEmail = await UserHelper.checkUserByCredentials(input.email);
    if (checkUsername.err || checkEmail.err) {
      return ErrorHelper.ClientError(res, {error: 'Error in checking username and email validity'}, 400);
    }
    if (checkUsername.user || checkEmail.user) {
      return ErrorHelper.ClientError(res, {error: 'Username or email is already in used'});
    }

    const createU = await UserHelper.createNewUser(input);
    if (createU.err) {
      return ErrorHelper.ClientError(res, {error: createU.err}, 400);
    }
    console.log(createU);
    const getU = await UserHelper.findUserById(createU.user._id);

    // create or join team
    let teamInput = {}, createT, requestT;
    if (req.body._team) {
      // if there is team id
      requestT = await TeamInviteHelper.sendRequest(getU.user._id, req.body._team);
      if (requestT.err) {
        return ErrorHelper.ClientError(res, {error: 'There was an error requesting team'}, 400);
      }
    } else {
      // if isVolunteer === true can create team and isApproved = true
      if (req.body.isVolunteer == true) {
        teamInput = {
          teamName: req.body.teamName,
          teamEmail: req.body.teamEmail,
          isVolunteer: true,
          isApproved: true
        };
      } else {
        teamInput = {
          teamName: req.body.teamName,
          teamEmail: req.body.teamEmail,
          isVolunteer: false,
          isApproved: false
        };
      }
      createT = await TeamHelper.createTeam(getU.user._id, teamInput);
      if (createT.err) {
        console.log(createT.err);
        return ErrorHelper.ClientError(res, {error: 'There was an error in creating team'}, 400);
      }
    }

    if (req.file && createT.team) {
      const fileInput = {
        logoUrl: req.file.url,
        securedLogoUrl: req.file.secure_url
      };
      const updateT = await TeamHelper.updateTeam(createT.team._id, fileInput);
    }

    // give token
    const token = JwtService.tokenForUser(getU.user._id);
    SuccessHelper.success(res, { user: getU.user, token: token });
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const registerWithCodeV3 = async (req, res, next) => {
  const { code } = req.body;
  try {
    const getHost = await RegistrationHelper.getHostId(code);
    if (getHost.err) {
      return ErrorHelper.ClientError(res, {error: getHost.err}, 400);
    }
    const input = {
      ...req.body,
      '_host': getHost._host
    };

    const checkUsername = await UserHelper.checkUserByCredentials(input.username);
    const checkEmail = await UserHelper.checkUserByCredentials(input.email);
    if (checkUsername.err || checkEmail.err) {
      return ErrorHelper.ClientError(res, {error: 'Error in checking username and email validity'}, 400);
    }

    if (checkUsername.user || checkEmail.user) {
      return ErrorHelper.ClientError(res, {error: 'Username or email is already in used'});
    }

    const createU = await UserHelper.createNewUser(input);
    if (createU.err) {
      return ErrorHelper.ClientError(res, {error: createU.err}, 400);
    }
    const getU = await UserHelper.findUserById(createU.user._id);

    // create or join team
    let teamInput = {}, createT, requestT, team;
    if (req.body._team) {
      // if there is team id
      requestT = await TeamInviteHelper.sendRequest(getU.user._id, req.body._team);
      if (requestT.err) {
        return ErrorHelper.ClientError(res, {error: 'There was an error requesting team'}, 400);
      }
    } else {
      // if isVolunteer === true can create team and isApproved = true
      if (req.body.isVolunteer === true || req.body.isVolunteer === 'true') {
        teamInput = {
          teamName: req.body.teamName,
          teamEmail: req.body.teamEmail,
          logoUrl: req.body.logoUrl,
          logoSecuredUrl: req.body.logoSecuredUrl,
          _host: createU.user._host,
          isVolunteer: true,
          isApproved: true
        };
      } else {
        teamInput = {
          teamName: req.body.teamName,
          teamEmail: req.body.teamEmail,
          logoUrl: req.body.logoUrl,
          logoSecuredUrl: req.body.logoSecuredUrl,
          _host: createU.user._host,
          isVolunteer: false,
          isApproved: false
        };
      }
      console.log(teamInput);
      createT = await TeamHelper.createTeam(getU.user._id, teamInput);
      if (createT.err) {
        console.log(createT.err);
        return ErrorHelper.ClientError(res, {error: 'There was an error in creating team'}, 400);
      }
      let sendNewTeamRequest;
      if (req.body.isVolunteer != true) {
        sendNewTeamRequest = await MailingHelper.sendNewTeamRequestNotif(createT.team);
      }
      if (sendNewTeamRequest && sendNewTeamRequest.err) {
        return resolve({err: 'team was created but request to approve was not sent'});
      }
    }

    // give token
    const token = JwtService.tokenForUser(getU.user._id);
    SuccessHelper.success(res, { user: getU.user, token: token });
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  requestForCode: requestForCode,
  registerWithCode: registerWithCode,
  registerWithCodeV2: registerWithCodeV2,
  registerWithCodeV3: registerWithCodeV3,
  checkUserInput: checkUserInput
};
