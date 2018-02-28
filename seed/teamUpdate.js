const Team = require('../models/Team');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

// Team.update({'isVolunteer': false}, {'isApproved': false}, (err) => {
//   if (err) {
//     console.log(err);
//     return exit();
//   }
//   console.log('success');
//   exit();
// });

// Team.find({}, async (err, teams) => {
//   try {
//     if (err) {
//       return exit();
//     }
//     const update = await Promise.all(teams.map((t) => {
//       Team.findByIdAndUpdate(t._id, {'softRemoved': false}, (err, team) => {
//         if (err) {
//           return;
//         }
//         console.log(team);
//       });
//     }));
//     exit();
//   }
//   catch (e) {

//   }
// });

Team.findByIdAndRemove(null, (err, team) => {
  if (err) {
    console.log(err);
    return exit();
  }
  console.log('succes');
  exit();
});

function exit() {
  mongoose.disconnect();
}
