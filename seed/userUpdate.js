const Role = require('../models/Role');
const Config = require('../config');
const User = require('../models/User');
const TeamMember = require('../models/TeamMember');
const TeamLeader = require('../models/TeamLeader');
const Team = require('../models/Team');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

// User.updateMany({}, {'softRemoved': false}, (err, user) => {
//   if (err) {
//     console.log(err);
//     return exit();
//   }
//   console.log('Success');
//   exit();
// });

Role.findOne({'accessLevel': 3}, (err, role) => {
  if (err) {
    return exit();
  }
  User.find({'_role': role._id})
  .populate('teamMembers')
  .populate('teamLeaders')
  .exec(async(err, users) => {
    try {
      if (err) {
        console.log(err);
        return exit();
      }
      const process = await Promise.all(users.map(async(u) => {
        if (u.teamLeaders.length !== 0 && u.teamLeaders[0] !== null) {
          User.findByIdAndUpdate(u._id, {'_activeTeam': u.teamLeaders[0]._team}, (err, user) => {
            console.log(u.teamLeaders[0]._team);
            if (err) {
              console.log(err);
            }
            if (user) {
              return user;
            }
          });
        } else if (u.teamMembers.length !== 0 && u.teamMembers[0] !== null) {
          User.findByIdAndUpdate(u._id, {'_activeTeam': u.teamMembers[0]._team}, (err, user) => {
            if (err) {
              console.log(err);
            }
            if (user) {
              return user;
            }
          });
        } else {
          return u;
        }
      }));
      // console.log(process);
      exit();
    }
    catch (e) {
      console.log(e);
      exit();
    }
  })
  // User.find({'_role': role._id})
  // .populate('_activeTeam')
  // .exec((err, users) => {
  //   if (err) {
  //     console.log(err);
  //     return exit();
  //   }
  //   console.log(users);
  //   exit();
  // })
});

function exit() {
  mongoose.disconnect();
}
