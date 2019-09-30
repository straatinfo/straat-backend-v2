const fcm = require('fcm-notification');
const Promise = require('bluebird');


const config = require('../config');

let FCM = new fcm(config.FCM);

FCM = Promise.promisifyAll(FCM);


// Example usage:
var token = 'efR9RvdTdy4:APA91bEYjVgt6sey1cbLDoKH77aJZ6OGv2IJZ-YGDLL8bsP9dk2b1JancdkC16QPl8qsZ1GE9J2dgdeBv84FjomgTInBe3W8mw7bNbB2SMvZA9Wk0LbEIn91vQd3WwPhYNTWbWY2bjcr';
 
// var message = {
//   data: {    //This is only optional, you can send any data
//     reportId: '5bea0fd2e6820c000f8345a7',
//     reportName: 'Test'
//   },
//   notification:{
//     title : 'Title of notification',
//     body : 'Body of notification'
//   },
//   android: {
//     ttl: 3600 * 1000,
//     notification: {
//       icon: 'ic_menu_gallery',
//       'click_action' : '.ReportDetailActivity', 
//       'body' : 'user_123 sent a message', 
//       'title' : 'New message received',
//       color: '#f45342',
//       sound : 'default'
//     },
//   },
//   apns: {
//     payload: {    //This is only optional, you can send any data
//       aps: {
//         reportId: '5bea0fd2e6820c000f8345a7',
//         reportName: 'Test'
//       }
//     },
//   },
//   token
// };

const message = {
  data: {
    text: 'Hello',
    _conversation: '',
    _report:  '',
    _team: '',
    type:  ''
  },
  notification: {
    title: `New report update`,
    body: ``
  },

  android: {
    ttl: 3600 * 1000,
    notification: {
      icon: process.env.DEFAULT_ANDROID_NOTIF_ICON,
      click_action: '.ReportsActivity',
      title: process.env.DEFAULT_ANDROID_NOTIF_TAG || `3 new report updates received`,
      body: ``,
      color: process.env.DEFAULT_ANDROID_NOTIF_COLOR,
      sound : process.env.DEFAULT_ANDROID_NOTIF_SOUND,
      tag: 3 + process.env.DEFAULT_ANDROID_NOTIF_TAG || `new report updates received`
    }
  },
  apns: {
    payload: {
      aps: {
        text: '',
        _conversation: '',
        _report:  '',
        _team: 'Hello',
        type:  ''
      }
    }
  },
  token
};

// FCM.sendToMultipleTokenAsync(message, [token])
//   .then(console.log);

// FCM.sendAsync(message)
//   .then(console.log);

module.exports = FCM;
