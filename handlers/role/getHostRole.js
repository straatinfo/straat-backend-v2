function getHostRole (req, res, next) {
  return req.db.Role.findOne({ code: 'HOST'})
    .then((role) => {
      req.$scope.role = role;

      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

module.exports = getHostRole;
