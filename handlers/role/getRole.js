const internals = {};
internals.catchError = async function (err, req, res) {
  req.log.error(err, 'GET /v4/api/roles/:roleId');

  return res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
};

module.exports = function (req, res, next) {
  const roleId = req.params.roleId;

  return req.db.Role.findById(roleId, [
    'name',
    'code',
    'accessLevel',
    'description'
  ])
    .then(role => {
      if (!role) {
        const error = {
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Invalid Parameter: Role ID'
        };
        req.log.warn(error, 'GET /v4/api/roles/:roleId');
        return res.status(400).send(error)
      }

      res.status(200).send({
        status: 'SUCCESS',
        statusCode: 0,
        httpCode: 200,
        role: role
      });
    })
    .catch(err => internals.catchError(err, req, res));
}