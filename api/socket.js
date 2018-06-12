const SocketHelper = require('../helpers/socket.helper')
const UserHelper = require('../helpers/user.helper')
const ParticipantHelper = require('../helpers/participant.helper')

// do not bind
const register = async (io, socket, data = null, next) => {
  const {_user, token} = socket.handshake.query
  try {
    const checkU = await UserHelper.findUserById(_user)
    if (checkU.err || !checkU.user) {
      console.log('Error: Invalid User ID')
      io.to(socket.id).emit('register', {status: 0, message: 'Registration Failed', error: 'failed'})
      return {status: 0, message: 'Registration Failed', error: 'failed'}
    }
    const checkCon = await SocketHelper.findSocketByUserAndUpdate(checkU.user._id, socket.id)
    const uSt = await UserHelper.updateSocketToken(checkU.user._id, socket.id)
    await UserHelper.updateIsOnline(checkU.user._id, true)

    let conn
    if (!checkCon.socket) {
      conn = await SocketHelper.registerSocket(socket.id, checkU.user._id)
    } else {
      conn = checkCon
    }

    io.to(socket.id).emit('register', {status: 1, message: 'Registration Success', _connection: conn.socket._id })
    console.log(checkU.user.fname, ' ', checkU.user.lname, ' is now Live and ready to miyow')
    return {status: 1, message: 'Registration Success', connection: conn}
  } catch (e) {
    console.log(e)
    io.to(socket.id).emit('register', {status: 0, message: 'Registration Failed'})
    return {status: 0, message: 'Registration Failed', error: 'failed'}
  }
}

const onConnection = async (io, socket, data = null, next) => {
}

const onDisconnect = async (io, socket, data = null, next) => {
  try {
    const dc = await SocketHelper.removeSocket(socket.id)
    console.log(socket.id, 'Was Disconnected')
    await UserHelper.updateIsOnlineBySocketToken(socket.id, false)
    // console.log('dc', dc)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  onConnection,
  register,
  onDisconnect
}
