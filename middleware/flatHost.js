const HostHelper = require('../helpers/host.helper');
const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');

const getFlatHosts = async (req, res, next) => {
  try {
    if (!req.hosts) {
      return ErrorHelper.ClientError(res, {error: 'No hosts'}, 400);
    }
    const flatHosts = await Promise.all(req.hosts.map(async(d) => {
      const flatH = await HostHelper.flatHost(d);
      if (flatH.report !== null) {
        return flatH.host;
      } else {
        delete flatH.host;
      }
    }));
    SuccessHelper.success(res, flatHosts);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getFlatHosts: getFlatHosts
};