
async function deleteMessage (req) {
  const { messageId } = req.body;
  const message = await req.db.Message.findByIdAndDelete(messageId);

  req.$scope.message = message;
  return req;
}

async function deleteUnreadMessage (req) {
  const { messageId } = req.body;
  await req.db.UnreadMessage.deleteMany({ _message: messageId });

  return req;
}

module.exports = {
  deleteMessage,
  deleteUnreadMessage
};
