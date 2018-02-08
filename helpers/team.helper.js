const Team = require('../models/Team');
const TeamInviteHelper = require('../helpers/teamInvite.helper');
const TeamLeaderHelper = require('../helpers/teamLeader.helper');
const TeamMemberHelper = require('../helpers/teamMember.helper');
const UserHelper = require('../helpers/user.helper');

const getTeams = () => {
  return new Promise((resolve, reject) => {
    Team.find()
    .populate({
      path: 'teamleaders',
      populate: {
        path: '_user',
        select: { '_id': 1, 'email': 1 }
      }
    })
    .populate({
      path: 'teamMembers',
      populate: {
        path: '_user',
        select: { '_id': 1, 'email': 1 }
      }
    })
    .populate('_host', [ '_id', 'hostName' ])
    .exec((err, teams) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, teams: teams});
    });
  });
};

const getTeamById = (_id) => {
  return new Promise((resolve, reject) => {
    Team.findById(_id)
    .populate({
      path: 'teamLeaders',
      populate: {
        path: '_user',
        select: { '_id': 1, 'email': 1 }
      }
    })
    .populate({
      path: 'teamMembers',
      populate: {
        path: '_user',
        select: { '_id': 1, 'email': 1 }
      }
    })
    .populate('_host', [ '_id', 'hostName' ])
    .exec((err, team) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, team: team});
    });
  });
};

// this requires _user to add a default user as leader
const createTeam = (_user, input) => {
  console.log(input);
  return new Promise((resolve, reject) => {
    const newTeam = new Team(input);
    newTeam.save(async(err, team) => {
      if (err) {
        console.log(err);
        return resolve({err: err});
      }
      try {
        const addLeader = await TeamLeaderHelper.addTeamLeader(_user, team._id);
        if (addLeader.err) {
          console.log('6')
          return resolve({err: `The team was added but leader failed to add.`});
        }
        const addLeaderToTeam = await TeamLeaderHelper.addTeamLeaderToTeam(team._id, addLeader.teamLeader._id);
        const addLeaderToUser = await TeamLeaderHelper.addTeamLeaderToUser(_user, addLeader.teamLeader._id);
        if (addLeaderToTeam.err || addLeaderToUser.err) {
          console.log('3')
          return resolve({err: 'Unable to register leader to team and user'});
        }
        const updateHost = await UserHelper.addTeamToHost(input._host, team._id);
        if (updateHost.err) {
          console.log('4')
          return resolve({err: updateHost.err});
        }
        const getTeamInfo = await getTeamById(team._id);
        if (getTeamInfo.err) {
          console.log('5')
          return resolve({err: null, team: team});
        }
        resolve({err: null, team: getTeamInfo.team});
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const updateTeam = (_id, input) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndUpdate(_id, input, async(err, team) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const getTeamInfo = await getTeamById(team._id);
        if (getTeamInfo.err) {
          return resolve({err: null, team: team});
        }
        resolve({err: null, team: getTeamInfo.team});
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const deleteTeam = (_id) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndRemove(_id, async(err, team) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const removeLeadersInUsers = await TeamLeaderHelper.removeTeamLeaderInUsers(_id);
        const removeLeaders = await TeamLeaderHelper.removeTeamLeaders(_id);        
        const removeMembersInUsers = await TeamMemberHelper.removeTeamMemberInUsers(_id);
        const removeInvites = await TeamInviteHelper.removeTeam(_id);
        resolve({err: null});
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const addLeader = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkTL = await TeamLeaderHelper.checkTeamLeader(_user, _team);
      if (checkTL.err) {
        return resolve({err: checkTL.err});
      }
      if (checkTL.leader !== null) {
        return resolve({err: null});
      }
      const addTL = await TeamLeaderHelper.addTeamLeader(_user, _team);
      if (addTL.err) {
        return resolve({err: 'Error in adding leader'});
      }
      const addTlToUser = await TeamLeaderHelper.addTeamLeaderToUser(_user, addTL.teamLeader._id);
      const addTlToTeam = await TeamLeaderHelper.addTeamLeaderToTeam(_team, addTL.teamLeader._id);
      const removeTM = await TeamMemberHelper.removeTeamMember(_user, _team);
      if (removeTM.err) {
        return resolve({err: 'Error in removing Member'});
      }
      const removeTMToUser = await TeamMemberHelper.removeTeamMemberToUser(_user, removeTM.teamMember._id);
      const removeTMToTeam = await TeamMemberHelper.removeTeamMemberToTeam(_team, removeTM.teamMember._id);
      
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

const removeLeader = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const removeTL = await TeamLeaderHelper.removeTeamLeader(_user, _team);
      if (removeTL.err) {
        return resolve({err: 'Error in removing leader'});
      }
      const removeTLToUser = await TeamLeaderHelper.removeTeamLeaderToUser(_user, removeTL.teamLeader._id);
      const removeTLToTeam = await TeamLeaderHelper.removeTeamLeaderToTeam(_team, removeTL.teamLeader._id);
      const addTM = await TeamMemberHelper.addTeamMember(_user, _team);
      if (addTM.err) {
        return resolve({err: 'Error in adding team leader'});
      }
      const addTMToUser = await TeamMemberHelper.addTeamMemberToUser(_user, addTM.teamMember._id);
      const addTMToTeam = await TeamMemberHelper.addTeamMemberToTeam(_team, addTM.teamMember._id);
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

const addMember = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkMember = await TeamMemberHelper.checkTeamMember(_user, _team);
      if (checkMember.err) {
        return resolve({err: checkMember.err});
      }
      if (checkMember.teamMember) {
        return resolve({err: null, teamMember: checkMember.teamMember });
      }
      const addMember = await TeamMemberHelper.addTeamMember(_user, _team);
      if (addMember.err) {
        return resolve({err: err});
      }
      const addMemberToUser = await TeamMemberHelper.addTeamMemberToUser(_user, addMember.teamMember._id);
      const addMemberToTeam = await TeamMemberHelper.addTeamMemberToTeam(_team, addMember.teamMember._id);
      const checkLeader = await TeamLeaderHelper.checkTeamLeader(_user, _team);
      if (checkLeader.teamLeader) {
        const removeTL = await TeamLeaderHelper.removeTeamLeader(_user, _team);
        if (removeTl.err) {
          return resolve({err: removeTL.err});
        }
        const removeTLToUser = await TeamLeaderHelper.removeTeamLeaderToUser(_user, removeTl.teamLeader._id);
        const removeTLToTeam = await TeamLeaderHelper.removeTeamLeaderToTeam(_team, removeTl.teamLeader._id);
      }
      resolve({err: null});
    }
    catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const kickMember = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const removeTM = await TeamMemberHelper.removeTeamMember(_user, _team);
      if (removeTM.err) {
        return resolve({err: 'Error in kicking member'});
      }
      const removeTMToUser = await TeamMemberHelper.removeTeamMemberToUser(_user, removeTM.teamMember._id);
      const removeTMToTeam = await TeamMemberHelper.removeTeamMemberToTeam(_team, removeTM.teamMember._id);
      const removeTL = await TeamLeaderHelper.removeTeamLeader(_user, _team);
      if (removeTL.err) {
        return resolve({err: 'Error in removing Team leader'});
      }
      const removeTLToUser = await TeamLeaderHelper.removeTeamLeaderToUser(_user, removeTL.teamLeader._id);
      const removeTLToTeam = await TeamLeaderHelper.removeTeamLeaderToTeam(_team, removeTL.teamLeader._id);
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTeams: getTeams,
  getTeamById: getTeamById,
  createTeam: createTeam,
  updateTeam: updateTeam,
  deleteTeam: deleteTeam,
  addLeader: addLeader,
  removeLeader: removeLeader,
  addMember: addMember,
  kickMember: kickMember
};
