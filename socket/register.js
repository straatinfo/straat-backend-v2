const SocketHelper = require('../helpers/socket.helper');
const UserHelper = require('../helpers/user.helper');
const ParticipantHelper = require('../helpers/participant.helper');


module.exports = function (io) {
  io.on('connection', function (socket, next) {
    console.log(socket.id, 'is connected to Register Socket');

    socket.on('register', async function (data) {
      try {
        const checkU = await UserHelper.findUserById(data._user);
        if (checkU.err || !checkU.user) {
          // socket.disconnect('unauthorized');
          console.log('Error: Invalid User ID');
          return io.to(socket.id).emit('register', {status: 0, message: 'Registration Failed'});
        }
        const checkCon = await SocketHelper.findSocketByUser(checkU.user._id, socket.id);

        let conn;
        if (!checkCon.socket) {
          conn = await SocketHelper.registerSocket(socket.id, data._user);
        } else {
          conn = checkCon;
        }

        io.to(socket.id).emit('register', {status: 1, message: 'Registration Success', _connection: conn.socket._id });
        console.log(checkU.user.fname, ' ', checkU.user.lname, ' is now Live and ready to miyow')
      }
      catch (e) {
        console.log(e);
        io.to(socket.id).emit('register', {status: 0, message: 'Registration Failed'});
      }
    });


    // handles all disconnecting functions
    socket.on('disconnect', async function (data) {
      try {
        const checkSocket = SocketHelper.findSocketBySocketId(socket.id);
        if (checkSocket.err) {
          console.log(err);
        }
        if (checkSocket.socket) {
          console.log('Disconnecting: ', checkSocket.socket);
          const deactivateParticipant = await ParticipantHelper.deactivateParticipant(checkSocket.socket._user);
        }
        const dc = await SocketHelper.removeSocket(socket.id);
        console.log(socket.id, 'Was Disconnected');
      }
      catch (e) {
        console.log(e);
      }
    });
  });
}
