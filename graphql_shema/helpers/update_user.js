async function _blockUser (req) {
  const reporterId = req.body.id;
  const updatedUser = await req.db.User.findByIdAndUpdate(reporterId, { isBlocked: true });
  req.$scope.updatedUser = updatedUser;

  return req;
}

async function _unblockUser (req) {
  const reporterId = req.body.id;
  const updatedUser = await req.db.User.findByIdAndUpdate(reporterId, { isBlocked: false });
  req.$scope.updatedUser = updatedUser;

  return req;
}

async function _softRemoveUser (req) {
  const reporterId = req.body.id;
  const updatedUser = await req.db.User.findByIdAndUpdate(reporterId, { softRemoved: true });
  req.$scope.updatedUser = updatedUser;

  return req;
}

module.exports = {
  _blockUser,
  _unblockUser,
  _softRemoveUser
};
