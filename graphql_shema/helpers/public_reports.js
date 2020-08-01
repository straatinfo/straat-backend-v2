
async function verifyReporter (req) {
  if (!req.user) {
    req.$scope.reports = [];
  }

  return req;
}

async function getReports (req) {
  const { code, hostId, sort } = req.body;
  const user = req.user;

  // get teams
  const teamMembers = await req.db.TeamMember.find({ _user: user._id });

  const teamList = teamMembers.map(tm => tm._team.toString());
  let reportType;

  let extendParam = {};

  if (code) {
    reportType = await req.db.ReportType.findOne({ code: code.toUpperCase() });
    if (reportType && reportType._id) {
      extendParam._reportType = reportType._id;
    }
  }

  // if hostId is Specified, filter by host
  if (hostId) {
    extendParam._host = hostId;
  }

  let publicReports = {
    $and: [
      { ...extendParam},
      {
        '$or': [
          {isPublic: true},
          {_reporter: user._id},
          {_team: {
            $in: teamList
          }}
        ]
      }
    ]
  }

  if (reportType && reportType.code == 'C') {
    publicReports = {
      $and: [
        { ...extendParam},
        {
          $or: [
            {
              teams: {
                $elemMatch: {
                  $in: teamList
                }
              }
            },
            {_team: {
              $in: teamList
            }}
          ]
        }
      ]
    };
  }
  let reportQuery = req.db.Report.find(publicReports);

  if (sort && sort.field) {
    const order = sort && sort.asc ? 1 : -1;
    const field = sort.field;
    reportQuery = reportQuery.sort({ [field]: order });
  }

  const reports = await reportQuery;
  req.$scope.reports = reports;
  return req;
};

module.exports = {
  _verifyReporter: verifyReporter,
  _getReports: getReports
};
