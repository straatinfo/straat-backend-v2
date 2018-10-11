const SocketHelper = require('../helpers/socket.helper')

const sendToMay = (ids = [], io, current = 0) => {
  if (ids.length === (current + 1)) {
    return io.to(ids[current]._socket)
  }
  return sendToMay(ids, io.to(ids[current]._socket), current + 1)
}

module.exports = function (io) {
  return io.sockets.on('connection', function (socket, next) {
    console.log(socket.id, 'is connected to Global Socket')

    // should implement guard here
    socket.on('send-global-msg', async function (data) {
      try {
	      // will trigger all registered user
	      const getOnlineUser = await SocketHelper.findSocket()
	      if (getOnlineUser.err) {
        console.log('There is an error on updating user')

        return io.to(socket.id).emit('send-global-msg', { status: 0, message: 'Could not update users at this time'})
	      }
	      const updateOnlineUsers = await Promise.all(getOnlineUser.sockets.map(async(s) => {
        console.log('updating socket ID: ', s._socket)
		    // for now, emiting the data from send-global-msg event
	      return io.to(s._socket).emit('receive-global-msg', { status: 1, message: 'Updating Socket', data: data })
	      }))

        // const updateOnlineUsers = await sendToMay(getOnlineUser.sockets, io, 0).emit('receive-global-msg', { status: 1, message: 'Updating Socket', data: data });
        // const updateOnlineUsers = await io.to(getOnlineUser.sockets[1]._socket).emit('receive-global-msg', { status: 1, message: 'Updating Socket', data: data });
        io.to(socket.id).emit('send-global-msg', { status: 1, message: 'Successfully updated users', count: updateOnlineUsers.length })
      } catch (e) {
	       console.log(e)
      }
    })

    socket.on('approved-member', async function(data) {
      try {
        return io.emit('received-approval', {
          status: 1, 
          message: "success", 
          dutch: "Gefeliciteerd, de team coördinator heeft uw verzoek geaccepteerd en u heeft nu toegang tot het team.", 
          english: "English: congratulations, the team leader has accepted your request. Now you have full access to the app.",
          data,
        });
      } catch (error) {
        console.log(error);
      }
    });
  })
}
