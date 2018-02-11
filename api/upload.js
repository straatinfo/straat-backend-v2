const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');

const uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return ErrorHelper.ClientError(res, {error: 'File not found'}, 400);
    }
    SuccessHelper.success(res, req.file);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  uploadPhoto: uploadPhoto
};
