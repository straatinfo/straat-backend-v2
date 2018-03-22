const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');

const MediaUploadHelper = require('../helpers/mediaUpload.helper');

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

const uploadPhotoAndSave = async (req, res, next) => {
  try {
    if (!req.file) {
      return ErrorHelper.ClientError(res, {error: 'File not found'}, 400);
    }

    const response = await MediaUploadHelper.createMediaUpload(req.file)
    if (response.err) {
      return ErrorHelper.ClientError(res, {error: 'Error in saving upload'}, 400);
    }

    SuccessHelper.success(res, response.mediaUpload);
  }

  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  uploadPhoto: uploadPhoto,
  uploadPhotoAndSave
};
 