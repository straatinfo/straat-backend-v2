const mongoose = require('mongoose');

async function _validateHostId (req) {
  const { id } = req.body;
  let error = {
    status: 'ERROR',
    statusCode: 102,
    httpCode: 400,
    message: 'Invalid Parameter: Host ID'
  };
  if (!mongoose.isValidObjectId(id)) {
    throw error;
  }
  const host = await req.db.Host.findById(id);
  req.$scope.host = host;
  return req;
}

async function _setToSpecific (req) {
  const { id } = req.body;
  const host = req.$scope.host;
  if (host && host.isSpecific) {
    return req;
  }
  const updatedHost = await req.db.Host.findByIdAndUpdate(id, { isSpecific: true });
  req.$scope.host = updatedHost;
  return req;
}

async function _setToGeneral (req) {
  const { id } = req.body;
  const host = req.$scope.host;
  if (host && !host.isSpecific) {
    return req;
  }
  const updatedHost = await req.db.Host.findByIdAndUpdate(id, { isSpecific: false });
  req.$scope.host = updatedHost;
  return req;
}

async function _activateHost (req) {
  const { id } = req.body;
  const host = req.$scope.host;
  if (host && host.isActivated) {
    return req;
  }
  const updatedHost = await req.db.Host.findByIdAndUpdate(id, { isActivated: true });
  req.$scope.host = updatedHost;
  return req;
}

async function _deActivateHost (req) {
  const { id } = req.body;
  const host = req.$scope.host;
  if (host && !host.isActivated) {
    return req;
  }
  const updatedHost = await req.db.Host.findByIdAndUpdate(id, { isActivated: false });
  req.$scope.host = updatedHost;
  return req;
}

async function _updateHost (req) {
  const { id } = req.body;

  const updateObj = Object.keys(req.body)
    .reduce((pv, cv) => {
      if (cv === 'id') return pv;
      if (req.body[cv] && req.body[cv] != '' && req.body[cv] != 'null' && req.body[cv] != 'undefined') {
        pv[cv] = req.body[cv];
      }
      return pv;
    }, {});

  const updatedHost = await req.db.Host.findByIdAndUpdate(id, updateObj);
  req.$scope.host = updatedHost;
  return req;
}

async function _softRemoveHost (req) {
  const { id } = req.body;

  const updatedHost = await req.db.Host.findByIdAndUpdate(id, { softRemoved: true });
  req.$scope.host = updatedHost;
  return req;
}

module.exports = {
  _validateHostId,
  _activateHost,
  _deActivateHost,
  _setToGeneral,
  _setToSpecific,
  _updateHost,
  _softRemoveHost
};
