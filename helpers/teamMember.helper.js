const TeamMember = require('../models/TeamMember');
const Team = require('../models/Team');
const User = require('../models/User');

const checkTeamMember = (_user, _team) => {
  return new Promise((resolve, reject) => {
    TeamMember.findOne({'_user': _user, '_team': _team}, (err, teamMember) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, teamMember: teamMember});
    });
  });
};

const addTeamMember = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkTM = await checkTeamMember(_user, _team);
      if (checkTM.err) {
        return resolve({err: checkTM.err});
      }
      if (checkTM.teamMember) {
        return resolve({err: null, teamMember: checkTM.teamMember});
      }
      const newTeamMember = new TeamMember({'_user': _user, '_team': _team});
      newTeamMember.save((err, teamMember) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, teamMember:teamMember});
      });
    }
    catch (e) {
      reject(e);
    }
  });
};

const addTeamMemberToUser = (_user, _teamMember) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_user,
    { '$addToSet': { 'teamMembers': _teamMember } },
    (err, user) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: user});
    });
  });
};

const addTeamMemberToTeam = (_team, _teamMember) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndUpdate(_team,
      { '$addToSet': { 'teamMembers': _teamMember } },
    (err, team) => {
      if (err) {
        return resolve({err:err});
      }
      resolve({err: null, team: team});
    });
  });
};

const removeTeamMember = (_user, _team) => {
  return new Promise((resolve, reject) => {
    TeamMember.remove({'_user': _user, '_team': _team}, (err, teamMember) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, teamMember: teamMember});
    });
  });
};

const removeTeamMemberToUser = (_user, _teamMember) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_user,
    { '$pop': { 'teamMembers': _teamMember } },
    (err, user) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: user});
    });
  });
};

const removeTeamMemberToTeam = (_team, _teamMember) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndUpdate(_team,
    { '$pop': { 'teamMembers': _teamMember } },
    (err, team) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, team: team});
    });
  });
};

const removeTeamMemberInUsers = (_team) => {
  return new Promise((resolve, reject) => {
    TeamMember.find({'_team': _team}, async (err, teamMembers) => {
      if (err) {
        return resolve({err: err});
      }
      const process = await Promise.all(teamMembers.map(async(d) => {
        try {
          const updateUser = removeTeamMemberToUser(d._user, d._id);
          return;
        }
        catch (e) {
          return;
        }
      }));
      resolve({err: null});
    });
  });
}

const removeTeamMembers = (_team) => {
  return new Promise((resolve, reject) => {
    TeamMember.find({'_team': _team})
    .remove((err) => {
      if (err) {
        resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

const findActiveTeam = (_user) => {
  return new Promise((resolve, reject) => {
    TeamMember.find({'_user': _user, 'active': true})
    .populate('_team')
    .exec((err, teamMember) => {
      if (err) {
        return resolve({err: err});
      }
      if (teamMember.length < 1) {
        return resolve({err: null, activeTeam: null});
      }
      const activeTeam = teamMember[0]._team;
      resolve({err: null, activeTeam: activeTeam, teamMember: teamMember[0]});

    });
  });
};

module.exports = {
  addTeamMember: addTeamMember,
  removeTeamMember: removeTeamMember,
  removeTeamMembers: removeTeamMembers,
  removeTeamMemberInUsers: removeTeamMemberInUsers,
  removeTeamMemberToUser: removeTeamMemberToUser,
  removeTeamMemberToTeam: removeTeamMemberToTeam,
  checkTeamMember: checkTeamMember,
  addTeamMemberToTeam: addTeamMemberToTeam,
  addTeamMemberToUser: addTeamMemberToUser,
  findActiveTeam: findActiveTeam
};
