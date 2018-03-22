
const Role = require('../models/Role');
const Config = require('../config');
const Team = require('../models/Team');
const TeamLeader = require('../models/TeamLeader');
const TeamMembers = require('../models/TeamMember');
const User = require('../models/User');
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

Team.find({})
.populate('teamLeaders')
.populate('teamMembers')
.exec(async(err, teams) => {
  if (err) {
    console.log(err);
    return exit();
  }
  const process = await Promise.all(teams.map(async(t) => {
    const tl = await Promise.all(t.teamLeaders.map(async(l) => {
      User.findByIdAndUpdate(l._user, {'isVolunteer': t.isVolunteer}, (err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        if(user)console.log('leader', user._id);
        return;
      });
    }));
    const tm = await Promise.all(t.teamMembers.map(async(m) => {
      User.findByIdAndUpdate(m._user, {'isVolunteer': t.isVolunteer}, (err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        if(user)console.log('member', user._id);
        return;
      });
    }));
  }));
  exit();
});

function exit() {
  mongoose.disconnect();
}
