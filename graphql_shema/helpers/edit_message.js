const mongoose = require('mongoose');

async function verifyUser (req) {
  const { messageId } = req.body;
  const user = req.user;
  let error = {
    status: 'ERROR',
    statusCode: 101,
    httpCode: 400,
    message: 'Invalid Parameter: Message ID'
  };

  if (!mongoose.isValidObjectId(mongoose)) {
    throw error;
  }

  const message = await req.db.Message.findById(messageId);
  if (!message || message._author.toString() != user._id.toString()) {
    error.message = 'Invalid User: User is not the owner of Message'
    throw error;
  }

  return req;
}

async function editMessage (req) {
  const { messageId, body } = req.body;
  const message = await req.db.Message.findByIdAndUpdate(messageId, {
    body: body
  });

  req.$scope.message = message;
  return req;
}

module.exports = {
  verifyUser,
  editMessage
};