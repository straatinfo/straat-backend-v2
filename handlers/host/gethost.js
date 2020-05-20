const internals = {};
internals.catchError = async function (err, req, res) {
  req.log.error(err, 'GET /v4/api/hots/:hostId');

  return res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
};

module.exports = function (req, res, next) {
  const hostId = req.params.hostId;

  return req.db.Host.findById(hostId, [
    'hostName',
    'hostAlternateName',
    'email',
    'hostPersonalEmail',
    'username',
    'fname',
    'lname',
    'houseNumber',
    'streetName',
    'city',
    'state',
    'country',
    'postalCode',
    'phoneNumber',
    'long',
    'lang',
    'geoLocation',
    'setting',
    'language',
    'isBlocked',
    'isActivated',
    'isSpecific',
    'softRemoved',
    '_profilePic',
    '_design',
    '_role',
    'firebaseTokens'
  ])
    .then(host => {
      if (!host) {
        const error = {
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Invalid Parameter: Host ID'
        };
        req.log.warn(error, 'GET /v4/api/hosts/:hostId');
        return res.status(400).send(error)
      }

      res.status(200).send({
        status: 'SUCCESS',
        statusCode: 0,
        httpCode: 200,
        host: host
      });
    })
    .catch(err => internals.catchError(err, req, res));
}