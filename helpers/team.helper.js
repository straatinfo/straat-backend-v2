const Team = require('../models/Team');
const TeamInviteHelper = require('../helpers/teamInvite.helper');
const TeamLeaderHelper = require('../helpers/teamLeader.helper');
const TeamMemberHelper = require('../helpers/teamMember.helper');

const getTeams = () => {
  return new Promise((resolve, reject) => {
    Team.find()
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
  return new Promise((resolve, reject) => {
    const newTeam = new Team(input);
    newTeam.save(async(err, team) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const addLeader = await TeamLeaderHelper.addTeamLeader(_user, team._id);
        if (addLeader.err || addMember.err) {
          return resolve({err: `The team was added but member and leader failed to add.`});
        }
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
        const removeLeaders = await TeamLeaderHelper.removeTeam(_id);
        const removeMembers = await TeamMemberHelper.removeTeam(_id);
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
      const removeTM = await TeamMemberHelper.removeTeamMember(_user, _team);
      if (addTM.err && removeTM.err) {
        return resolve({err: 'Error in adding leader'});
      }
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
      const removeTL = await TeamLeaderHelper.removeLeader(_user, _team);
      const addTM = await TeamMemberHelper.addTeamMember(_user, _team);
      if (removeTM.err && addTM.err) {
        return resolve({err: 'Error in removing leader'});
      }
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
      if (checkMember.member !== null) {
        return resolve({err: null});
      }
      const addMember = await TeamMemberHelper.addTeamMember(_user, _team);
      if (addMember.err) {
        return resolve({err: err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

const kickMember = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const removeTL = await TeamLeaderHelper.removeTeamLeader(_user, _team);
      const removeTM = await TeamMemberHelper.removeTeamMember(_user, _team);
      if (removeTM.err && removeTL.err) {
        return resolve({err: 'Error in kicking member'});
      }
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
