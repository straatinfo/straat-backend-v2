const ErrorHelper = require('../helpers/error.helper');
const HostHelper = require('../helpers/host.helper');

// route: /
const getHosts = async (req, res, next) => {
  try {
    const getHosts = await HostHelper.getHost();
    if (getHosts.err) {
      ErrorHelper.clientError(res, 400, ErrorHelper.err);
      return;
    }
    res.status(200).send(getHosts.hosts);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.serverError(res);
  }
};

// route: /withinRadius/:long/:lat/:radius
const getHostWithinRadius = async (req, res, next) => {
  const { long, lat, radius } = req.params;
  try {
    // verify parameters
    if (!long || !lat || !radius) {
      ErrorHelper.clientError(res, 400, 'Invalid Parameters');
      return;
    }
    const getHost = await HostHelper.getHostWithinRadius(long, lat, radius);
    if (getHost.err) {
      ErrorHelper.clientError(res, 400, getHost.err);
      return;
    }
    res.status(200).send(getHost.hosts);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route /:id
const getHostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getHost = await HostHelper.getHostById(id);
    if (getHost.err) {
      ErrorHelper.clientError(res, 400, getHost.err);
      return;
    }
    res.status(200).send(getHost.host);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const updateHost = async (req, res, next) => {
  const { id } = req.params;
  const {
    hostName, email, username, address, postalCode, city,  nickName, long, lat
  } = req.body;
  try {
    const updateH = await HostHelper.updateHost(
      id, hostName, email, username, address, postalCode, city,  nickName, long, lat
    );
    if (updateH.err) {
      ErrorHelper.clientError(res, 400, updateH.err);
      return;
    }
    res.status(200).send(updateH.host);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.serverError(res);
  }
};

const deleteHost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteH = await HostHelper.deleteHost(id);
    if (deleteH.err) {
      ErrorHelper.clientError(res, 400, deleteH.err);
      return;
    }
    res.status(200).send({affectedRows: deleteH.affectedRows});
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route /page/:pageNumber/:itemPerPage
const getHostByPage = async (req, res, next) => {
  const { page, pageNumber, itemPerPage } = req.params;
  try {
    const getHost = await HostHelper.getHostPerPage(itemPerPage, pageNumber, page)
    if (getHost.err) {
      ErrorHelper.clientError(res, 400, getHost.err);
      return;
    }
    res.status(200).send(getHost.hosts);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

module.exports = {
  getHostWithinRadius: getHostWithinRadius,
  getHostById: getHostById,
  getHosts: getHosts,
  getHostByPage: getHostByPage,
  updateHost: updateHost,
  deleteHost: deleteHost
};