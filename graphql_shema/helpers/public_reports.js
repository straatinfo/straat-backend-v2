
async function verifyReporter (req) {
  if (!req.user) {
    req.$scope.reports = [];
  }

  return req;
}

async function getReports (req) {
  const { code } = req.body;
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


  let publicReports = {
    $and: [
      {_host: user._host, ...extendParam},
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
        {_host: user._host, ...extendParam},
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

  const reports = await req.db.Report.find(publicReports);
  req.$scope.reports = reports;
  return req;
};

module.exports = {
  _verifyReporter: verifyReporter,
  _getReports: getReports
};
