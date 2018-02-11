
const Role = require('../models/Role');
const Config = require('../config');
const Team = require('../models/Team');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

var teams = [
  new Team({
    '_host': '5a7b561e3b47226e7dac5deb',
    '_teamName': 'isVolunteer team 1 in  host Den Haag',
    'isVolunteer': true,
    'teamEmail': 'team1@test.com'
  }),
  new Team({
    '_host': '5a7b561e3b47226e7dac5deb',
    'teamName':' isVolunteer team 2 in host Den Haag',
    'isVolunteer': true,
    'teamEmail': 'team2@test.com'
  }),
  new Team({
    '_host': '5a7b561e3b47226e7dac5deb',
    'teamName':' notVolunteer team 1 in host Den Haag',
    'isVolunteer': false,
    'teamEmail': 'team3@test.com'
  }),
  new Team({
    '_host': '5a7b561e3b47226e7dac5deb',
    'teamName':' notVolunteer team 2 in host Den Haag',
    'isVolunteer': false,
    'teamEmail': 'team3@test.com'
  }),
  new Team({
    '_host': '5a7b591f5184917152d6bc6a',
    'teamName':' isVolunteer team 1 in  host Vlaardingen',
    'isVolunteer': true,
    'teamEmail': 'team4@test.com'
  }),
  new Team({
    '_host': '5a7b591f5184917152d6bc6a',
    'teamName':' isVolunteer team 2 in host Vlaardingen',
    'isVolunteer': true,
    'teamEmail': 'team5@test.com'
  }),
  new Team({
    '_host': '5a7b591f5184917152d6bc6a',
    'teamName':' notVolunteer team 1 in host Vlaardingen',
    'isVolunteer': false,
    'teamEmail': 'team6@test.com'
  }),
  new Team({
    '_host': '5a7b591f5184917152d6bc6a',
    'teamName':' notVolunteer team 2 in host Vlaardingen',
    'isVolunteer': false,
    'teamEmail': 'team7@test.com'
  })
];

var done = 0;
for (var i = 0; i < teams.length; i++) {
  teams[i].save(function (err, result) {
    done++;
    if (done === teams.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
