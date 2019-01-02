const Moment = require('moment');
const Report = require('../../models/Report');
const Mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const request = require('request');

const CONFIG = require('../../config');

const updateExpiredReports = async () => {
  try {
    const expiredReports = await Report.find({
      createdAt: {
        '$lte': Moment().subtract(10, 'days').format('YYYY-MM-DD:HH')
      },
      status: 'NEW'
    });
    let update;
    if (expiredReports.length > 0) {
      update = await Promise.all(expiredReports.map(async(report) => {
        const x = await Report.findByIdAndUpdate(report._id, {
          status: 'EXPIRED',
          causeOfFinished: 'Expiration'
        });
        return  x;
      }));
    }
    console.log('Expired Reports: ', update ? update : []);
  }
  catch (e) {
    console.log(e);
  }
};

const backupDB = function () {
  const uri = CONFIG.SERVER_API.INTERNAL + '/v1/api/internal/backup-db';
  const token = bcrypt.hashSync('server-password-123456789', bcrypt.genSaltSync(10), null);
  request(uri, {
    'method': 'get',
    'headers': {
      'secret-key': 'my super secret key',
      'token': token
    }
  })
  .on('data', function (data) {
    // console.log(data);
    if (data) console.log(((JSON.parse(data) ? JSON.parse(data) : 'error')));
  })
  .on('complete', function (res) {
    if (res.statusCode) console.log(res.statusCode);
  });
};

module.exports = {
  updateExpiredReports,
  backupDB
};
