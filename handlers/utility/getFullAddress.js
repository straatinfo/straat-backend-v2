const rp = require('request-promise');
const config = require('../../config');

module.exports = function (req, res, next) {
  req.query.postcode = req.query.postcode.split(' ').join('');
  const options = {
    uri: 'https://api.postcodeapi.nu/v2/addresses',
    qs: req.query,
    headers: {
      'X-Api-Key': config.POSTCODE.POSTCODE_API_KEY
    },
    json: true
  };

  return rp.get(options)
    .then((response) => {
      req.$scope.address = response;
      next();
    })
    .catch((err) => {
      res.status(err.statusCode || 500).send(err.error);
    });
};
