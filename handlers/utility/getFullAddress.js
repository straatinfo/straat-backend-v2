const rp = require('request-promise');
const config = require('../../config');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = function (req, res, next) {
  req.query.postcode = req.query.postcode.split(' ').join('');
  const postcodeApis = config.POSTCODE.POSTCODE_API_KEY.split(':|:');

  const options = {
    uri: 'https://api.postcodeapi.nu/v2/addresses',
    qs: req.query,
    headers: {
      'X-Api-Key': postcodeApis[getRandomInt(postcodeApis.length)]
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
