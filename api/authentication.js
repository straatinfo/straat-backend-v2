const UserHelper = require('../helpers/user.helper')
const SuccessHelper = require('../helpers/success.helper')
const ErrorHelper = require('../helpers/error.helper')
const JwtService = require('../service/jwt.service')

const LoginInit = async (_user) => {
  try {
    const userModel = UserHelper.userModel()
    const { _activeTeam, _role, teamMembers, teamLeaders } = await userModel.findById(_user, {_id: true}).populate(['_role', '_activeTeam', 'teamMembers', 'teamLeaders'])

    if (!(_role && _role.code.toString() === 'USER')) {
   // end if not user
      return Promise.resolve(true)
    }
  // console.log('_activeTeam, _role, teamMembers, teamLeaders', _activeTeam, _role, teamMembers, teamLeaders )
  // not valid active team, will be initialized
  // if no team then dont
    if (!_activeTeam) {
      console.log('no team')
      if (teamLeaders.length > 0) {
        await UserHelper.setActiveTeam(_user, teamLeaders[0]._team)
      } else if (teamMembers.length > 0) {
        await UserHelper.setActiveTeam(_user, teamMembers[0]._team)
      }
    }
    return Promise.resolve(true)
  } catch (e) {
    console.log('error in LoginInit', e)
  }
}

const login = async (req, res, next) => {
  try {
    // require _activeTeam
    // problem in reporting cause by user dont have activeTeam even it has a team
    // this will be remove if setup of active team is fix

    await LoginInit(req.user._id)

    // start
    const user = await UserHelper.findUserById(req.user._id)
    const data = {
      user: user.user,
      token: JwtService.tokenForUser(user.user),
      _activeDesign: (user.user.toObject()._host && user.user.toObject()._host._activeDesign) ? user.user.toObject()._host._activeDesign : null
    }
    SuccessHelper.success(res, data)
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = await UserHelper.createNewUser(req.body)
    if (newUser.err) {
      return ErrorHelper.ClientError(res, { error: newUser.err }, 400)
    }
    const user = await UserHelper.findUserById(newUser.user._id)
    const data = {
      user: user,
      token: JwtService.tokenForUser(user)
    }
    SuccessHelper.success(res, data)
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}

module.exports = {
  login: login,
  register: register
}
