const mongoose = require('mongoose');
const Transaction = require('mongoose-transactions');


async function _validateTeamHost (req) {
  const { hostId } = req.body;
  const host = await req.db.Host.findById(hostId);

  if (!host) {
    throw {
      status: 'ERROR',
      statusCode: 102,
      httpCode: 400,
      message: 'Invalid Parameter: Host ID'
    };
  }
  req.$scope.host = host;

  return req;
}

async function _validateUpdateParams (req) {
  const { id, teamName, teamEmail, profilePic } = req.body;
  let error = {
    status: 'ERROR',
    statusCode: 102,
    httpCode: 400,
    message: 'Invalid Parameter: Team ID'
  };

  if (!mongoose.isValidObjectId(id)) {
    throw error;
  }

  return req;
}

async function _validateCreateParams (req) {
  const { teamName, teamEmail, profilePic } = req.body;
  let error = {
    status: 'ERROR',
    statusCode: 102,
    httpCode: 400,
    message: 'Invalid Parameter: Team Name'
  };

  if (!teamName || teamName.trim() == '') {
    throw error;
  }

  if (!teamEmail || !req.lib.validation.isEmail(teamEmail)) {
    error.message = 'Invalid Parameter: Team Email';
    throw error;
  }

  if (profilePic && !mongoose.isValidObjectId(profilePic)) {
    error.message = 'Invalid Parameter: Profile Image ID';
    throw error;
  }

  return req;
}

async function _updateTeam (req) {
  const { id, teamName, teamEmail, profilePic } = req.body;
  let updateObj = {};
  if (teamName && teamName.trim() !== '') updateObj.teamName = teamName;
  if (teamEmail && teamEmail.trim() !== '') updateObj.teamEmail = teamEmail;
  if (profilePic && profilePic.trim() !== '' && mongoose.isValidObjectId(profilePic)) updateObj._profilePic = profilePic;

  const updatedTeam = await req.db.Team.findByIdAndUpdate(id, updateObj);
  req.$scope.team = updatedTeam;

  return req;
}

async function _softRemoveTeam (req) {
  const { id } = req.body;
  const checkMembers = await req.db.TeamMember.find({ _team: id });
  if (checkMembers.length > 0) {
    throw {
      status: 'ERROR',
      httpCode: 400,
      statusCode: 102,
      message: 'Cannot delete team that has members'
    };
  }
  const updatedTeam = await req.db.Team.findByIdAndUpdate(id, { softRemoved: true });
  req.$scope.team = updatedTeam;

  return req;
}

async function _createTeam (req) {
  const { teamName, teamEmail, profilePic, hostId, creationMethod, reporterId } = req.body;
  const user = req.user;
  let insertObj = {
    teamEmail,
    teamName,
    _host: hostId,
    creationMethod,
    createdBy: reporterId,
    _profilePic: profilePic };
  const transaction = new Transaction();
  try {
    const conversationId = await transaction.insert('Conversation', {});
    const teamId = await transaction.insert('Team', insertObj);
    const teamMemberId = await transaction.insert('TeamMember', {
      _user: user._id,
      _team: teamId,
      isLeader: true
    });
    await transaction.run();

    req.$scope.teamId = teamId;
    return req;
  } catch (e) {
    try {
      transaction.rollback();
      transaction.clean();
    } catch (e) {
      // ignore error
    }
    console.log(e.error)
    if (e && e.error && e.error.errmsg) {
      const m = e.error.errmsg.split(' ');
      const message = m[1] + ' ' + m[2] + ': ' + m[5].split('.')[m[5].split('.').length - 1];
      throw {
        status: 'ERROR',
        httpCode: 400,
        statusCode: 102,
        message: message
      };
    }
    throw e || {};
  }
}

module.exports = {
  _validateUpdateParams,
  _validateTeamHost,
  _updateTeam,
  _softRemoveTeam,
  _validateCreateParams,
  _createTeam
};
