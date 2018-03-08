const SocketHelper = require('../helpers/socket.helper');


module.exports = function (io) {
  return io.sockets.on('connection', function(socket, next) {
    console.log(socket.id, 'is connected to Global Socket');

    // should implement guard here
    socket.on('send-global-msg', async function(data) {
      // will trigger all registered user
      const getOnlineUser = await SocketHelper.findSocket();
      if (getOnlineUser.err) {
        console.log('There is an error on updating user');
        return io.to(socket.id).emit('send-global-msg', { status: 0, message: 'Could not update users at this time'});
      }
      const updateOnlineUsers = await Promise.all(getOnlineUser.sockets.map(async(s) => {
        console.log('updating socket ID: ', s._socket);
        // for now, emiting the data from send-global-msg event
        return io.to(s._socket).emit('receive-global-msg', { status: 1, message: 'Updating Socket', data: data });
      }));

      io.to(socket.id).emit('send-global-msg', { status: 1, message: 'Successfully updated users', count: updateOnlineUsers.sockets.length });
    });

  });
}
