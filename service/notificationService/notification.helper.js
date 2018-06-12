const TeamMember = require('./../../models/TeamMember')
const Report = require('./../../models/Report')

const getTeamMembers = function (_team) {
  return new Promise(async (resolve, reject) => {
    try {
      // const report = await Report.findOne(reportID)
      const members = await TeamMember.find({_team: _team}, {_id: true})
        .populate({path: '_user', select: ['fcmToken', 'socketToken', 'isOnline', 'setting']})
      return resolve(members)
    } catch (e) {
      reject(e)
      console.log(e)
    }
  })
}
const sendFcm = function (reportID) {
  return new Promise(async (resolve, reject) => {
    try {
      const re = await Report.findOne(reportID)
      const members = await TeamMember.find({_team: re._team}, {_id: true})
        .populate({path: '_user', select: ['fcmToken', 'socketToken', 'isOnline', 'setting']})
      return resolve(members)
    } catch (e) {
      reject(e)
      console.log(e)
    }
  })
}
const createReportNotification = function (report, to) {
  try {
    console.log('sending fcm to: ', to)
    return { // this may vary according to the message type (single recipient, multicast, topic, et cetera)
      
      collapse_key: 'com.straatmobile',

      notification: {
        title: 'Straat.info',
        body: `new report on ${report.title}`,
        autoCancel: false,
      // largeIcon: 'ic_launcher',
      // smallIcon: 'ic_launcher',
        icon: 'ic_launcher',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        sound: 'default',
        badge: 1
      },

      data: {  // you can send only notification or only data(or include both)
        data: report
      },
      registration_ids: to
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getTeamMembers,
  createReportNotification
}
