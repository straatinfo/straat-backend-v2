/**
 * Team Helper V2
 * Creted by: John Higgins M. Avila
 * April 2018
 */
const Team = require('../models/Team');
const TeamLeader = require('../models/TeamLeader');
const TeamMember = require('../models/TeamMember');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const ConversationHelper = require('../helpers/conversationV2.helper');
const _ = require('lodash');

/**
 * 
 * @param {_user} user ID
 * this function return an array of user's teams
 */
async function __findUserTeams (_user) {
  try {
    const user = await User.findById(_user).populate('teamMembers').populate('teamLeaders');
    const leaderships = user.teamLeaders;
    const queryBuilder = user.teamMembers.map((tm) => {
      return {'_id': tm._team};
    });
    const teams = await Team.find({'$or': queryBuilder});
    return Promise.resolve(teams);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

/**
 * 
 * @param {_user} user ID 
 * @param {_team} team ID
 * set users active team
 * returs updated user
 */
async function __setUserTeam (_user, _team) {
  try {
    const updateUser = await User.findByIdAndUpdate(_user, {'_activeTeam': _team});
    const user = await User.findById(_user).populate('_activeTeam');
    return Promise.resolve(user);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __setTeamLeader (_user, _team) {
  try {
    const teamLeader = await TeamLeader.findOne({'_user': _user, '_team': _team}).populate('_team');
    const teamLeaders = await TeamLeader.find({'_user': _user, '_team': _team});
    //const teamLeaderDel = await TeamLeader.findByIdAndRemove(teamLeader._id);
    if (teamLeader) {
      return Promise.resolve({...teamLeader._team.toObject(), role: 'leader'});
    }
    const newTeamLeader = new TeamLeader({'_user': _user, '_team': _team});
    const createTM = await newTeamLeader.save();
    const updateTeam = await Team.update({'_id': _team}, {'$addToSet': {'teamLeaders': createTM._id}});
    const updateUser = await User.update({'_id': _user}, {'$addToSet': {'teamLeaders': createTM._id}});
    const team = await Team.findById(_team);
    return Promise.resolve({...team.toObject(), role: 'leader' });
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __setTeamMember (_user, _team) {
  try {
    const teamLeader = await TeamLeader.findOne({'_user': _user, '_team': _team}).populate('_team');
    const teamMember = await TeamMember.findOne({'_user': _user, '_team': _team}).populate('_team');
    if (teamLeader) {
      const updateTeam = await Team.update({'_id': _team}, {'$pop': {'teamLeaders': teamLeader._id}});
      const updateUser = await User.update({'_id': _user}, {'$pop': {'teamLeaders': teamLeader._id}});
      const deleteTeamLeader = await TeamLeader.findByIdAndRemove(teamLeader._id);
    }
    return Promise.resolve({...teamMember._team.toObject(), role: 'member'});
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __findHostTeams (_host) {
  try {
    const teams = await Team.find({'_host': _host});
    return Promise.resolve(teams);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __addNewMember (_user, _team) {
  try {
    const team = await Team.findById(_team);
    const checkTeamMember = await TeamMember.findOne({'_user': _user, '_team': _team}).populate('_team');
    if (checkTeamMember) {
      return Promise.resolve(checkTeamMember._team);
    }
    const newTeamMember = new TeamMember({'_user': _user, '_team': _team});
    const saveTM = await newTeamMember.save();
    const updateUser = await User.update({'_id': _user}, {'$addToSet': {'teamMembers': saveTM._id}});
    const updateTeam = await Team.update({'_id': _team}, {'$addToSet': {'teamMembers': saveTM._id}});
    const updateConversation = await ConversationHelper.__addParticipant(team._conversation, _user);
    const updatedTeam = await Team.findById(_team);
    return Promise.resolve(updatedTeam);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __removeMember (_user, _team) {
  try {
    const team = await Team.findById(_team);
    const teamMember = await TeamMember.findOne({'_user': _user, '_team': _team}).populate('_team');
    const teamLeader = await TeamLeader.findOne({'_user': _user, '_team': _team}).populate('_team');
    if (teamLeader) {
      const updateUser1 = await User.update({'_id': _user}, {'$pop': {'teamLeaders': teamLeader._id}});
      const updateTeam1 = await Team.update({'_id': _team}, {'$pop': {'teamLeaders': teamLeader._id}});
    }
    const updateUser = await User.update({'_id': _user}, {'$pop': {'teamMembers': teamMember._id}});
    const updateTeam = await Team.update({'_id': _team}, {'$pop': {'teamMembers': teamMember._id}});
    const delTM = await TeamMember.findOneAndRemove({'_user': _user, '_team': _team});
    const delTL = await TeamLeader.findOneAndRemove({'_user': _user, '_team': _team});
    const updateConversation = await ConversationHelper.__removeParticipant(team._conversation, _user, _user, true);
    const updatedTeam = await Team.findById(_team);
    if (updatedTeam.teamMembers.length === 0) {
      const delTeam = await Team.findByIdAndRemove(_team);
      return Promise.resolve(delTeam);
    }
    return Promise.resolve(updatedTeam);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __addNewTeam (_user, _host, input) {
  try {
    const newConversation = new Conversation({
      _author: _user,
      _profilePic: input._profilePic,
      participants: [{
        _user: _user,
        isActive: true
      }],
    });
    const conversation = await newConversation.save();
    const newTeam = new Team({...input, _conversation: conversation._id});
    const team = await newTeam.save();
    const updateConversation = await Conversation.update({'_id': conversation._id}, {'title': `Team Chat of ${team.teamName} team`, '_team': team._id});
    const newTM = new TeamMember({'_user': _user, '_team': team._id});
    const newTL = new TeamLeader({'_user': _user, '_team': team._id});
    const tl = await newTL.save();
    const tm = await newTM.save();
    const updateUser = await User.update({'_id': _user}, {'$addToSet': {'teamMembers': tm._id, 'teamLeaders': tl._id}});
    const updateTeam = await Team.update({'_id': team._id}, {'$addToSet': {'teamMembers': tm._id, 'teamLeaders': tl._id}});
    const updatedTeam = await Team.findById(team._id);
    return Promise.resolve(updatedTeam);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

/**
 * 
 * @param {_user} user ID 
 * @param {_team} team ID
 * this function check parameter and state then set user's active team
 * returns user's new active team
 */
async function setActiveTeam (_user, _team) {
  try {
    const memberships = await __findUserTeams(_user);
    const team = _.find(memberships, (m) => {
      return m._id.toString() === _team;
    });
    if (!team) {
      return Promise.reject({
        code: 0,
        statusCode: 400,
        error: 'TEAM_NOT_FOUND',
        message: 'Team is not related to user'
      });
    }
    const user = await __setUserTeam(_user, _team);
    return Promise.resolve(user._activeTeam);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function setAsLeader (_user, _team) {
  try {
    const memberships = await __findUserTeams(_user);
    const team = _.find(memberships, (m) => {
      return m._id.toString() === _team;
    });
    if (!team) {
      return Promise.reject({
        code: 0,
        statusCode: 400,
        error: 'TEAM_NOT_FOUND',
        message: 'Team is not related to user'
      });
    }
    const updatedTeam = await __setTeamLeader(_user, _team);
    return Promise.resolve(updatedTeam);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function setAsMember (_user, _team) {
  try {
    const memberships = await __findUserTeams(_user);
    const team = _.find(memberships, (m) => {
      return m._id.toString() === _team;
    });
    if (!team) {
      return Promise.reject({
        code: 0,
        statusCode: 400,
        error: 'TEAM_NOT_FOUND',
        message: 'Team is not related to user'
      });
    }
    const updateTeam = await __setTeamMember(_user, _team);
    return Promise.resolve(updateTeam);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function joinTeam (_user, _team) {
  try {
    const memberships = await __findUserTeams(_user);
    const user = await User.findById(_user);
    const teams = await __findHostTeams(user._host);
    const team = _.find(memberships, (m) => {
      return m._id.toString() === _team;
    });
    const teamToJoin = _.find(teams, (t) => {
      return t._id.toString() === _team;
    });
    if (team) {
      return Promise.resolve(team);
    }
    if (!teamToJoin) {
      return Promise.reject({
        code: 0,
        statusCode: 400,
        error: 'TEAM_NOT_FOUND_ON_HOST',
        message: 'There are no teams on the host'
      });
    }
    if (teamToJoin.isVolunteer !== user.isVolunteer) {
      return Promise.reject({
        code: 0,
        statusCode: 400,
        error: 'TEAM_INCOMPATIBILITY',
        message: `${user.isVolunteer ? 'Volunteer' : 'Non-Volunteer'} User cannot join ${teamToJoin.isVolunteer ? 'Volunteer' : 'Non-Volunteer' } Teams`
      });
    }
    const updatedTeam = await __addNewMember(_user, _team);
    return Promise.resolve(updatedTeam);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function unJoinTeam (_user, _team) {
  try {
    const memberships = await __findUserTeams(_user);
    const team = _.find(memberships, (m) => {
      return m._id.toString() === _team;
    });
    if (!team) {
      return Promise.reject({
        code: 0,
        statusCode: 400,
        error: 'TEAM_NOT_FOUND',
        message: 'Team is not related to user'
      });
    }
    const updatedTeam = await __removeMember(_user, _team);
    return Promise.resolve(updatedTeam);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function createTeam (_user, _host, input) {
  try {
    const team = await Team.findOne({'teamEmail': input.teamEmail});
    const checkTeamName = await Team.findOne({'teamName': input.teamName});
    const user = await User.findById(_user);
    const host = await User.findById(_host);
    if (team || checkTeamName) {
      return Promise.reject({
        code: 0,
        statusCode: 400,
        error: 'CREDENTIALS_ALREADY_IN_USED',
        message: 'credentials already used by other teams'
      });
    }
    if (!host) {
      return Promise.reject({
        code: 0,
        statusCode: 400,
        error: 'HOST_NOT_FOUND',
        message: 'cannot find host'
      });
    }
    if (!user) {
      return Promise.reject({
        code: 0,
        statusCode: 400,
        error: 'USER_NOT_FOUND',
        message: 'cannot find user'
      });
    }
    if (user.isVolunteer !== input.isVolunteer) {
      return Promise.reject({
        code: 0,
        statusCode: 400,
        error: 'TEAM_INCOMPATIBILITY',
        message: `${user.isVolunteer ? 'Volunteer' : 'Non-Volunteer'} User cannot join ${input.isVolunteer ? 'Volunteer' : 'Non-Volunteer' } Teams, Team not created`
      });
    }
    const newTeam = await __addNewTeam(_user, _host, input);
    return Promise.resolve(newTeam);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

/**
 * 
 * @param {*} _user 
 * @param {*} _team 
 * this function will be used if there are some error on setting as leader or member
 * this function will restore the user and will become a normal member
 */
async function restore (_user, _team) {
  try {
    const findTeamMembers = await TeamMember.find({'_user': _user, '_team': _team});
    const findTeamLeaders = await TeamLeader.find({'_user': _user, '_team': _team});
    const findTeam = await User.findById(_user).populate('teamLeaders');
    return Promise.resolve();
  }
  catch (e) {
    return Promise.reject(e);
  }
}

module.exports = {
  setActiveTeam,
  setAsLeader,
  setAsMember,
  joinTeam,
  unJoinTeam,
  createTeam,
  restore
};
