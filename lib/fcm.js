const fcm = require('fcm-notification');
const Promise = require('bluebird');


const config = require('../config');

let FCM = new fcm(config.FCM);

FCM = Promise.promisifyAll(FCM);


// Example usage:
var token = 'c_yuNEOeGow:APA91bFpk2I8CET2fMlO6wJsRSfYFVkqDqoavMycxt581BCx5f7AoHKefm9NoT13rubY-nlqbBGHjt22ZCmT2DKufPt7iedtHhRgptCwOfx8T_oK1VmZ-1Ewe8FwltOxfwgvL-hgPXDy';
 
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


module.exports = FCM;
