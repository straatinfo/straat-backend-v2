const _ = require('lodash');
const internals = {};

internals.catchError = (err, req, res) => {
  console.log(err);
  return res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
}

function checkTeamLeader (req, res, next) {
  const teamId = req.params.teamId;
  const userId = req.params.userId;
  const teamLeaders = req.user.teamLeaders || [];

  if (req.user._id == userId) {
    return res.status(400).send({
      status: 'ERROR',
      statusCode: 102,
      httpCode: 400,
      message: 'Invalid Parameter: User ID'
    })
  }

  const teamLeader = _.find(teamLeaders, (tl) => {
    return tl._team && tl._team._id.toString() == teamId;
  });

  if (!teamLeader) {
    return res.status(400).send({
      status: 'ERROR',
      statusCode: 102,
      httpCode: 400,
      message: 'Invalid Parameter: Team ID'
    })
  }

  next();
}

function checkMember (req, res, next) {
  const userId = req.params.userId;
  const teamId = req.params.teamId;
  return req.db.User.findById(userId)
    .populate('teams')
    .populate('teamMembers')
    .populate('teamLeaders')
    .then(user => {
      if (!user) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Invalid Parameter: User ID'
        });
      }

      const userteamMembers = user.teamMembers || [];

      const userHasTeam = _.find(userteamMembers, (tm) => {
        return tm._team.toString() == teamId;
      });

      if (!userHasTeam) {
        console.log('user is not a member');
        return res.status(201).send({
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 201,
          message: 'User is not a member'
        });
      }

      req.$scope.teamMember = user;
      next();
    })
    .catch(err => internals.catchError(err, req, res));
}

function removeTeamLeader (req, res, next) {
  const team = req.$scope.team;
  const userId = req.params.userId;
  const teamMember = req.$scope.teamMember;
  const teamId = req.params.teamId;
  const oldTeamLeaders = team.teamLeaders;
  const userOldTeamLeaders = teamMember.teamLeaders;
  try {
    const newTeamLeaders = _.filter(oldTeamLeaders, (tl) => {
      return tl._user._id.toString() != userId;
    });
    const newUserTeamLeaders = _.filter(userOldTeamLeaders, (tl) => {
      return tl._team.toString() != teamId;
    });
    req.$scope.newTeamLeaders = newTeamLeaders.map(tl => tl._id);
    req.$scope.newUserTeamLeaders = newUserTeamLeaders.map(tl => tl._id);
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: 'ERROR',
      statusCode: 100,
      httpCode: 500,
      message: 'Internal Server Error'
    })
  }
}

function removeTeamMember (req, res, next) {
  const team = req.$scope.team;
  const userId = req.params.userId;
  const teamMember = req.$scope.teamMember;
  const teamId = req.params.teamId;
  const oldTeamMembers = team.teamMembers;
  const userOldTeamMembers = teamMember.teamMembers;
  try {
    const newTeamMembers = _.filter(oldTeamMembers, (tm) => {
      return tm._user._id.toString() != userId;
    });
    const newUserTeamMembers = _.filter(userOldTeamMembers, (tm) => {
      return tm._team.toString() != teamId;
    });
    req.$scope.newTeamMembers = newTeamMembers.map(tm => tm._id);
    req.$scope.newUserTeamMembers = newUserTeamMembers.map(tm => tm._id);
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: 'ERROR',
      statusCode: 100,
      httpCode: 500,
      message: 'Internal Server Error'
    })
  }

}

function updateTeam (req, res, next) {
  const teamId = req.params.teamId;
  const newTeamLeaders = req.$scope.newTeamLeaders;
  const newTeamMembers = req.$scope.newTeamMembers;
  return req.db.Team.findByIdAndUpdate(teamId, {
    teamMembers: newTeamMembers,
    teamLeaders: newTeamLeaders
  })
    .then((team) => {
      next();
    })
    .catch(err => internals.catchError(err, req, res));
}

function updateUser (req, res, next) {
  const userId = req.params.userId;
  const newUserTeamLeaders = req.$scope.newUserTeamLeaders;
  const newUserTeamMembers = req.$scope.newUserTeamMembers;
  return req.db.User.findByIdAndUpdate(userId, {
    teamMembers: newUserTeamMembers,
    teamLeaders: newUserTeamLeaders
  })
    .then((team) => {
      next();
    })
    .catch(err => internals.catchError(err, req, res));
}

function respond (req, res, next) {
  res.status(201).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 201,
  });
}

module.exports = {
  checkTeamLeader,
  checkMember,
  removeTeamLeader,
  removeTeamMember,
  updateTeam,
  updateUser,
  respond
};
