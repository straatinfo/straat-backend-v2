const TeamLeader = require('../models/TeamLeader');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

// TeamLeader.findByIdAndRemove(null, (err, teamLeader) => {
//   if (err) {
//     console.log(err);
//     return exit();
//   }
//   console.log('success');
//   exit();
// });

TeamLeader.find({}, async (err, teamLeaders) => {
  try {
    const process = await Promise.all(teamLeaders.map((t) => {
      TeamLeader.findByIdAndUpdate(t._id, {'isBlocked': false}, (err, teamLeader) => {
        if (err) {
          return null;
        }
        return teamLeader;
      });
    }));
    exit();
  }
  catch (e) {
    console.log(e);
    exit();
  }
});

function exit() {
  mongoose.disconnect();
}
