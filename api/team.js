const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const TeamHelper = require('../helpers/team.helper');

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
    if (!queryObject || !queryObject._host || !queryObject.isVolunteer) {
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
    const input = {
      'logoUrl': req.file.url,
      'logoSecuredUrl': req.file.secure_url
    };
    const updateT = await TeamHelper.updateTeam(createT.team._id, input);
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
    const updateT = await TeamHelper.updateTeam(teamId, req.body);
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

module.exports = {
  getTeams: getTeams,
  getTeamById: getTeamById,
  createTeam: createTeam,
  getTeamWithFilter: getTeamWithFilter,
  updateTeam: updateTeam,
  deleteTeam: deleteTeam,
  addLeader: addLeader,
  removeLeader: removeLeader,
  addMember: addMember,
  kickMember: kickMember
};
