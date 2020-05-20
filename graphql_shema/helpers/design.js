const mongoose = require('mongoose');

async function _validateParams (req) {
  const { hostId } = req.body;
  let error = {
    status: 'ERROR',
    statusCode: 102,
    httpCode: 400,
    message: 'Invalid Parameter: Host ID'
  };

  if (!mongoose.isValidObjectId(hostId)) {
    throw error;
  }

  const host = await req.db.Host.findById(hostId).populate('_design');
  if (!host) {
    throw error;
  }
  req.$scope.host = host;
  return req;
}

async function _createDesign (req) {
  const { hostId, colorOne, colorTwo, colorThree, profilePic } = req.body;
  const host = req.$scope.host;
  let createObj = {
    colorOne,
    colorTwo,
    colorThree
  };
  if (profilePic && profilePic != '' && mongoose.isValidObjectId(profilePic)) {
    createObj._profilePic = profilePic;
  }
  let design;
  if (host._design && host._design._id) {
    design = await req.db.Design.findOneAndUpdate({ _host: hostId }, createObj);
  } else {
    createObj._host = hostId;
    design = await req.db.Design.create(createObj);
  }

  req.$scope.design = design;
  return req;
}

async function _updateDesign (req) {
  const { id, colorOne, colorTwo, colorThree, profilePic } = req.body;
  const host = req.$scope.host;
  let updateObj = {
    colorOne,
    colorTwo,
    colorThree
  };
  if (profilePic && profilePic != '' && mongoose.isValidObjectId(profilePic)) {
    createObj._profilePic = profilePic;
  }
  if (!mongoose.isValidObjectId(id)) {
    throw {
      status: 'ERROR',
      statusCode: 102,
      httpCode: 400,
      message: 'Invalid Parameter: Design ID'
    };
  }
  const design = await req.db.Design.findByIdAndUpdate(id, createObj);

  req.$scope.design = design;
  return req;
}

module.exports = {
  _validateParams,
  _createDesign,
  _updateDesign
};
