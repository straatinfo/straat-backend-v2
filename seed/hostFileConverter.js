const Path = require('path');
const highland = require('highland');
var mongoose = require('mongoose');
const HOST_FILE_PATH = Path.join(__dirname, '../tmp/hosts_2018.csv');
const CsvToJsonHelper = require('../helpers/csv-json.helper');
const User = require('../models/User');
const newUser = new User();

const makeUser = function (host) {
  return new User({
    hostName: host['host name'],
    email: host['Email address'],
    username: host['Email address'],
    streetName: host['Address'],
    houseNumber: host['Address'].split(' ')[1],
    city: host['City'],
    country: 'Netherlands',
    postalCode: host['Postal code'],
    phoneNumber: host['phone number'],
    _role: '5a75c9de3a06a627a7e8af45'
  })
}

const delay = highland.wrapCallback(function delay(data, cb){
  setTimeout(function(){ cb(null, data); }, 2000);
});

CsvToJsonHelper(HOST_FILE_PATH)
.map(host => makeUser(host))
.map(host => delay(host))
.sequence()
.each(x => console.log(x));
