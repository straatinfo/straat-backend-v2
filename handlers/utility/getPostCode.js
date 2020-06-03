const rp = require('request-promise');
const config = require('../../config');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const postcodeApis = config.postcode.POSTCODE_API_KEY.split(':|:');

module.exports = function (req, res, next) {
  if (!req.query.postcode) {
    return res.status(400).send({
      status: 'ERROR',
      httpCode: 400,
      statusCode: 102,
      statusMessage: 'Missing Parameter: Post Code'
    });
  }
  req.query.postcode = req.query.postcode.split(' ').join('');
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
