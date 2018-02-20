const TeamLeader = require('../models/TeamLeader');
const Team = require('../models/Team');
const User = require('../models/User');

const checkTeamLeader = (_user, _team) => {
  return new Promise((resolve, reject) => {
    TeamLeader.findOne({'_user': _user, '_team': _team}, (err, teamLeader) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, teamLeader: teamLeader});
    });
  });
};

const addTeamLeader = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkTL = await checkTeamLeader(_user, _team);
      if (checkTL.err) {
        return resolve({err: checkTL.err});
      }
      if (checkTL.teamLeader) {
        return resolve({err: null, teamLeader: checkTL.teamLeader});
      }
      const newTeamLeader = new TeamLeader({'_user': _user, '_team': _team});
      newTeamLeader.save((err, teamLeader) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, teamLeader:teamLeader});
      });
    }
    catch (e) {
      reject(e);
    }
  });
};

const addTeamLeaderToUser = (_user, _teamLeader) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_user,
    { '$addToSet': { 'teamLeaders': _teamLeader } },
    { 'new': true, 'upsert': true },
    (err, user) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: user});
    });
  });
};

const addTeamLeaderToTeam = (_team, _teamLeader) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndUpdate(_team,
    { '$addToSet': { 'teamLeaders': _teamLeader } },
    { 'new': true, 'upsert': true },
    (err, team) => {
      if (err) {
        return resolve({err:err});
      }
      resolve({err: null, team: team});
    });
  });
};

const removeTeamLeader = (_user, _team) => {
  return new Promise((resolve, reject) => {
    TeamLeader.remove({'_user': _user, '_team': _team}, (err, teamLeader) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, teamLeader: teamLeader});
    });
  });
};

const removeTeamLeaderToUser = (_user, _teamLeader) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_user,
    { '$pop': { 'teamLeaders': _teamLeader } },
    (err, user) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: user});
    });
  });
};

const removeTeamLeaderToTeam = (_team, _teamLeader) => {
  return new Promise((resolve, reject) => {
    Team.findByIdAndUpdate(_team,
    { '$pop': { 'teamLeaders': _teamLeader } },
    (err, team) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, team: team});
    });
  });
};

// step 1
const removeTeamLeaderInUsers = (_team) => {
  return new Promise((resolve, reject) => {
    TeamLeader.find({'_team': _team}, async (err, teamLeaders) => {
      if (err) {
        return resolve({err: err});
      }
      const process = await Promise.all(teamLeaders.map(async(d) => {
        try {
          const updateUser = removeTeamLeaderToUser(d._user, d._id);
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
// step 2
const removeTeamLeaders = (_team) => {
  return new Promise((resolve, reject) => {
    TeamLeader.find({'_team': _team})
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
    TeamLeader.find({'_user': _user, 'active': true})
    .populate('_team')
    .exec((err, teamLeader) => {
      if (err) {
        return resolve({err: err});
      }
      if (teamLeader.length < 1) {
        return resolve({err: null, activeTeam: null});
      }
      const activeTeam = teamLeader[0]._team;
      resolve({err: null, activeTeam: activeTeam});

    });
  });
};

module.exports = {
  addTeamLeader: addTeamLeader,
  removeTeamLeader: removeTeamLeader,
  removeTeamLeaders: removeTeamLeaders,
  removeTeamLeaderInUsers: removeTeamLeaderInUsers,
  removeTeamLeaderToUser: removeTeamLeaderToUser,
  removeTeamLeaderToTeam: removeTeamLeaderToTeam,
  checkTeamLeader: checkTeamLeader,
  addTeamLeaderToTeam: addTeamLeaderToTeam,
  addTeamLeaderToUser: addTeamLeaderToUser,
  findActiveTeam: findActiveTeam
};
