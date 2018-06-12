const Config = require('./../config')

module.exports = function () {
  try {
    const FCM = require('fcm-node')
    return new FCM(Config.GOOGLE.fcmKey)
  } catch (e) {
    console.log(e)
  }
}
