const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const HostHelper = require('../helpers/host.helper');
const DesignHelper = require('../helpers/design.helper');

const getHosts = async (req, res, next) => {
  try {
    const getH = await HostHelper.getHosts();
    if (getH.err) {
      return ErrorHelper.ClientError(res, {error: getH.err}, 400);
    }
    if(req.query.flat) {
      const data = getH.hosts;
      req.hosts = data;
      return next();
    }
    SuccessHelper.success(res, getH.hosts);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const createHost = async (req, res, next) => {
  try {
    const {
      hostName, email, hostPersonalEmail, username,
      fname, lname, housNumber, streetName, city, state,
      country, postalCode, phoneNumber, long, lat, houseNumber
    } = req.body;
    const getGD = await DesignHelper.getGeneralDesign();
    if (getGD.err) {
      return ErrorHelper.ClientError(res, {error: getGD.err}, 400);
    }
    const input = {
      hostName, email, hostPersonalEmail, username,
      fname, lname, housNumber, streetName, city, state,
      country, postalCode, phoneNumber, long, lat, houseNumber,
      '_activeDesign': getGD.design_id
    };
    const createH = await HostHelper.createHost(input);
    if (createH.err) {
      return ErrorHelper.ClientError(res, {error: createH.err}, 400);
    }
    SuccessHelper.success(res, createH.host);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getHostsWithinRadius = async (req, res, next) => {
  const { long, lat, radius } = req.params;
  try {
    const getH = await HostHelper.getHostWithinRadius(long, lat, radius);
    if (getH.err) {
      return ErrorHelper.ClientError(res, { error: getH.err }, 400);
    }
    if(req.query.flat) {
      const data = getH.hosts;
      req.hosts = data;
      return next();
    }
    SuccessHelper.success(res, getH.hosts);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getHostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getH = await HostHelper.getHostById(id);
    if (getH.err) {
      return ErrorHelper.ClientError(res, {error: getH.err}, 400);
    }
    if(req.query.flat === 'true') {
      const host = await HostHelper.flatHost(getH.host);
      return SuccessHelper.success(res, host.host);
    }
    SuccessHelper.success(res, getH.host);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateHost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateH = await HostHelper.updateHost(id, req.body);
    if (updateH.err) {
      return ErrorHelper.ClientError(res, { error: updateH.err }, 400);
    }
    SuccessHelper.success(res, updateH.host);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const deleteHost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteH = await HostHelper.deleteHost(id);
    if (deleteH.err) {
      return ErrorHelper.ClientError(res, {error: deleteH.err }, 400);
    }
    SuccessHelper.success(res, deleteH.host);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const bulkCreateHost = async (req, res, next) => {
  const { dataArray } = req.body;
  try {
    const processData = await HostHelper.createHostLoop(dataArray, HostHelper.createHost);
    SuccessHelper.success(res, processData);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getFreeHost = async (req, res, next) => {
  try {
    const getFH = await HostHelper.getFreeHost();
    if (getFH.err) {
      return ErrorHelper.ClientError(res, {error: getFH.err}, 400);
    }
    SuccessHelper.success(res, getFH.host);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const updateHostDesign = async (req, res, next) => {
  try {
    const { hostId } = req.params;
    const isSpecific = (req.query.isSpecific === 'true') ? true : false;
    const updateHD = await HostHelper.updateHost(hostId, {'isSpecific': isSpecific});
    if (updateHD.err) {
      return ErrorHelper.ClientError(res, {error: updateHD.err});
    }
    SuccessHelper.success(res, updateHD.host);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};


module.exports = {
  getHostById: getHostById,
  getHosts: getHosts,
  getHostsWithinRadius: getHostsWithinRadius,
  createHost: createHost,
  updateHost: updateHost,
  deleteHost: deleteHost,
  bulkCreateHost: bulkCreateHost,
  getFreeHost: getFreeHost,
  updateHostDesign: updateHostDesign
};
