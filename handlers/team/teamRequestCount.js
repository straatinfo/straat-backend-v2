const internals = {};
internals.catchError = (err, req, res) => {
  console.log('Get team request count error', err);
  res.status(500).send({
    status: 'ERROR',
    httpCode: 500,
    statusCode: 1,
    message: 'Internal server error'
  });
};

function checkTeamLeader (req, res, next) {
  const userId = req.params.userId || req.body.userId || req.query.userId;
  return req.db.TeamLeader.find({ _user: userId })
    .then((teamLeaders) => {
      if (!teamLeaders || teamLeaders.length < 1) {
        return res.status(200).send({
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          count: 0
        });
      }

      req.$scope.teamLeaders = teamLeaders;
      next();
    })
    .catch(err => internals.catchError(err, req, res));
}

function checkTeamRequestCount (req, res, next) {
  const teamLeaders = req.$scope.teamLeaders;
  const teamIds = teamLeaders.map(tl => tl._team);
  return req.db.TeamInvite.find({
    $or: teamIds.map((id) => ({_team: id}))
  })
    .then((teaminvites) => {
      req.$scope.teaminvites = teaminvites;
      next();
    })
    .catch(err => internals.catchError(err, req, res));
}

function response (req, res, next) {
  const teamInvites = req.$scope.teaminvites;
  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    count: teamInvites && teamInvites.length || 0
  });

  return undefined;
}

module.exports = {
  checkTeamLeader,
  checkTeamRequestCount,
  response
};
