const UserHelper = require('../helpers/user.helper');
const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const JwtService = require('../service/jwt.service');

const checkUserInput = async (req, res, next) => {
  res.send('success');
};

const login = async (req, res, next) => {
  try {
    const user = await UserHelper.findUserById(req.user._id);
    const data = {
      user: user.user,
      token: JwtService.tokenForUser(user.user)
    };
    SuccessHelper.success(res, data);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = await UserHelper.createNewUser(req.body);
    if (newUser.err) {
      return ErrorHelper.ClientError(res, { error: newUser.err }, 400);
    }
    const user = await UserHelper.findUserById(newUser.user._id);
    const data = {
      user: user,
      token: JwtService.tokenForUser(user)
    }
    SuccessHelper.success(res, data);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
}

module.exports = {
  checkUserInput: checkUserInput,
  login: login,
  register: register
};
