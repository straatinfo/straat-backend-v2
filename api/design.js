const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const DesignHelper = require('../helpers/design.helper');

const getDesigns = async (req, res, next) => {
  const { hostId } = req.params;
  try {
    const getD = await DesignHelper.getDesigns(hostId);
    if (getD.err) {
      return ErrorHelper.ClientError(res, {error: getD.err}, 400);
    }
    SuccessHelper.success(res, getD.designs);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const createDesign = async (req, res, next) => {
  const { hostId } = req.params;
  try {
    const getD = await DesignHelper.getDesigns(hostId);
    if (getD.err) {
      return ErrorHelper.ClientError(res, {error: getD.err}, 400);
    }
    if (getD.designs.length > 4) {
      return ErrorHelper.ClientError(res, {error: 'Design storage limit has reached'});
    }
    const createD = await DesignHelper.createDesign(hostId, req.body);
    if (createD.err) {
      return ErrorHelper.ClientError(res, {error: createD.err}, 400);
    }
    SuccessHelper.success(res, createD.design);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const addLogo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { url, secure_url } = req.file;
    if (!url || !secure_url) {
      return ErrorHelper.ClientError(res, {error: 'Cannot find logo'}, 400);
    }
    const updateD = await DesignHelper.updateDesign(id, {'url': url, 'secure_url': secure_url});
    if (updateD.err) {
      return ErrorHelper.ClientError(res, {error: updateD.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const getDesignById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getDBI = await DesignHelper.getDesignById(id);
    if (getDBI.err) {
      return ErrorHelper.ClientError(res, {error: getDBI.err}, 400);
    }
    SuccessHelper.success(res, getDBI.design);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateDesign = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateD = await DesignHelper.updateDesign(id, req.body);
    if (updateD.err) {
      return ErrorHelper.ClientError(res, {error: updateD.err}, 400);
    }
    SuccessHelper.success(res, updateD.design);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const deleteDesign = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteD = await DesignHelper.deleteDesign(id);
    if (deleteD.err) {
      return ErrorHelper.ClientError(res, {error: deleteD.err}, 400);
    }
    SuccessHelper.success(res, deleteD.design);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getDesigns: getDesigns,
  createDesign: createDesign,
  addLogo: addLogo,
  getDesignById: getDesignById,
  updateDesign: updateDesign,
  deleteDesign: deleteDesign
};
