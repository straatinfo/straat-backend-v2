const fcm = require('fcm-notification');
const Promise = require('bluebird');


const config = require('../config');

let FCM = new fcm(config.FCM);

FCM = Promise.promisifyAll(FCM);


// Example usage:
var token = 'dSANpPcqBkY:APA91bF_iipI82aza786jF2wWHfMoQHE73UMbqUIneA2xJePoHAa5H_k3RL7lLztXOC0QiqJwr7pXN4xNYeKdRKQeF7QWhFuLAwczVXNHJmOoa6yIJ2trkD_4E_066C_N0hW6gci8Hmw';
 
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
    type:  '',
    customPayloadId: 'SENDMESSAGE_NOTIFICATION_GROUP'
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
      tag: `NEW_REPORT_UPDATE`
    }
  },
  apns: {
    payload: {
      aps: {
        'content-available': 1,
        alert: `New report update \nReceived 2 new messages`,
        body: 'Received 2 new message',
        badge: 1,
        sound: 'default'
      }
    }
  },
  token
};

// FCM.sendToMultipleTokenAsync(message, [token])
//   .then(console.log);


module.exports = FCM;
