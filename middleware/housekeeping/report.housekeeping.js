const Moment = require('moment');
const Report = require('../../models/Report');
const Mongoose = require('mongoose');

const updateExpiredReports = async () => {
  try {
    const expiredReports = await Report.find({
      createdAt: {
        '$lte': Moment().subtract(10, 'days').format('YYYY-MM-DD')
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

module.exports = {
  updateExpiredReports
};

