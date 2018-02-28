const Team = require('../models/Team');
const TeamInviteHelper = require('../helpers/teamInvite.helper');
const TeamLeaderHelper = require('../helpers/teamLeader.helper');
const TeamMemberHelper = require('../helpers/teamMember.helper');
const UserHelper = require('../helpers/user.helper');
const User = require('../models/User');

const getTeams = () => {
  return new Promise((resolve, reject) => {
    Team.find({'softRemoved': false})
    .populate('teamLeaders')
    .populate('teamMembers')
    .populate('_host', [ '_id', 'hostName', 'email' ])
    .exec((err, teams) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, teams: teams});
    });
  });
};

const getTeamWithFilter = (queryObject) => {
  return new Promise((resolve, reject) => {
    Team.find({'softRemoved': false, '_host': queryObject._host, 'isVolunteer': queryObject.isVolunteer})
    .populate('teamLeaders')
    .populate('teamMembers')
    .populate('_host', [ '_id', 'hostName', 'email' ])
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
    Team.findOne({'_id': _id, 'softRemoved': false })
    .populate('teamLeaders')
    .populate('teamMembers')
    .populate('_host', [ '_id', 'hostName', 'email' ])
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
  return new Promise(async(resolve, reject) => {
    const findUser = await UserHelper.findUserById(_user);
    try {
      if (findUser.err) {
        return resolve({err: findUser.err});
      }
      if (!findUser.user) {
        return resolve({err: 'Cannot find user'});
      }
      const newTeam = new Team({...input, 'isVolunteer': findUser.user.isVolunteer});
      newTeam.save(async(err, team) => {
        if (err) {
          return resolve({err: err});
        }
          const addLeader = await TeamLeaderHelper.addTeamLeader(_user, team._id);
          if (addLeader.err) {
            return resolve({err: `The team was added but leader failed to add.`});
          }
          const addLeaderToTeam = await TeamLeaderHelper.addTeamLeaderToTeam(team._id, addLeader.teamLeader._id);
          const addLeaderToUser = await TeamLeaderHelper.addTeamLeaderToUser(_user, addLeader.teamLeader._id);
          if (addLeaderToTeam.err || addLeaderToUser.err) {
            return resolve({err: 'Unable to register leader to team and user'});
          }
          const updateHost = await UserHelper.addTeamToHost(input._host, team._id);
          if (updateHost.err) {
            return resolve({err: updateHost.err});
          }
          const getTeamInfo = await getTeamById(team._id);
          if (getTeamInfo.err) {
            return resolve({err: null, team: team});
          }

          resolve({err: null, team: getTeamInfo.team});
      });
    }
    catch (e) {
      reject(e);
    }
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
        User.findByIdAndUpdate(team._host,
        { '$pop': { 'teams': team._id } },
        (err, user) => {
          if (err) {
            return resolve({err: err});
          }
          resolve({err: null, team: team});
        });
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

// this function will check if the user can join the team depending on their isVolunteer status
const checkUserIfCanJoin = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkT = await getTeamById(_team);
      console.log(checkT);
      if (checkT.err) {
        return resolve({err: checkT.err});
      }
      const checkU = await UserHelper.findUserById(_user);
      if (checkU.err) {
        return resolve({err: checkU.err});
      }
      if (!checkT.team) {
        return resolve({err: 'Invalid Team'});
      }
      if (!checkU.user) {
        return resolve({err: 'Invalid User'});
      }
      if (checkU.user.isVolunteer !== checkT.team.isVolunteer) {
        return resolve({status: false});
      }
      resolve({status: true});
    }
    catch (e) {
      reject(e);
    }
  });
};

const addLeader = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkIfCanJoin = await checkUserIfCanJoin(_user, _team);
      if (checkIfCanJoin.status === false) {
        return resolve({err: 'Cannot join the team'});
      }
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
      const checkIfCanJoin = await checkUserIfCanJoin(_user, _team);
      if (checkIfCanJoin.status === false) {
        return resolve({err: 'Cannot join the team'});
      }
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

const checkTeamByCredentials = (teamNameOrTeamEmail) => {
  return new Promise((resolve, reject) => {
    Team.findOne({$or: [
      { 'teamName': teamNameOrTeamEmail },
      { 'teamEmail': teamNameOrTeamEmail }
    ]}, (err, team) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, team: team});
    });
  });
};

const updateTeamReport = (_team, _report) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndUpdate(_team,
    { '$addToSet': { 'reports': _report } },
    { 'new': true, 'upsert': true },
    (err, team) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, team: team});
    })
  });
};

const findActiveTeam = (_user) => {
  return new Promise(async(resolve, reject) => {
    try {
      let activeTeam;
      const activeTeamLeader = await TeamLeaderHelper.findActiveTeam(_user);
      if (activeTeamLeader.err) {
        return resolve({err: activeTeamLeader.err});
      }
      if (activeTeamLeader.activeTeam) {
        return resolve({err: null, activeTeam: {...activeTeamLeader.activeTeam.toObject(), teamLeader: activeTeamLeader.teamLeader, teamMember: null}});
      }
      const activeTeamMember = await TeamMemberHelper.findActiveTeam(_user);
      if (activeTeamMember.err) {
        return resolve({err: activeTeamMember.err});
      }
      if (activeTeamMember.activeTeam) {
        return resolve({err: null, activeTeam: {...activeTeamMember.activeTeam.toObject(), teamMember: activeTeamMember.activeTeam.teamMember, teamLeader: null}});
      }
      resolve({err: null, activeTeam: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

const addConvoToTeam = (_team, _conversation) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndUpdate(_team,
    { '$addToSet': { 'conversations': _conversation } },
    { 'new': true, 'upsert': true },
    (err, team) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, team: team});
    });
  });
};

const removeConvoToTeam = (_team, _conversation) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndUpdate(_team,
    { '$pop': { 'conversations': _conversation } },
    (err, team) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, team: team});
    });
  });
};

const getApprovedTeam = (isApproved = true) => {
  return new Promise((resolve, reject) => {
    Team.find({'isApproved': isApproved, 'softRemoved': false})
    .populate('teamLeaders')
    .populate('teamMembers')
    .populate('_host', [ '_id', 'hostName', 'email' ])
    .exec((err, teams) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, teams: teams});
    });    
  });
};

const approveTeam = (_team, isApproved = true) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndUpdate(_team, {'isApproved': isApproved}, (err, team) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, team: team});
    });
  });
}

const flatTeam = (t) => {
  return new Promise(async(resolve, reject) => {
    try {
      const team = {
        _id: t._id || null,
        teamName: t.teamName || null,
        teamEmail: t.teamEmail || null,
        logoUrl: t.logoUrl || null,
        logoSecuredUrl: t.logoSecuredUrl || null,
        description: t.description || null,
        isVolunteer: (t.isVolunteer === false) ? false : (t.isVolunteer === true) ? true : null,
        isApproved: (t.isApproved === false) ? false : (t.isApproved === true) ? true : null,
        '_host._id': (t._host && t._host._id) ? t._host._id : null,
        '_host.hostName': (t._host && t._host.hostName) ? t._host.hostName : null,
        '_host.email': (t._host && t._host.email) ? t._host.email : null,
        teamLeaders: t.teamLeaders || [],
        teamMembers: t.teamMembers || []
      };
      resolve({err: null, team: team});
    }
    catch (e) {
      reject(e);
    }
  });
};

const softRemoveTeam = (_team) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndUpdate(_team, {'softRemoved': false}, (err, team) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, team: team});
    });
  });
};

module.exports = {
  getTeams: getTeams,
  getTeamWithFilter: getTeamWithFilter,
  getTeamById: getTeamById,
  createTeam: createTeam,
  updateTeam: updateTeam,
  deleteTeam: deleteTeam,
  softRemovedTeam: softRemoveTeam,
  addLeader: addLeader,
  removeLeader: removeLeader,
  addMember: addMember,
  kickMember: kickMember,
  checkTeamByCredentials: checkTeamByCredentials,
  updateTeamReport: updateTeamReport,
  findActiveTeam: findActiveTeam,
  addConvoToTeam: addConvoToTeam,
  removeConvoToTeam: removeConvoToTeam,
  getApprovedTeam: getApprovedTeam,
  approveTeam: approveTeam,
  flatTeam: flatTeam
};
