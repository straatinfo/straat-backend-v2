const Report = require('../models/Report');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

// Report.find({}).populate('_conversation')
// .then(function (reports) {
//   return Promise.all(reports.map(async function (report) {
//     const newConversation = new Conversation({
//       'title': `Report Chat for Report ID: ${report._id}`,
//       'type': 'REPORT',
//       '_author': report._reporter,
//       '_report': report._id,
//       'participants': [report._reporter]
//     });
//     const convo = await newConversation.save();
//     const updateUser = await User.update({'_id': report._id}, {
//       '$addToSet': { 'conversations': convo._id }
//     });
//     return convo;
//   }));
// })
// .then(function (reports) {
//   console.log(reports);
//   exit();
// })
// .catch(function (err) {
//   console.log('err', err);
//   exit();
// });

// Conversation.find({'type': 'REPORT'})
// .then(async function (convo) {
  
//   return Promise.all(convo.map(async function (con) {
//     const report = await Report.findById(con._report);
//     const participants = [{
//       _user: report._reporter,
//       isActive: false
//     }];
//     const updateCon = await Conversation.update({'_id': con._id}, { participants: participants });
//     const updatedCon = await Conversation.findById(con._id);
//     return updatedCon;
//   }));
// })
// .then(function (conversations) {
//   console.log(JSON.stringify(conversations, null, 2));
//   exit();
// });

Report.find({}).populate('_conversation')
.then(function(reports) {
  console.log(JSON.stringify(reports, null, 2));
  exit();
});


function exit() {
  mongoose.disconnect();
}
