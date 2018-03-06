
const ConversationSocket = require('./socket/conversation');
const RegisterSocket = require('./socket/register');
const MessageSocket = require('./socket/message');

module.exports = function (io) {
  RegisterSocket(io);
  ConversationSocket(io);
  MessageSocket(io);
}
