const fcm = require('fcm-notification');
const Promise = require('bluebird');


const config = require('../config');

let FCM = new fcm(config.FCM);

FCM = Promise.promisifyAll(FCM);

/*
Example usage:
var token = 'fcm-token';
 
var message = {
  data: {    //This is only optional, you can send any data
    reportId: '5bea0fd2e6820c000f8345a7',
    reportName: 'Test'
  },
  notification:{
    title : 'Title of notification',
    body : 'Body of notification'
  },
  android: {
    ttl: 3600 * 1000,
    notification: {
      icon: 'ic_menu_gallery',
      'click_action' : '.ReportDetailActivity', 
      'body' : 'new Report update !', 
      'title' : 'new Report update !',
      color: '#f45342',
      sound : 'default'
    },
  },
  token : token
};
FCM.sendAsync(message)
  .then(console.log);
*/

module.exports = FCM;
