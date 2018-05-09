// const SocketHelper = require('../helpers/socket.helper');
// const UserHelper = require('../helpers/user.helper');
// const ParticipantHelper = require('../helpers/participant.helper');
const SocketApi = require('../api/socket')

module.exports = function (io) {
  io.on('connection', async function (socket, next) {
    console.log(socket.id, 'is connected to Register Socket')

    // socket.on('register', async function (data) {
    //   try {
    //     const checkU = await UserHelper.findUserById(data._user);
    //     if (checkU.err || !checkU.user) {
    //       // socket.disconnect('unauthorized');
    //       console.log('Error: Invalid User ID');
    //       return io.to(socket.id).emit('register', {status: 0, message: 'Registration Failed'});
    //     }
    //     const checkCon = await SocketHelper.findSocketByUserAndUpdate(checkU.user._id, socket.id);

    //     let conn;
    //     if (!checkCon.socket) {
    //       conn = await SocketHelper.registerSocket(socket.id, data._user);
    //     } else {
    //       conn = checkCon;
    //     }

    //     io.to(socket.id).emit('register', {status: 1, message: 'Registration Success', _connection: conn.socket._id });
    //     console.log(checkU.user.fname, ' ', checkU.user.lname, ' is now Live and ready to miyow')
    //   }
    //   catch (e) {
    //     console.log(e);
    //     io.to(socket.id).emit('register', {status: 0, message: 'Registration Failed'});
    //   }
    // });

    const registerUser = await SocketApi.register(io, socket, null, next) // no binding here

    // terminate if unauthorized failed
    if (registerUser.error) {
      console.log(socket.id, 'unauthorized')
      return socket.disconnect('unauthorized')
    }

    // handles all disconnecting functions
    socket.on('disconnect', function (data) { SocketApi.onDisconnect(io, socket, data, next) })
  })
}
