const _ = require('lodash');

function getTeamLeaders (req, res, next) {
  const team = req.$scope.team;

  const teamLeaders = req.$scope.teamLeaders;

  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    teamLeaders: teamLeaders || []
  });
}

function getTeamLeader (req, res, next) {
  const leaderId = req.params.leaderId;
  const team = req.$scope.team;

  const teamLeaders = req.$scope.teamLeaders;
  const teamLeader = _.find(teamLeaders, (tl) => {
    return tl && tl._user && tl._user._id && tl._user._id.toString() == leaderId;
  });

  if (!teamLeader) {
    return res.status(401).send({
      status: 'ERROR',
      statusCode: 102,
      httpCode: 402,
      message: 'Invalid Parameter: Leader ID'
    });
  }

  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    teamLeader: teamLeader
  });

}

module.exports = {
  getTeamLeader,
  getTeamLeaders
};