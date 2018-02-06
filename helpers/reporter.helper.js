const User = require('../models/User');
const RoleHelper = require('./role.helper');

const getReporters = () => {
  return new Promise(async(resolve, reject) => {
    const getRole = await RoleHelper.getRoleByCode('USER');
    if (getRole.err) {
      return resolve({err: getRole.err});
    }
    const _role = getRole.role._id;
    console.log(_role);
    User.find({'_role': _role}, [
      '_id', 'email', 'fname', 'lname', 'gender',
      'houseNumber', 'streetName', 'city', 'state',
      'country', 'postalCode', 'phoneNumber',
      'long', 'lat', 'isBlocked', 'username'
    ])
    .populate('_role')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email'
    ])
    .populate('teamMembers')
    .populate('teamLeaders')
    .exec((err, reporters) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reporters: reporters});
    });
  });
};

const getReporterById = (_id) => {
  return new Promise((resolve, reject) => {
    User.findById(_id, [
      '_id', 'email', 'fname', 'lname', 'gender',
      'houseNumber', 'streetName', 'city', 'state',
      'country', 'postalCode', 'phoneNumber',
      'long', 'lat', 'isBlocked', 'username'
    ])
    .populate('_role')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email'
    ])
    .populate('teamMembers')
    .populate('teamLeaders')
    .exec((err, reporter) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reporter: reporter});
    });
  });
};

const blockReporter = (_id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_id, {'isBlocked': true})
    .exec((err) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

const unBlockReporter = (_id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_id, {'isBlocked': false})
    .exec((err) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    });
  });
};

const getReportersByHost = (_host) => {
  return new Promise(async(resolve, reject) => {
    const getRole = await RoleHelper.getRoleByCode('USER');
    if (getRole.err) {
      return resolve({err: getRole.err});
    }
    const _role = getRole.role._id;
    User.find({'_role': _role, '_host': _host}, [
      '_id', 'email', 'fname', 'lname', 'gender',
      'houseNumber', 'streetName', 'city', 'state',
      'country', 'postalCode', 'phoneNumber',
      'long', 'lat', 'isBlocked', 'username'
    ])
    .populate('_role')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email'
    ])
    .populate('teamMembers')
    .populate('teamLeaders')
    .exec((err, reporters) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reporters: reporters});
    });
  });
};

module.exports = {
  getReporters: getReporters,
  getReporterById: getReporterById,
  blockReporter: blockReporter,
  unBlockReporter: unBlockReporter,
  getReportersByHost: getReportersByHost
};
