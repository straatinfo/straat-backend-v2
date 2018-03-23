const TeamInvite = require('../models/TeamInvite');
const TeamMemberHelper = require('../helpers/teamMember.helper');

const checkInviteExist = (_team, _user) => {
  return new Promise((resolve, reject) => {
    TeamInvite.findOne({'_user': _user, '_team': _team}, (err, teamInvite) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, teamInvite: teamInvite});
    });
  });
};

// used for getting list of pending request and invite team's point of view
const getInviteListByTeam = (_team, isRequest = false) => {
  return new Promise((resolve, reject) => {
    TeamInvite.find({'_team': _team, isRequest: isRequest})
    .populate('_team')
    .populate('_user', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .exec((err, teamInvites) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, teamInvites: teamInvites});
    });
  });
};

// used for getting list of pending request and invite user's point of view
const getRequestListByUser = (_user, isRequest = true) => {
  return new Promise((resolve, reject) => {
    TeamInvite.find({'_user': _user, isRequest: isRequest })
    .populate('_team')
    .populate('_user', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .exec((err, teamInvites) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, teamInvites: teamInvites});
    });
  });
};


const sendInvite = (_user, _team) => {
  return new Promise((resolve, reject) => {
    const newTeamInvite = new TeamInvite({'_user': _user, '_team': _team, isRequest: false});
    newTeamInvite.save((err, teamInvite) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

const sendRequest = (_user, _team) => {
  return new Promise((resolve, reject) => {
    const newTeamInvite = new TeamInvite({'_user': _user, '_team': _team, isRequest: true});
    newTeamInvite.save((err, teamInvite) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

// can be used for both decline request and decline invite
const removeInvite = (_user, _team) => {
  return new Promise((resolve, reject) => {
    TeamInvite.remove({'_user': _user, '_team': _team}, (err) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

const removeTeam = (_team) => {
  return new Promise((resolve, reject) => {
    TeamInvite.remove({'_team': _team}, (err) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

// for users
const acceptInvite = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const addMember = await TeamMemberHelper.addTeamMember(_user, _team);
      if (addMember.err) {
        return resolve({err: 'Failed to add user in the team.'});
      }
      const removeInvite = await removeInvite(_user, _team);
      if (removeInvite.err) {
        return resolve({err: null, warning: 'The invite was not removed.'});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

// for team admins
const acceptRequest = (_user, _team) => {
  return new Promise(async(resolve, reject) => {
    try {
      const addMember = await TeamMemberHelper.addTeamMember(_user, _team);
      if (addMember.err) {
        return resolve({err: 'Failed to add user in the team.'});
      }
      const removedInvite = await removeInvite(_user, _team);
      if (removedInvite.err) {
        return resolve({err: null, warning: 'The invite was not removed.'});
      }
      resolve({err: null, teamMember: addMember.teamMember});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getInviteListByTeam: getInviteListByTeam,
  getRequestListByUser: getRequestListByUser,
  sendInvite: sendInvite,
  sendRequest: sendRequest,
  removeInvite: removeInvite,
  removeTeam: removeTeam,
  acceptInvite: acceptInvite,
  acceptRequest: acceptRequest,
  checkInviteExist: checkInviteExist
};
