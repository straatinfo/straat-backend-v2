
const ConversationSocket = require('./socket/conversation');
const RegisterSocket = require('./socket/register');
const MessageSocket = require('./socket/message');
const GlobalSocket = require('./socket/global');

module.exports = function (io) {
  RegisterSocket(io);
  ConversationSocket(io);
  MessageSocket(io);
  GlobalSocket(io);
}
