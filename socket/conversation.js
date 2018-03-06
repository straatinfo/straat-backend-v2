const ReporterHelper = require('../helpers/reporter.helper');
const SocketHelper = require('../helpers/socket.helper');
const ConversationHelper = require('../helpers/conversation.helper');
const ParticipantHelper = require('../helpers/participant.helper');

module.exports = function (io) {
  return io.sockets.on('connection', function (socket, next) {
    console.log(socket.id, 'is connected to Conversation Socket');
    socket.on('enter-convo', async function (data) {
      try {
        // check for socket id
        const { _connection, _conversation } = data;
        const checkSocket = await SocketHelper.findSocketById(_connection);
        if (checkSocket.err) {
          return socket.disconnect('unauthorized');
        }
        const checkConvo = await ConversationHelper.getConversationById(_conversation);
        if (checkSocket.err || !checkSocket.socket) {
          return io.to(socket.id).emit('enter-convo', {status: 0, message: 'Failed to enter conversation'})
        }
        const activateP = await ParticipantHelper.activateParticipant(checkSocket.socket._user, checkConvo.conversation, true);
        if (activateP.err) {
          console.log(err);
          return io.to(socket.id).emit('enter-convo', {status: 0, message: 'failed to enter conversation'});
        }
        if (activateP.participant) {
          console.log(socket.id, 'Participated the conversation');
        }
        io.to(socket.id).emit('enter-convo', {status: 1, message: 'Successfully entered conversation'});
      }
      catch (e) {
        console.log(e);
        io.to(socket.id).emit('enter-convo', {status: 0, message: 'failed to enter conversation'});
      }
    });

    socket.on('exit-convo', async function (data) {
      try {
        // check for socket id
        const { _connection, _conversation } = data;
        const checkSocket = await SocketHelper.findSocketById(_connection);
        if (checkSocket.err) {
          return socket.disconnect('unauthorized');
        }
        const checkConvo = await ConversationHelper.getConversationById(_conversation);
        if (checkSocket.err) {
          console.log(err);
        }
        const activateP = await ParticipantHelper.activateParticipant(checkSocket.socket._user, checkConvo.conversation, false);
        if (activateP.err) {
          console.log(err);
          return io.to(socket.id).emit('enter-convo', {status: 0, message: 'failed to exit convo'});
        }
        if (activateP.participant) {
          console.log(socket.id, 'Participated the conversation');
        }
        io.to(socket.id).emit('exit-convo', {status: 1, message: 'Successfully exit conversation'});
      }
      catch (e) {
        console.log(e);
        io.to(socket.id).emit('enter-convo', {status: 0, message: 'failed to exit convo'});
      }
    });
  });
}
