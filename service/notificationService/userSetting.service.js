// const Helper = require('./notification.helper')
/**
 * @description will be use to send socket when blocking user online
 *
 */
const blockUser = async function (req, user) {
  const io = req.app.get('io')
  const fc = req.app.get('fc')

  try {
    if (user.isOnline && user.socketToken) {
      io.to(user.socketToken).emit('BLOCK_USER', {data: {user: {_id: user._id}}})
      console.log('io sent: ', user.socketToken)
      console.log(`${user.lname}, ${user.fname} been blocked!`)
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  blockUser
}
