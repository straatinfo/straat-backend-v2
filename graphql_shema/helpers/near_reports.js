
async function _getReports (req) {
  const { radius, lat, long } = req.body;
  const reporterId = req.body.userId || req.user._id;
  // get teams
  const teamMembers = await req.db.TeamMember.find({ _user: reporterId });

  const teamList = teamMembers.map(tm => tm._team.toString())
  const near = {
    geoLocation: {
      $near: {
        $maxDistance: parseFloat(radius),
        $minDistance: 0,
        $geometry: {
          type: 'Point',
          coordinates: [ parseFloat(long), parseFloat(lat) ]
        }
      }
    }
  }
  const status = {
    status: {$in: ['NEW', 'INPROGRESS', 'DONE', 'EXPIRED']}
  }
  const publicReports = {
    $and: [
      near,
      status,
      {
        isInMap: {
          $eq: true
        }
      },
      {_team: {$in: teamList}},
      {$or: [
        {isPublic: true},
        {_reporter: reporterId},
        // {
        //   teams: {
        //     $elemMatch: {
        //       $in: teamList
        //     }
        //   }
        // }
      ]}
    ]
  };

  const reports = await req.db.Report.find(publicReports);
  req.$scope.reports = reports;
  return req;
}

module.exports = {
  _getReports
};