const Reporter = require('../models/Reporter');
const ReporterTypeHelper = require('./reportType.helper');

const getReporters = () => {
  return new Promise((resolve, reject) => {
    Reporter.find()
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .sort([['date', -1]])
    .exec((err, reporters) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reporters: reporters});
    });
  });
};

const getReporterByHost = (hostId) => {
  return new Promise((resolve, reject) => {
    Reporter.find({'_host': hostId})
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .sort([['date', -1]])
    .exec((err, reporters) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reporters: reporters});
    });
  });
}

const getReporterById = (_id) => {
  return new Promise((resolve, reject) => {
    Reporter.findById(_id)
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .exec((err, reporter) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reporter: reporter});
    });
  });
};

const updateReporter = (_id, input) => {
    return new Promise((resolve, reject) => {
        Reporter.findByIdAndUpdate(_id, input, async(err, reporter) => {
            if (err) {
                return resolve({err: err});
            }
            try {
                const getR = await getReporterById(reporter._id);
                if (getR.err) {
                    return resolve({err: getR.err});
                }
                resolve({err: null, reporter: getR.reporter});
            }
            catch (e) {
                reject(e);
            }
        });
    });
};

const deleteReporter = (_id) => {
  return new Promise((resolve, reject) => {
    Reporter.findByIdAndRemove(_id, (err, reporter) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reporter: reporter});
    });
  });
};

module.exports = {
  getReporters: getReporters,
  getReporterById, getReporterById,
  updateReporter: updateReporter,
  deleteReporter: deleteReporter,
  getReportByHost: getReportByHost,
};

