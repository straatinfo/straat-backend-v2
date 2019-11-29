const internals = {};

internals.error = function (err, req, res) {
  console.log('get-team-list error', err);
  res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
};


function getTeams (req, res, next) {
  const queryObject = {
    _host: req.query.hostId
  };

  if (req.query.isVolunteer != null && typeof req.query.isVolunteer == 'boolean') queryObject.isVolunteer = req.query.isVolunteer;
  return req.db.Team.find(queryObject)
    .select({
      _id: 1,
      _conversation: 1,
      _profilePic: 1,
      teamName: 1,
      teamEmail: 1,
      _host: 1,
      isVolunteer: 1,
      isApproved: 1
    })
    .populate('_conversation', ['_id'])
    .populate('_profilePic', ['_id', 'secure_url'])
    .then((teams) => {
      req.$scope.teams = teams;
      next();
    })
    .catch(e => internals.error(e, req, res));
}

function respond (req, res, next) {
  const teams = req.$scope.teams;
  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    teams
  });
}

module.exports = {
  getTeams,
  respond
};
