const TeamMember = require('../models/TeamMember');

const addTeamMember = (_user, _team) => {
  return new Promise((resolve, reject) => {
    const newTeamMember = new TeamMember({'_user': _user, '_team': _team});
    newTeamMember.save((err, teaMember) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

const checkTeamMember = (_user, _team) => {
  return new Promise((resolve, reject) => {
    TeamMember.findOne({'_user': _user, '_team': _team}, (err, member) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, member: member});
    });
  });
};

const removeTeamMember = (_user, _team) => {
  return new Promise((resolve, reject) => {
    TeamMember.remove({'_user': _user, '_team': _team}, (err) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

const removeTeam = (_team) => {
  return new Promise((resolve, reject) => {
    TeamMember.remove({'_team': _team}, (err) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

module.exports = {
  addTeamMember: addTeamMember,
  removeTeamMember: removeTeamMember,
  removeTeam: removeTeam,
  checkTeamMember: checkTeamMember
};
