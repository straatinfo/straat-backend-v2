const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const TeamInviteHelper = require('../helpers/teamInvite.helper');

const checkInviteExist = async (req,res, next) => {
  const { teamId, userId } = req.params;
  try {
    const checkTI = await TeamInviteHelper.checkInviteExist(teamId, userId);
    if (checkTI.err) {
      return ErrorHelper.ClientError(res, {error: checkTI.err}, 400);
    }
    SuccessHelper.success(res, checkTI.teamInvite);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getTeamPendingInvites = async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const getTPI = await TeamInviteHelper.getInviteListByTeam(teamId, false);
    if (getTPI.err) {
      return ErrorHelper.ClientError(res, {error: getTPI.err}, 400);
    }
    SuccessHelper.success(res, getTPI.teamInvites);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getTeamPendingRequests = async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const getTPR = await TeamInviteHelper.getInviteListByTeam(teamId, true);
    if (getTPR.err) {
      return ErrorHelper.ClientError(res, {error: getTPR.err}, 400);
    }
    SuccessHelper.success(res, getTPR.teamInvites);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getUserPendingInvites = async (req, res, next) => {
  const { useId } = req.params;
  try {
    const getUPI = await TeamInviteHelper.getRequestListByUser(userId, false);
    if (getUPI.err) {
      return ErrorHelper.ClientError(res, {error: getUPI.err}, 400);
    }
    SuccessHelper.success(res, getUPI.teamInvites);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getUserPendingRequest = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const getUPR = await TeamInviteHelper.getRequestListByUser(userId, true);
    if (getUPR.err) {
      return ErrorHelper.ClientError(res, {error: getUPR.err}, 400);
    }
    SuccessHelper.success(res, getUPR.teamInvites);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

// for teams
const sendInvite = async (req, res, next) => {
  const { userId, teamId } = req.params;
  try {
    const sendI = await TeamInviteHelper.sendInvite(userId, teamId);
    if (sendI.err) {
      return ErrorHelper.ClientError(res, {error: sendI.err}, 400);
    }
    SuccessHelper.success(res, sendI.teamInvites);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

// for user
const sendRequest = async (req, res, next) => {
  const { userId, teamId } = req.params;
  try {
    const sendR = await TeamInviteHelper.sendRequest(userId, teamId);
    if (sendR.err) {
      return ErrorHelper.ClientError(res, {error: sendR.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

// for team
const declineRequest = async (req, res, next) => {
  const { userId, teamId } = req.params;
  try {
    const declineR = await TeamInviteHelper.removeInvite(userId, teamId);
    if (declineR.err) {
      return ErrorHelper.ClientError(res, {error: declineR.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

// for user
const declineInvite = async (req, res, next) => {
  const { userId, teamId } = req.params;
  try {
    const declineI = await TeamInviteHelper.removeInvite(userId, teamId);
    if (declineI.err) {
      return ErrorHelper.ClientError(res, {error: declineI.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

// for team
const acceptRequest = async (req, res, next) => {
  const { userId, teamId } = req.params;
  try {
    const acceptR = await TeamInviteHelper.acceptRequest(userId, teamId);
    if (acceptR.err) {
      return ErrorHelper.ClientError(res, {error: acceptR.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

// for user
const acceptInvite = async (req, res, next) => {
  const { userId, teamId } = req.params;
  try {
    const acceptI = await TeamInviteHelper.acceptInvite(userId, teamId);
    if (acceptI.err) {
      return ErrorHelper.ClientError(res, {error: acceptI.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getTeamPendingInvites: getTeamPendingInvites,
  getTeamPendingRequests: getTeamPendingRequests,
  getUserPendingInvites: getUserPendingInvites,
  getUserPendingRequest: getUserPendingRequest,
  sendInvite: sendInvite,
  sendRequest: sendRequest,
  declineRequest: declineRequest,
  declineInvite: declineInvite,
  acceptRequest: acceptRequest,
  acceptInvite: acceptInvite,
  checkInviteExist: checkInviteExist
};
