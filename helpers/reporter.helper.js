const User = require('../models/User');
const RoleHelper = require('./role.helper');

const getReporters = () => {
  return new Promise(async(resolve, reject) => {
    const getRole = await RoleHelper.getRoleByCode('USER');
    if (getRole.err) {
      return resolve({err: getRole.err});
    }
    const _role = getRole.role._id;
    User.find({'_role': _role}, [
      '_id', 'email', 'fname', 'lname', 'gender',
      'houseNumber', 'streetName', 'city', 'state',
      'country', 'postalCode', 'phoneNumber',
      'long', 'lat', 'isBlocked',
      'hostName', 'username', '_host', 'isVolunteer',
      'picUrl', 'picSecuredUrl'
    ])
    .populate('_role')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email',
      'lname', 'fname', 'hostPersonalEmail'
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
      'long', 'lat', 'isBlocked',
      'hostName', 'username', '_host', 'isVolunteer',
      'picUrl', 'picSecuredUrl'
    ])
    .populate('_role')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email',
      'lname', 'fname', 'hostPersonalEmail'
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
      'long', 'lat', 'isBlocked',
      'hostName', 'username', '_host', 'isVolunteer',
      'picUrl', 'picSecuredUrl'
    ])
    .populate('_role')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email',
      'lname', 'fname', 'hostPersonalEmail'
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

const updateReporterReports = (_reporter, _report) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_reporter,
    { '$addToSet': { 'reporterReports': _report } },
    { 'new': true, 'upsert': true },
    (err, user) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: user});
    });
  });
};

const flatReporter = (r) => {
  return new Promise((resolve, reject) => {
    try {
      const flatR = {
        _id: r._id || null,
        fname: r.fname || null,
        lname: r.lname || null,
        gender: r.gender || null,
        email: r.email || null,
        username: r.username || null,
        houseNumber: r.houseNumber || null,
        streetName: r.streetName || null,
        country: r.country || null,
        state: r.state || null,
        postalCode: r.postalCode || null,
        city: r.city || null,
        lat: r.lat || null,
        long: r.long || null,
        '_role._id': (r._role && r._role._id) ? r._role._id : null,
        '_role.name': (r._role && r._role.name) ? r._role.name : null,
        '_role.code': (r._role && r._role.code) ? r._role.code : null,
        '_host.lname': (r._host && r._host.lname) ? r._host.lname : null,
        '_host.fname': (r._host && r._host.hostPersonalEmail) ? r._host.hostPersonalEmail : null,
        '_host.hostPersonalEmail': (r._host && r._host.hostPersonalEmail) ? r._host.hostPersonalEmail : null,
        '_role.accessLevel': (r._role && r._role.accessLevel) ? r._role.accessLevel : null,
        '_host._id': (r._host && r._host._id) ? r._host._id : null,
        '_host.hostName': (r._host && r._host.hostName) ? r._host.hostName : null,
        '_host.email': (r._host && r._host.email) ? r._host.email : null,
        '_host.postalCode': (r._host && r._host.postalCode) ? r._host.postalCode : null,
        '_host.phoneNumber': (r._host && r._host.phoneNumber) ? r._host.phoneNumber : null,
        '_host.isPatron': (r._host && r._host.isPatron) ? r._host.isPatron : false,
        'activeTeam._id': (r.activeTeam && r.activeTeam._id) ? r.activeTeam._id : null,
        'activeTeam.teamName': (r.activeTeam && r.activeTeam.teamName) ? r.activeTeam.teamName : null,
        'activeTeam.teamEmail': (r.activeTeam && r.activeTeam.teamEmail) ? r.activeTeam.teamEmail : null,
        teamLeaders: r.teamLeaders || [],
        teamMembers: r.teamMembers || [],
        isBlocked: r.isBlocked || false,
        isVolunteer: r.isVolunteer || false
      };
      resolve({err: null, reporter: flatR});
    }
    catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  getReporters: getReporters,
  getReporterById: getReporterById,
  blockReporter: blockReporter,
  unBlockReporter: unBlockReporter,
  getReportersByHost: getReportersByHost,
  updateReporterReports: updateReporterReports,
  flatReporter: flatReporter
};
