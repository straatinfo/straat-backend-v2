
const Role = require('../models/Role');
const Config = require('../config');
const Team = require('../models/Team');
const TeamLeader = require('../models/TeamLeader');
const TeamMembers = require('../models/TeamMember');
const Conversation = require('../models/Conversation');
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

async function run () {
  try {
    const teams = await Team.find({}).populate('teamMembers').populate('teamLeaders');
    const updateTeams = await Promise.all(teams.map(async(t) => {
      if (!t._conversation && t.teamMembers.length !== 0) {
        const newConversation = new Conversation({
          _author: t.teamMembers[0]._user,
          participants: [{
            _user: t.teamMembers[0]._user,
            isActive: false
          }],
        });
        const conversation = await newConversation.save();
        const updateTeam = await Team.update({'_id': t._id}, {'_conversation': conversation._id});
        const updateConversation = await Conversation.update({'_id': conversation._id}, {'title': `Convesation of team ${t.teamName} team`, '_team': t._id});
        const updatedTeam = await Team.findById(t._id);
        console.log('updated', updatedTeam._id);
        return updatedTeam;
      } else if (t.teamMembers.length === 0) {
        console.log('must be deleted', JSON.stringify(t, null, 2));
        // const user = await User.findById(t.teamLeaders[0]._user).populate('_role');
        // const updateUser = await User.update({'_id': t.teamLeaders[0]._user}, {'$pop': {'teamLeaders': t.teamLeaders[0]._id}});
        // const updateTeam = await Team.update({'_id': t._id}, {'$pop': {'teamLeaders': t.teamLeaders[0]._id}});
        // const removeTL = await TeamLeader.findByIdAndRemove(t.teamLeaders[0]._id);
        // console.log('fixing', t._id);
        const deleteT = await Team.findByIdAndRemove(t._id);
      } else {
        console.log('already had', t._conversation);
        return t;
      }
    }));
    exit();
  }
  catch (e) {
    console.log(e);
    exit();
  }
}

run();

function exit() {
  mongoose.disconnect();
}
