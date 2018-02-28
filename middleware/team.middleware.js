const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const TeamHelper = require('../helpers/team.helper');

const flatTeam = async (req, res, next) => {
  try {
    if (!req.teams || req.teams.length === 0) {
      return SuccessHelper.success(res, []);
    }
    const flattenTeams = await Promise.all(req.teams.map(async(t) => {
      const flatT = await TeamHelper.flatTeam(t);
      if (flatT.team) {
        return flatT.team;
      }
    }));
    SuccessHelper.success(res, flattenTeams);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  flatTeam: flatTeam
};
