
async function _isAdmin (req) {
  if (req.user && req.user._role && req.user._role.code.toUpperCase() === 'ADMIN') {
    return req;
  }

  throw {
    status: 'ERROR',
    statusCode: 103,
    httpCode: 401,
    message: 'Not allowed for this operation'
  };
}

async function _isAuthenticated (req) {
  if (req.user && req.user._role) {
    return req;
  }

  throw {
    status: 'ERROR',
    statusCode: 103,
    httpCode: 401,
    message: 'Not allowed for this operation'
  };
}

module.exports = {
  _isAuthenticated,
  _isAdmin
};
