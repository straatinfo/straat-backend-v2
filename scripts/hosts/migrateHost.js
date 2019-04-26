const hl = require('highland');
const path = require('path');
const User = require(path.resolve(__dirname, '../..', 'models', 'User'));
const Role = require(path.resolve(__dirname, '../..', 'models', 'Role'))
const csvToJsonHelper = require(path.resolve(__dirname, '../..', 'helpers', 'csv-json.helper'));
const hostFilePath = require(path.resolve(__dirname, '../..', 'tmp', 'hosts_2018.csv'));

function makeUser (host) {
  return {
    hostName: host['host name'],
    email: host['Email address'],
    username: host['Email address'],
    houseNumber: host['Address'].split(' ')[1],
    city: host['City'],
    country: 'Netherlands',
    postalCode: host['Postal code'],
    phoneNumber: host['phone number'],
    _role: role._id
  };
}

function getRoleId (data = {}) {
  return Role.findOne({ code: 'HOST' })
    .then((role) => {
      data.role = role;
      return data;
    });
}
