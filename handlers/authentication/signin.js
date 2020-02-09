const internals = {};
internals.catchError = async function (err, req, res) {
  req.log.error(err, 'POST /v4/api/authentication/signin');

  return res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
};

async function login (req, res, next) {
  try {
    const user = req.user;
    res.status(200).send({
      status: 'SUCCESS',
      statusCode: 0,
      httpCode: 200,
      token: req.lib.crypto.signJwt(user._id)
    });
  } catch (e) {
    internals.catchError(e, req, res);
  }
}

module.exports = login;
