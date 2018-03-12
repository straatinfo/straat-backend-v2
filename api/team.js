const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const TeamHelper = require('../helpers/team.helper');
const MediaUploadHelper = require('../helpers/mediaUpload.helper');

const getTeams = async (req, res, next) => {
  try {
    const getT = await TeamHelper.getTeams();
    if (getT.err) {
      return ErrorHelper.ClientError(res, {error: getT.err}, 400);
    }
    SuccessHelper.success(res, getT.teams);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getTeamById = async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const getTBI = await TeamHelper.getTeamById(teamId);
    if (getTBI.err) {
      return ErrorHelper.ClientError(res, {error: getTBI.err}, 400);
    }
    SuccessHelper.success(res, getTBI.team);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getTeamWithFilter = async (req, res, next) => {
  const { queryObject } = req.body;
  try {
    if (!queryObject || !queryObject._host || queryObject.isVolunteer === null) {
      ErrorHelper.ClientError(res, {error: 'Invalid queryObject'}, 400);
    }
    const getTeamWF = await TeamHelper.getTeamWithFilter(queryObject);
    if (getTeamWF.err) {
      ErrorHelper.ClientError(res, {error: getTeamWF.err}, 400);
    }
    SuccessHelper.success(res, getTeamWF.teams);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }

};

const createTeam = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const createT = await TeamHelper.createTeam(userId, req.body);
    if (createT.err) {
      return ErrorHelper.ClientError(res, {error: createT.err}, 400);
    }
    if (!req.file) {
      return SuccessHelper.success(res, createT.team);
    }
    const createMU = await MediaUploadHelper.createMediaUpload(req.file);
    if (createMU.err) {
      return ErrorHelper.ClientError(res, {error: createMU.err}, 422);
    }
    const updateT = await TeamHelper.updateTeam(createT.team._id, {'_profilePic': createMU.mediaUpload._id});
    if (updateT.err) {
      return ErrorHelper.ClientError(res, {error: 'Team was created but the logo was failed to save'});
    }
    SuccessHelper.success(res, updateT.team);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const updateTeam = async (req, res, next) => {
  const { teamId } = req.params;
  try {
    let _profilePic, input;
    if (req.file) {
      const createMU = await MediaUploadHelper.createMediaUpload(req.file);
      if (createMU.err) {
        return ErrorHelper.ClientError(res, {error: createMU.err}, 422);
      }
      _profilePic = (createMU.mediaUpload) ? createMU.mediaUpload._id : null;
    }
    if (_profilePic) {
      input = {...req.body, '_profilePic': _profilePic};
    } else {
      input = req.body;
    }
    const updateT = await TeamHelper.updateTeam(teamId, input);
    if (updateT.err) {
      return ErrorHelper.ClientError(res, {error: updateT.err}, 400);
    }
    SuccessHelper.success(res, updateT.team);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const deleteTeam = async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const deleteT = await TeamHelper.deleteTeam(teamId);
    if (deleteT.err) {
      return ErrorHelper.ClientError(res, {error: deleteT.err}, 400);
    }
    SuccessHelper.success(res, deleteT.team);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const addLeader = async (req, res, next) => {
  const { userId, teamId } = req.params;
  try {
    const addL = await TeamHelper.addLeader(userId, teamId);
    console.log('addL', addL);
    if (addL.err) {
      return ErrorHelper.ClientError(res, {error: addL.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const removeLeader = async (req, res, next) => {
  const { userId, teamId } = req.params;
  try {
    const removeL = await TeamHelper.removeLeader(userId, teamId);
    if (removeL.err) {
      return ErrorHelper.ClientError(res, {error: removeL.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const addMember = async (req, res, next) => {
  const { userId, teamId } = req.params;
  try {
    const addM = await TeamHelper.addMember(userId, teamId);
    if (addM.err) {
      return ErrorHelper.ClientError(res, {error: addM.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const kickMember = async (req, res, next) => {
  const { userId, teamId } = req.params;
  try {
    const kickM = await TeamHelper.kickMember(userId, teamId);
    if (kickM.err) {
      return ErrorHelper.ClientError(res, {error: kickM.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getApprovedTeam = async(req, res, next) => {
  try {
    let isApproved;
    if (req.query && req.query.isApproved && req.query.isApproved === 'false') {
      isApproved = false;
    } else {
      isApproved = true;
    }
    const getAT = await TeamHelper.getApprovedTeam(isApproved);
    if (getAT.err) {
      return ErrorHelper.ClientError(res, {error: getAT.err}, 400);
    }
    if (req.query && req.query.flat === 'true') {
      req.teams = getAT.teams;
      return next();
    }
    SuccessHelper.success(res, getAT.teams);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const approveTeam = async(req, res, next) => {
  const { teamId } = req.body;
  try {
    if (!teamId) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Team ID'}, 400);
    }
    const approveT = await TeamHelper.approveTeam(teamId, true);
    if (approveT.err) {
      return ErrorHelper.ClientError(res, {error: approveT.err}, 400);
    }
    SuccessHelper.success(res, approveT.team);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const disApproveTeam = async (req, res, next) => {
  const { teamId } = req.body;
  try {
    if (!teamId) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Team ID'}, 400);
    }
    const disAT = await TeamHelper.declineTeam(teamId, true);
    if (disAT.err) {
      return ErrorHelper.ClientError(res, {error: disAT.err}, 400);
    }
    SuccessHelper.success(res, disAT.team);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const softRemoveTeam = async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const deleteT = await TeamHelper.softRemovedTeam(teamId);
    if (deleteT.err) {
      return ErrorHelper.ClientError(res, {error: deleteT.err}, 400);
    }
    SuccessHelper.success(res, deleteT.team);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getTeams: getTeams,
  getTeamById: getTeamById,
  createTeam: createTeam,
  getTeamWithFilter: getTeamWithFilter,
  updateTeam: updateTeam,
  deleteTeam: deleteTeam,
  softRemoveTeam: softRemoveTeam,
  addLeader: addLeader,
  removeLeader: removeLeader,
  addMember: addMember,
  kickMember: kickMember,
  getApprovedTeam: getApprovedTeam,
  approveTeam: approveTeam,
  disApproveTeam: disApproveTeam
};
