const SuccessHelper = require('../helpers/success.helper')
const ErrorHelper = require('../helpers/error.helper')
const RegistrationHelper = require('../helpers/registration.helper')
const MailingHelper = require('../helpers/mailing.helper')
const UserHelper = require('../helpers/user.helper')
const TeamHelper = require('../helpers/team.helper')
const TeamInviteHelper = require('../helpers/teamInvite.helper')
const MediaUploadHelper = require('../helpers/mediaUpload.helper')
const JwtService = require('../service/jwt.service')
const HostHelper = require('../helpers/host.helper')

// will use till v2 registration fix
const TeamHelperV2 = require('../helpers/teamV2.helper')

const checkUserInput = async (req, res, next) => {
  const { username, email, teamEmail, teamName, code, city, coordinate, isCoor, postalCode, houseNumber, phoneNumber } = req.body
  try {
    let checkUsername, checkEmail, checkTeamEmail, checkTeamName, checkCode
    // check for username
    if (username) {
      checkUsername = await UserHelper.checkUserByCredentials(username)
      if (checkUsername.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
      if (checkUsername.user) {
        return ErrorHelper.UserError(res, {error: 'already taken'}, 200)
      }
    }
    // check for email
    if (email) {
      checkEmail = await UserHelper.checkUserByCredentials(email)
      if (checkEmail.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
      if (checkEmail.user) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
    }

    // check for teamEmail
    if (teamEmail) {
      checkTeamEmail = await TeamHelper.checkTeamByCredentials(teamEmail)
      if (checkTeamEmail.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
      if (checkTeamEmail.team) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
    }
    // check teamName
    if (teamName) {
      checkTeamName = await TeamHelper.checkTeamByCredentials(teamName)
      if (checkTeamName.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
      if (checkTeamName.team) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
    }
    // check code
    if (code) {
      checkCode = await RegistrationHelper.getHostId(code)
      if (checkCode.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
      if (!checkCode._host) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
    }
     // check city
    if (city) {
      const data = await RegistrationHelper.getHostIdByCity(city, coordinate, isCoor)
      if (data.err) {
        return ErrorHelper.UserError(res, {error: data.err}, 200)
      }
      if (!data._host) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
      return SuccessHelper.success(res, data)
    }

    // postal Code
    if (postalCode && houseNumber) {
      console.log('postalcode:', postalCode)
      const data = await RegistrationHelper.validateNumber(postalCode, houseNumber)
      if (!data) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }

      if (data.err) {
        return ErrorHelper.UserError(res, {error: data.err}, 200)
      }
      return SuccessHelper.success(res, data)
    }

    // postal Code
    if (postalCode) {
      const data = await RegistrationHelper.validatePostalCode(postalCode)
      if (!data) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }

      if (data.err) {
        return ErrorHelper.UserError(res, {error: data.err}, 200)
      }
      return SuccessHelper.success(res, data)
    }

    // 
    if (phoneNumber) {
      const data = await RegistrationHelper.validatePhoneNumber(phoneNumber)
      if (data.err) {
        return ErrorHelper.UserError(res, {error: 'Invalid input'}, 200)
      }
      return SuccessHelper.success(res, data)
    }
    SuccessHelper.success(res, {message: 'Valid input'})
  } catch (e) {
    ErrorHelper.ServerError(e)
  }
}

const checkHostWithCode = async (req, res, next) => {
  const { code } = req.body
  try {
    const checkCode = await RegistrationHelper.getHostId(code)
    if (checkCode.err) {
      return ErrorHelper.UserError(res, {error: checkCode.err}, 400)
    }
    if (!checkCode._host) {
      return ErrorHelper.UserError(res, {error: 'Invalid code'}, 422)
    }
    const getHost = await HostHelper.getHostById(checkCode._host)
    if (getHost.err || !getHost.host) {
      return ErrorHelper.UserError(res, {error: 'Invalid code'}, 422)
    }
    SuccessHelper.success(res, getHost.host)
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const requestForCode = async (req, res, next) => {
  try {
    const codeReq = await MailingHelper.sendRegistrationRequestNotif(req.body)
    if (codeReq.err) {
      return ErrorHelper.ClientError(res, {error: codeReq.err}, 400)
    }
    SuccessHelper.success(res, {message: 'Successfully sent request'})
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}

const registerWithCode = async (req, res, next) => {
  const { code } = req.body
  try {
    const getHost = await RegistrationHelper.getHostId(code)
    if (getHost.err) {
      return ErrorHelper.ClientError(res, {error: getHost.err}, 400)
    }
    const input = {
      ...req.body,
      '_host': getHost._host
    }
    const createU = await UserHelper.createNewUser(input)
    if (createU.err) {
      return ErrorHelper.ClientError(res, {error: createU.err}, 400)
    }
    const getU = await UserHelper.findUserById(createU.user._id)

    // create or join team

    SuccessHelper.success(res, getU.user)
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const registerWithCodeV2 = async (req, res, next) => {
  const { code } = req.body
  try {
    const getHost = await RegistrationHelper.getHostId(code)
    if (getHost.err) {
      return ErrorHelper.ClientError(res, {error: getHost.err}, 400)
    }
    const input = {
      ...req.body,
      '_host': getHost._host
    }

    const checkUsername = await UserHelper.checkUserByCredentials(input.username)
    const checkEmail = await UserHelper.checkUserByCredentials(input.email)
    if (checkUsername.err || checkEmail.err) {
      return ErrorHelper.ClientError(res, {error: 'Error in checking username and email validity'}, 400)
    }
    if (checkUsername.user || checkEmail.user) {
      return ErrorHelper.ClientError(res, {error: 'Username or email is already in used'})
    }

    const createU = await UserHelper.createNewUser(input)
    if (createU.err) {
      return ErrorHelper.ClientError(res, {error: createU.err}, 400)
    }

    // create or join team
    let teamInput = {}, createT, requestT
    if (req.body._team) {
      // if there is team id
      requestT = await TeamInviteHelper.sendRequest(createU.user._id, req.body._team)
      if (requestT.err) {
        return ErrorHelper.ClientError(res, {error: 'There was an error requesting team'}, 400)
      }
    } else {
      // if isVolunteer === true can create team and isApproved = true
      if (req.body.isVolunteer == true) {
        teamInput = {
          teamName: req.body.teamName,
          teamEmail: req.body.teamEmail,
          isVolunteer: true,
          isApproved: true
        }
      } else {
        teamInput = {
          teamName: req.body.teamName,
          teamEmail: req.body.teamEmail,
          isVolunteer: false,
          isApproved: false
        }
      }
      createT = await TeamHelper.createTeam(createU.user._id, teamInput)
      if (createT.err) {
        console.log(createT.err)
        return ErrorHelper.ClientError(res, {error: 'There was an error in creating team'}, 400)
      }
      const addActiveTeam = await UserHelper.updateUser(createU.user._id, {'_activeTeam': createT.team._id})
    }

    if (req.file && createT.team) {
      const createMediaUpload = await MediaUploadHelper.createMediaUpload(req.file)
      if (createMediaUpload.err) {
        return ErrorHelper.ClientError(res, {error: createMediaUpload.err}, 400)
      }
      const updateT = await TeamHelper.updateTeam(createT.team._id, {'_profilePic': createMediaUpload.mediaUpload._id})
    }
    const getU = await UserHelper.findUserById(createU.user._id)
    // give token
    const token = JwtService.tokenForUser(getU.user)
    SuccessHelper.success(res, { user: getU.user, token: token })
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}

const registerWithCodeV3 = async (req, res, next) => {
  const { code, password, username, email, teamPhotoUploaded, teamPhotoId, fname, lname, phoneNumber } = req.body
  try {
    let createU = {}
    /**
    const getHost = await RegistrationHelper.getHostId(code);

    if (getHost.err) {
      return ErrorHelper.ClientError(res, {error: getHost.err}, 400);
    }

    const input = {
      ...req.body,
      '_host': getHost._host
    };
    */
    const input = { ...req.body }

    const user = await UserHelper.checkUserByUNameEmail(username, email)

    if (user.err) {
      return ErrorHelper.ClientError(res, {error: 'Error in checking username and email validity'}, 400)
    }

    if (user.user) {
      const isRegistration = await UserHelper.comparePassword(password, user.user.password)
      console.log('isRegistration', isRegistration)
      if (!isRegistration.res) {
        return ErrorHelper.ClientError(res, {error: 'Username or email is already in used'})
      }
      createU = user
    } else {
      createU = await UserHelper.createNewUser(input)
      if (createU.err) {
        return ErrorHelper.ClientError(res, {error: createU.err}, 400)
      }
    }
    // when code come here that means user already registered ang ready to get a team
    console.log('createU', createU)
    // create or join team
    let teamInput = {}, createT, requestT, team
    if (req.body._team) {
      // if there is team id
      requestT = await TeamInviteHelper.sendRequest(createU.user._id, req.body._team)
      if (requestT.err) {
        return ErrorHelper.ClientError(res, {error: 'There was an error requesting team'}, 400)
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
          createdBy: createU.user._id,
          creationMethod: 'REGISTRATION',
          isVolunteer: true,
          isApproved: true
        }
      } else {
        teamInput = {
          teamName: req.body.teamName,
          teamEmail: req.body.teamEmail,
          logoUrl: req.body.logoUrl,
          logoSecuredUrl: req.body.logoSecuredUrl,
          _host: createU.user._host,
          createdBy: createU.user._id,
          creationMethod: 'REGISTRATION',
          isVolunteer: false,
          isApproved: false
        }
      }

      if (teamPhotoUploaded && teamPhotoUploaded._id) {
        teamInput._profilePic = teamPhotoUploaded._id
      } else if (teamPhotoId && teamPhotoId != "") {
        teamInput._profilePic = teamPhotoId;
      }

      console.log(teamInput)
      createT = await TeamHelperV2.createTeam(createU.user._id, createU.user._host, teamInput)
      if (createT.error || !createT._id) {
        console.log(createT.error)
        return ErrorHelper.ClientError(res, {error: createT.error || 'There was an error in creating team'}, 400)
      }
      console.log('createTed: ', createT)
      const addActiveTeam = await TeamHelperV2.setActiveTeam(createU.user._id, createT._id)
      let sendNewTeamRequest
      if (req.body.isVolunteer === true || req.body.isVolunteer === 'true') {
        // not sending request
        console.log('Team is volunteer not sending request');
      } else {
        sendNewTeamRequest = await MailingHelper.sendNewTeamRequestNotif(createT, {fname, lname, phoneNumber})
      }
      if (sendNewTeamRequest && sendNewTeamRequest.err) {
        return resolve({err: 'team was created but request to approve was not sent'})
      }
    }

    const getU = await UserHelper.findUserById(createU.user._id)
    // give token
    const token = JwtService.tokenForUser(getU.user)
    SuccessHelper.success(res, { user: getU.user, token: token })
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}

module.exports = {
  requestForCode: requestForCode,
  registerWithCode: registerWithCode,
  registerWithCodeV2: registerWithCodeV2,
  registerWithCodeV3: registerWithCodeV3,
  checkUserInput: checkUserInput,
  checkHostWithCode: checkHostWithCode
}
