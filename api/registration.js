const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const RegistrationHelper = require('../helpers/registration.helper');
const MailingHelper = require('../helpers/mailing.helper');
const UserHelper = require('../helpers/user.helper');
const TeamHelper = require('../helpers/team.helper');
const TeamInviteHelper = require('../helpers/teamInvite.helper');
const JwtService = require('../service/jwt.service');

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
    const createU = await UserHelper.createNewUser(input);
    if (createU.err) {
      return ErrorHelper.ClientError(res, {error: createU.err}, 400);
    }
    const getU = await UserHelper.findUserById(createU.user._id);

    // create or join team
    let teamInput = {}, createT, requestT;
    if (req.body._team) {
      requestT = await TeamInviteHelper.sendRequest(getU.user._id, request.body._team);
      if (requestT.err) {
        return ErrorHelper.ClientError(res, {error: 'There was an error requesting team'}, 400);
      }
    } else {
      // if isVolunteer === true can create team and isApproved = true
      if (req.body.isVolunteer) {
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

module.exports = {
  requestForCode: requestForCode,
  registerWithCode: registerWithCode,
  registerWithCodeV2: registerWithCodeV2
};
