
const Role = require('../models/Role');
const Config = require('../config');
const Team = require('../models/Team');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

// var teams = [
//   new Team({
//     '_host': '5a7b561e3b47226e7dac5deb',
//     '_teamName': 'isVolunteer team 1 in  host Den Haag',
//     'isVolunteer': true,
//     'teamEmail': 'team1@test.com'
//   }),
//   new Team({
//     '_host': '5a7b561e3b47226e7dac5deb',
//     'teamName':' isVolunteer team 2 in host Den Haag',
//     'isVolunteer': true,
//     'teamEmail': 'team2@test.com'
//   }),
//   new Team({
//     '_host': '5a7b561e3b47226e7dac5deb',
//     'teamName':' notVolunteer team 1 in host Den Haag',
//     'isVolunteer': false,
//     'teamEmail': 'team3@test.com'
//   }),
//   new Team({
//     '_host': '5a7b561e3b47226e7dac5deb',
//     'teamName':' notVolunteer team 2 in host Den Haag',
//     'isVolunteer': false,
//     'teamEmail': 'team3@test.com'
//   }),
//   new Team({
//     '_host': '5a7b591f5184917152d6bc6a',
//     'teamName':' isVolunteer team 1 in  host Vlaardingen',
//     'isVolunteer': true,
//     'teamEmail': 'team4@test.com'
//   }),
//   new Team({
//     '_host': '5a7b591f5184917152d6bc6a',
//     'teamName':' isVolunteer team 2 in host Vlaardingen',
//     'isVolunteer': true,
//     'teamEmail': 'team5@test.com'
//   }),
//   new Team({
//     '_host': '5a7b591f5184917152d6bc6a',
//     'teamName':' notVolunteer team 1 in host Vlaardingen',
//     'isVolunteer': false,
//     'teamEmail': 'team6@test.com'
//   }),
//   new Team({
//     '_host': '5a7b591f5184917152d6bc6a',
//     'teamName':' notVolunteer team 2 in host Vlaardingen',
//     'isVolunteer': false,
//     'teamEmail': 'team7@test.com'
//   })
// ];

// 

Team.find({}, async(err, teams) => {
  if (err) {
    return exit();
  }
  const process = Promise.all(teams.map(async(t) => {
    // Team.findByIdAndUpdate(t._id, {'creationMethod': 'WEBSITE'}, (err, team) => {
    //   if (team.teamLeaders[0]) {
    //     console.log(team.teamLeaders[0]);
    //   } else {
    //     console.log(team.teamMembers[0]);
    //   }
    //   console.log(t._id);
    // });
    // if (!t.teamLeaders[0] && !t.teamMembers[0]) {
    //   Team.remove({'_id': t._id}, (err) => {
    //     console.log('deleting', t._id);
    //   });
    // } else if (t.teamLeaders[0]){
    //   Team.findByIdAndUpdate(t._id, {'createdBy': t.teamLeaders[0]}, (err, team) => {
    //     console.log(team);
    //   });
    // } else {
    //   Team.findByIdAndUpdate(t._id, {'createdBy': t.teamMembers[0]}, (err, team) => {
    //     console.log(team);
    //   });
    // }
    console.log(t.createdBy);
  }));
  exit();
});

function exit() {
  mongoose.disconnect();
}
