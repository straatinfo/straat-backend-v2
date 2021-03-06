const UserHelper = require('../helpers/user.helper');
const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const MailHelper = require('../helpers/mailing.helper');
const CodeGenerator = require('node-code-generator');
const generator = new CodeGenerator();
const pattern = '************';
const MediaUploadHelper = require('../helpers/mediaUpload.helper');

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
  const { id } = req.params; // must change with current user _id
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
  const { email } = req.body;
  try {
    // check email
    const checkU = await UserHelper.checkUserByCredentials(email);
    if (checkU.err) {
      return ErrorHelper.ClientError(res, {error: checkU.err}, 400);
    }
    if (!checkU.user) {
      return ErrorHelper.ClientError(res, {error: 'Invalid email'}, 400);
    }
    const userEmail = checkU.user.email;
    const code = generator.generateCodes(pattern, 1);
    const newPassword = code[0];
    const forgotP = await UserHelper.forgotPassword(userEmail, newPassword);
    if (forgotP.err) {
      return ErrorHelper.ClientError(res, {error: forgotP.err}, 400);
    }
    // send email for the generated password
    const sendMail = await MailHelper.forgotPasswordNotif(userEmail, newPassword);
    if (sendMail.err) {
      return ErrorHelper.ClientError(res, {error: sendMail.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Successfully sent email'});
    
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const changePassword = async (req, res, next) => {
  const { newPassword, confirmedPassword } = req.body;
  try {
    if (!req.user) {
      return ErrorHelper.ClientError(res, {error: 'Invalid User'}, 400);
    }
    if (newPassword !== confirmedPassword) {
      return ErrorHelper.ClientError(res, {error: 'password mismatch'}, 400);
    }
    const changeP = await UserHelper.changePassword(req.user._id, newPassword);
    if (changeP.err) {
      return ErrorHelper.ClientError(res, {error: changeP.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Successfully changed password'});
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
    const createMU = await MediaUploadHelper.createMediaUpload(req.file);
    // console.log(createMU);
    if (createMU.err) {
      return ErrorHelper.ClientError(res, {error: createMU.err}, 422);
    }
    const addProfileP = await UserHelper.updateUser(id, {'_profilePic': createMU.mediaUpload._id});
    console.log(addProfileP);
    if (addProfileP.err) {
      return ErrorHelper.ClientError(res, {error: addProfileP.err}, 400);
    }
    SuccessHelper.success(res, addProfileP.user);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const updateFcmToken = async (req, res, next) => {
  // will be protekted later
  const { fcmToken, _user } = req.body
  try {
    // if (!req.user) {
    //   return ErrorHelper.ClientError(res, {error: 'Invalid User'}, 400)
    // }
    const result = await UserHelper.updateFcmToken(_user, fcmToken)
    if (result.err) {
      return ErrorHelper.ClientError(res, {error: result.err}, 400)
    }
    SuccessHelper.success(res, result.data)
  }
  catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const mapRadiusSetting = async (req, res, next) => {
  
  try {
    const result = await UserHelper.mapRadiusSetting(req.params, req.body);
    if(!!result.error) {
      return ErrorHelper.ClientError(res, {error: result.error}, 400)
    }

    SuccessHelper.success(res, result.data)
  } catch(error) {
    ErrorHelper.ServerError(res)
  }
}

const changeViewed = async (req, res, next) => {
  try {
    const result = await UserHelper.changeViewed(req.params.id);
    if (!!result.error) {
      return ErrorHelper.ClientError(res, {error: result.error}, 400)
    } 

    SuccessHelper.success(res, result)
  } catch(e) {
    ErrorHelper.ServerError(res);
  }
}

module.exports = {
  getUserDetails: getUserDetails,
  updateUserDetails: updateUserDetails,
  forgotPassword: forgotPassword,
  changePassword: changePassword,
  addProfilePic: addProfilePic,
  mapRadiusSetting: mapRadiusSetting,
  changeViewed: changeViewed,
  updateFcmToken
};
