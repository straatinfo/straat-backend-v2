
const ConversationHelper = require('../helpers/conversation.helper');
const SocketHelper = require('../helpers/socket.helper');

module.exports = function (io) {
  io.on('connect', function(socket, next) {
    console.log(socket.id, 'is connected to Message Socket');

    socket.on('send-message', async function(data) {
      try {
        const { _conversation } = data;
        if (!_conversation) {
          console.log('Error: Invalid conversation ID');
          return io.to(socket.id).emit('send-message', {status: 0, message: 'Failed to update listeners'});
        }
        // find participants in the conversation
        const getConvo = await ConversationHelper.getConversationById(_conversation);
        if (getConvo.err || !getConvo.conversation) {
          console.log('Error: Failed to update listeners');
          return io.to(socket.id).emit('send-message', {status: 0, message: 'Failed to update listeners'});
        }
        const updateListeners = await Promise.all(getConvo.conversation.participants.map(async(p) => {
          const findSocket = await SocketHelper.findSocketByUser(p._user);
          if (findSocket.socket) {
            console.log(`Telling socket ID: ${findSocket.socket} to update`);
            io.to(findSocket.socket._socket).emit('update-message', {status: 1, message: 'Update message', _conversation: _conversation});
          }
        }));
        console.log('Success: Successfully updated listeners');
        io.to(socket.id).emit('send-message', {status: 1, message: 'Successfully updated listeners'});
      }
      catch (e) {
        console.log('Error: ', e);
        io.to(socket.id).emit('send-message', {status: 0, message: 'Failed to update listeners'});
      }
    });
  });
}
