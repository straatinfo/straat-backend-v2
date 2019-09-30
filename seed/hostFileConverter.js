const Path = require('path');
const highland = require('highland');
var mongoose = require('mongoose');
const HOST_FILE_PATH = Path.join(__dirname, '../tmp/hosts_2019.csv');
const CsvToJsonHelper = require('../helpers/csv-json.helper');
const Config = require('../config');



mongoose.Promise = global.Promise;
mongoose.connect(Config.DATA_BASE, {useMongoClient: true});
const db = require('../models');

const makeUser = function (host) {
  const hostName = host['hostName'].replace('Gemeente ', '')
  return new db.User({
    hostName: hostName,
    hostAlternateName: host['alternateHostName'] || hostName,
    email: host['email'],
    hostPersonalEmail: host['personalEmail'],
    username: host['email'],
    streetName: host['address'],
    houseNumber: host['address'].split(' ')[1],
    city: host['city'],
    country: 'Netherlands',
    postalCode: host['postalCode'],
    phoneNumber: host['phoneNumber'],
    _role: '5a75c9de3a06a627a7e8af45',
    long: host['long'],
    lat: host['lat'],
    geoLocation: {
      type: 'Point',
      coordinates: [host['long'], host['lat']]
    }
  })
}

const delay = highland.wrapCallback(function delay(data, cb){
  setTimeout(function(){ cb(null, data); }, 500);
});

CsvToJsonHelper(HOST_FILE_PATH)
.map(host => makeUser(host))
.map(host => delay(host))
.sequence()
.each(async (host) => {
  if (host.hostName == 'hostName') {
    
  } else {
    try {
      const save = await host.save();
      console.log(save);
    } catch (e) {
      console.log(e);
    }
  }
})
.done(() => {
  process.exit(0);
});
