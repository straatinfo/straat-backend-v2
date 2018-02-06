const TeamLeader = require('../models/TeamLeader');

const addTeamLeader = (_user, _team) => {
  return new Promise((resolve, reject) => {
    const newTeamLeader = new TeamLeader({'_user': _user, '_team': _team});
    newTeamLeader.save((err, teaLeader) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

const checkTeamLeader = (_user, _team) => {
  return new Promise((resolve, reject) => {
    TeamLeader.findOne({'_user': _user, '_team': _team}, (err, leader) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, leader: leader});
    });
  });
};

const removeTeamLeader = (_user, _team) => {
  return new Promise((resolve, reject) => {
    TeamLeader.remove({'_user': _user, '_team': _team}, (err) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

const removeTeam = (_team) => {
  return new Promise((resolve, reject) => {
    TeamLeader.remove({'_team': _team}, (err) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null})
    })
  });
}

module.exports = {
  addTeamLeader: addTeamLeader,
  removeTeamLeader: removeTeamLeader,
  removeTeam: removeTeam,
  checkTeamLeader: checkTeamLeader
};
