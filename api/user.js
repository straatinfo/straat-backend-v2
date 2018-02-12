const UserHelper = require('../helpers/user.helper');
const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');

const getUserDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getU = await UserHelper.findUserById(id);
    if (getU.err) {
      return ErrorHelper.ClientError(res, {error: getU.err}, 400);
    }
    if (!getU.user) {
      return ErrorHelper.ClientError(res, { error: 'Invalid Id'}, 400);
    }
    SuccessHelper.success(res, getU.user);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateUserDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateU = await UserHelper.updateUser(id, req.body);
    if (updateU.err) {
      return ErrorHelper.ClientError(res, {error: updateU.err}, 400);
    }
    SuccessHelper.success(res, updateU.user);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const forgotPassword = async (req, res, next) => {
  const { id } = req.params;
  try {
    
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const changePassword = async (req, res, next) => {
  const { email, password, confirmedPassword } = req.body;
  try {
    if (password !== confirmedPassword) {
      return ErrorHelper.ClientError(res, {error: 'password mismatch'}, 400);
    }
    const changeP = await UserHelper.changePassword(email, password);
  
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const addProfilePic = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.file) {
      return ErrorHelper.ClientError(res, {error: 'Invalid file'}, 400);
    }
    const addProfileP = await UserHelper.updateUser(id, {'_picUrl': req.file.url, '_picSecuredUrl': request.file.secure_url});
    if (addProfileP.err) {
      return ErrorHelper.ClientError(res, {error: addProfileP.err}, 400);
    }
    SuccessHelper.success(res, addProfileP.user);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getUserDetails: getUserDetails,
  updateUserDetails: updateUserDetails,
  forgotPassword: forgotPassword,
  changePassword: changePassword,
  addProfilePic: addProfilePic
};