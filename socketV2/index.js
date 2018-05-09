const SocketApi = require('../api/socketV2')
// Message = require('./message')


module.exports = function (io) {
  io.on('connection', function (socket) {
  	const user = {}  // maybe needed for future
  	// on socket v1 register, there will filter all connection and disconnet if connector is invalid

  	// run here after successfuly validate user connection to this socket
  	// this will bind all lister fo client socket

  	// shift to this style so binding will only need reference and minimum memmory need per route
    socket.on('send-message-v2', (args) => { SocketApi.onSendMessage(io, socket, user, args) })
 }) 
}
  