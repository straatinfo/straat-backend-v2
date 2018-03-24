const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const DesignHelper = require('../helpers/design.helper');
const MediaUploadHelper = require('../helpers/mediaUpload.helper');

const getDesigns = async (req, res, next) => {
  const { hostId } = req.params;
  try {
    const getD = await DesignHelper.getDesigns(hostId);
    if (getD.err) {
      return ErrorHelper.ClientError(res, {error: getD.err}, 400);
    }
    if (req.query.flat == 'true') {
      req.designs = getD.designs;
      return next();
    }
    SuccessHelper.success(res, getD.designs);
  }
  catch (e) {
    console.log(e);
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
    if (!createD.design) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Input'}, 422);
    }
    const getDD = await DesignHelper.getDesignById(createD.design._id);
    if (getDD.err || !getDD.design) {
      return ErrorHelper.ClientError(res, {error: 'Cannot get design Details'}, 400);
    }
    if (req.query.flat == 'true') {
      const flatDesign = await DesignHelper.flatDesign(getDD.design);
      if (flatDesign.err) {
        return ErrorHelper.ClientError(res, {error: flatDesign.err}, 400);
      }
      return SuccessHelper.success(res, flatDesign.design);
    }
    SuccessHelper.success(res, getDD.design);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const addLogo = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.file) {
      return ErrorHelper.ClientError(res, {error: 'Cannot find logo'}, 400);
    }
    const createMU = await MediaUploadHelper.createMediaUpload(req.file);
    if (createMU.err) {
      return ErrorHelper.ClientError(res, {error: createMU.err}, 422);
    }
    const updateD = await DesignHelper.updateDesign(id, {'_profilePic': createMU.mediaUpload._id});
    if (updateD.err) {
      return ErrorHelper.ClientError(res, {error: updateD.err}, 400);
    }
    if (!updateD.design) {
      return ErrorHelper.ClientError(res, {error: 'Invalid input'}, 422);
    }
    const getDD = await DesignHelper.getDesignById(updateD.design._id);
    if (getDD.err || !getDD.design) {
      return ErrorHelper.ClientError(res, {error: 'Cannot get design Details'}, 400);
    }
    if (req.query.flat == 'true') {
      const flatDesign = await DesignHelper.flatDesign(getDD.design);
      if (flatDesign.err) {
        return ErrorHelper.ClientError(res, {error: flatDesign.err}, 400);
      }
      return SuccessHelper.success(res, flatDesign.design);
    }
    SuccessHelper.success(res, flatDesign);
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
    if (req.query.flat == 'true') {
      const flatDesign = await DesignHelper.flatDesign(getDBI.design);
      if (flatDesign.err) {
        return ErrorHelper.ClientError(res, {error: flatDesign.err}, 400);
      }
      return SuccessHelper.success(res, flatDesign.design);
    }
    SuccessHelper.success(res, getDBI.design);
  }
  catch (e) {
    console.log(e);
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
    if (!updateD.design) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Inputs'}, 422);
    }
    const getDD = await DesignHelper.getDesignById(updateD.design._id);
    if (getDD.err || !getDD.design) {
      return ErrorHelper.ClientError(res, {error: 'Cannot get design Details'}, 400);
    }
    if (req.query.flat == 'true') {
      const flatDesign = await DesignHelper.flatDesign(getDD.design);
      if (flatDesign.err) {
        return ErrorHelper.ClientError(res, {error: flatDesign.err}, 400);
      }
      return SuccessHelper.success(res, flatDesign.design);
    }
    SuccessHelper.success(res, updateD.design);
  }
  catch (e) {
    console.log(e);
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
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const setActiveDesign = async (req, res, next) => {
  const { hostId, designId } = req.params;
  try {
    if (!hostId || !designId) {
      return ErrorHelper.ClientError(res, {error: 'Invalid hostID or DesignID'}, 400);
    }
    const setAD = await DesignHelper.setActiveDesign(hostId, designId);
    if (setAD.err) {
      return ErrorHelper.ClientError(res, {error: setAD.err}, 400);
    }
    const getD = await DesignHelper.getDesignById(designId);
    SuccessHelper.success(res, getD.design);
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
  deleteDesign: deleteDesign,
  setActiveDesign: setActiveDesign
};
