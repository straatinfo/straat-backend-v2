const Helper = require('./notification.helper')
/**
 * @description will be use to send notification base online | offline | email etc..
 *
 */
const creation = async function (req, report) {
  const io = req.app.get('io')
  const fc = req.app.get('fc')

  try {
    const members = await Helper.getTeamMembers(report._team)
    // determine who will receive
    // this will be members of team

    // send notification by socket
    // for online user
    await Promise.all(members.filter(u => u._user.isOnline).map(user => {
      if (user._user.setting.isNotification) {
        io.to(user._user.socketToken).emit('receive-global-msg', {data: {TYPE: 'REPORT', content: report}})
        console.log('io sent: ', user._user.socketToken)
      }
    }))

    // send notification by fcm
    // for inactive in app
    const toFcmReceiver = members.filter(u => !u._user.isOnline)
    if (toFcmReceiver.length > 0) {
      fc.send(Helper.createReportNotification(report, toFcmReceiver.map(u => u._user.fcmToken)), function (err, response) {
        if (err) {
          console.log('Something has gone wrong!')
        } else {
          console.log('Successfully sent with response: ', response)
        }
      })
    }

    // test
    // console.log('members', members)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  creation
}
