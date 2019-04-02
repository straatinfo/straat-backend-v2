const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const TeamHelper = require('../helpers/team.helper');
const UserHelper = require('../helpers/user.helper');
const MediaUploadHelper = require('../helpers/mediaUpload.helper');
const ConversationHelper = require('../helpers/conversationV2.helper');
const Team = require('../models/Team');
const User = require('../models/User');
const TeamInvite = require('../models/TeamInvite');
const TeamInviteHelper = require('../helpers/teamInvite.helper');
const TeamTransform = require('../transform/team.transform');
const _ = require('lodash');


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

const getTeamInfoById = async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const getTBI = await TeamHelper.getTeamInfoById(teamId);
    if (getTBI.err) {
      return ErrorHelper.ClientError(res, {error: getTBI.err}, 400);
    }
    SuccessHelper.success(res, getTBI.team);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getTeamListByUserId = async (req, res, next) => {
  const { _user } = req.params; // this must change ot req.user
  try {
    const { team: teams, err } = await TeamHelper.getTeamListByUserId(_user)
    if (err) {
      return ErrorHelper.ClientError(res, {error: err}, 400);
    }
    
    // send invite for test
    // sendR = await TeamInviteHelper.sendRequest('5afe8f6a65ab530014452641', '5b0669fc9eeb62519264606f') // (userId, teamId);
    // console.log('send invite for test', sendR)
    const {teamLeaders: userTeamLeaders} = await User.findById(_user, {teamLeaders: true, isApproved: true, isVolunteer: true, teamName: true, teamEmail: true }).lean()
    // const count = _.isEmpty(userTeamLeaders  );

    const result = !_.isEmpty(userTeamLeaders) ? await Promise.all(teams.map(async function (team, index) {
      // confirm if user is team leader of 
      if (TeamTransform.intersection(userTeamLeaders, TeamTransform.getTeamLeadersId(team.teamLeaders)).length > 0 ) {
        team.teamInvites = await TeamInvite.find({'_team': team._id, isRequest: true})
        return team
      }
      // if not leader
      return team
    })) : teams

    SuccessHelper.success(res, result);
    // SuccessHelper.success(res, getTBI.team);
  }
  catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res);
  }
};


const getNonVolTeamListByHost = async (req, res, next) => {
  const { _host } = req.params; // this must change ot req.user
  try {
    const teams = await TeamHelper.getNonVolTeamListByHost(_host)


    // // send invite for test
    // // sendR = await TeamInviteHelper.sendRequest('5afe8f6a65ab530014452641', '5b0669fc9eeb62519264606f') // (userId, teamId);
    // // console.log('send invite for test', sendR)
    // const {teamLeaders: userTeamLeaders} = await User.findById(_user, {teamLeaders: true}).lean()
    // // const count = _.isEmpty(userTeamLeaders  );

    // const result = !_.isEmpty(userTeamLeaders) ? await Promise.all(teams.map(async function (team, index) {
    //   // confirm if user is team leader of 
    //   if (TeamTransform.intersection(userTeamLeaders, TeamTransform.getTeamLeadersId(team.teamLeaders)).length > 0 ) {
    //     team.teamInvites = await TeamInvite.find({'_team': team._id, isRequest: true})
    //     return team
    //   }
    //   // if not leader
    //   return team
    // })) : teams

    SuccessHelper.success(res, teams);
    // SuccessHelper.success(res, getTBI.team);
  }
  catch (e) {
    console.log(e)
    return ErrorHelper.ClientError(res, {error: e.message}, 400);
    // ErrorHelper.ServerError(res);
  }
};

const getTeamWithFilter = async (req, res, next) => {
  const { queryObject } = req.body;
  console.log(queryObject);
  try {
    if (!queryObject || !queryObject._host || queryObject.isVolunteer === null) {
      ErrorHelper.ClientError(res, {error: 'Invalid queryObject'}, 400);
    }
    const getTeamWF = await TeamHelper.getTeamWithFilter(queryObject);
    if (getTeamWF.err) {
      ErrorHelper.ClientError(res, {error: getTeamWF.err}, 400);
    }
    const getFlatTeams = await Promise.all(getTeamWF.teams.map(async (t) => {
      const flatTeam = await TeamHelper.flatTeam(t);
      if (flatTeam.team) {
        return flatTeam.team;
      }
    }));
    const flatTeams = getFlatTeams.reduce((p, c) => {
      if (c) {
        return [...p, c];
      }
      return c;
    }, []);
    if (req.query.flat) {
      return SuccessHelper.success(res, flatTeams);
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
    const createT = await TeamHelper.createTeam(userId, {...req.body, 'isApproved': true, 'createdBy': req.body._host});
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
    const createConversation = await ConversationHelper.__createTeamChat(userId, createT.team._id, createMU.mediaUpload._id);
    SuccessHelper.success(res, updateT.team);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const updateTeam = async (req, res, next) => {
  const { teamId } = req.params
  const newInput = req.body      // must trip unnecessary data first
  try {
    // save not upload first
    const updateTe = await TeamHelper.updateTeam(teamId, newInput)
    if (updateTe.err) {
      return ErrorHelper.ClientError(res, {error: updateTe.err}, 400)
    }

    // after success in saving text, saving upload will be safe here
    if (req.file) {
      const createMU = await MediaUploadHelper.createMediaUpload(req.file)
      if (createMU.err) {
        return ErrorHelper.ClientError(res, {error: createMU.err}, 422)
      }
      const _profilePic = (createMU.mediaUpload) ? createMU.mediaUpload._id : null
      if (_profilePic) {
        const updateT = await TeamHelper.updateTeam(teamId, {_profilePic: _profilePic})
        if (updateT.err) {
          return ErrorHelper.ClientError(res, {error: updateT.err}, 400)
        }
        return SuccessHelper.success(res, updateT.team)
      }
    }
    SuccessHelper.success(res, updateTe.team)
  }
  catch (e) {
    ErrorHelper.ServerError(res)
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
    const team = await Team.findById(teamId);
    if (addM.err) {
      return ErrorHelper.ClientError(res, {error: addM.err}, 400);
    }
    const addMemberToChat = await ConversationHelper.__addParticipant(team._conversation, userId);
    SuccessHelper.success(res, {message: 'Success'});
  }
  catch (e) {
    console.log(e);
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
    console.log(e);
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
  disApproveTeam: disApproveTeam,
  getTeamInfoById,
  getTeamListByUserId,
  getNonVolTeamListByHost
};
