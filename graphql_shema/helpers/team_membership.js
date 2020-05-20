const mongoose = require('mongoose');

async function _validateLeadership (req) {
  const userId = req.user._id;
  const teamId = req.body.teamId;
  const teamMember = await req.db
    .TeamMember({ _user: userId, _team: teamId })
    .populate('_team')
    .populate('_user');
  if ((teamMember && teamMember.isLeader) || req.user && req.user._role && req.user._role.accessLevel === 1) {
    req.$scope.teamMember = teamMember;
    return req;
  }

  throw {
    status: 'ERROR',
    statusCode: 103,
    httpCode: 401,
    message: 'Not allowed for this operation'
  };
}

async function _validateVolunteerCompat (req) {
  const { userId, teamId } = req.body;
  const user = await req.db.User.findById(userId);
  const team = await req.db.Team.findById(teamId);
  let error = {
    status: 'ERROR',
    statusCode: 103,
    httpCode: 401,
    message: 'Not allowed for this operation'
  };
  if (!user || !team) {
    error.message = 'Invalid Parameters: User ID and Team ID'
    throw error;
  }

  if (user.isVolunteer !== team.isVolunteer) {
    error.message = 'User is unable to join Team (Volunteer compatibility)'
    throw error;
  }

  return req;
}

async function _validateParams (req) {
  const { userId, teamId } = req.body;
  const user = await req.db.User.findById(userId);
  const team = await req.db.Team.findById(teamId);
  let error = {
    status: 'ERROR',
    statusCode: 103,
    httpCode: 401,
    message: 'Not allowed for this operation'
  };

  if (!user || !team) {
    error.message = 'Invalid Parameters: User ID and Team ID'
    throw error;
  }

  return req;
}

async function _setActiveTeam (req) {
  const { userId, teamId } = req.body;
  const memberships = await req.db.TeamMember.update({ _user: userId }, { isActive: false });
  const activeMember = await req.db.TeamMember.findOneAndUpdate({ _user: userId, _team: teamId }, { isActive: true });
  req.$scope.membership = activeMember;

  return req;
}

async function _joinTeam (req) {
  const { userId, teamId, isLeader } = req.body;
  const checkMembership = await req.db.TeamMember.findOne({ _team: teamId, _user: userId });

  if (checkMembership) {
    req.membership = checkMembership;
    return req;
  }

  const memberships = await req.db.TeamMember.update({ _user: userId }, { isActive: false });
  const newMembership = await req.db.TeamMember.create({ _user: userId, _team: teamId, isActive: true, isLeader });
  req.membership = newMembership;

  return req;
}

async function _unJoinTeam (req) {
  const { userId, teamId } = req.body;
  const deletedMembership = await req.db.TeamMember.findOneAndDelete({ _user: userId, _team: teamId });
  req.membership = deletedMembership;

  return req;
}

async function _setAsMember (req) {
  const { userId, teamId } = req.body;
  const membership = await req.db.TeamMember.findOneAndUpdate({ _user: userId, _team: teamId }, { isLeader: false });
  req.$scope.membership = membership;

  return req;
}

async function _setAsLeader (req) {
  const { userId, teamId } = req.body;
  const membership = await req.db.TeamMember.findOneAndUpdate({ _user: userId, _team: teamId }, { isLeader: true });
  req.$scope.membership = membership;

  return req;
}

module.exports = {
  _validateLeadership,
  _validateVolunteerCompat,
  _validateParams,
  _setActiveTeam,
  _unJoinTeam,
  _joinTeam,
  _setAsMember,
  _setAsLeader
};
