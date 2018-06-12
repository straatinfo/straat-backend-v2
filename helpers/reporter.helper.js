const User = require('../models/User');
const RoleHelper = require('./role.helper');

const getReporters = () => {
  return new Promise(async(resolve, reject) => {
    const getRole = await RoleHelper.getRoleByCode('USER');
    if (getRole.err) {
      return resolve({err: getRole.err});
    }
    const _role = getRole.role._id;
    User.find({'_role': _role, 'softRemoved': false}, [
      '_id', 'email', 'fname', 'lname', 'gender',
      'houseNumber', 'streetName', 'city', 'state',
      'country', 'postalCode', 'phoneNumber',
      'long', 'lat', 'isBlocked',
      'hostName', 'username', '_host', 'isVolunteer',
      '_profilePic', 'createdAt', 'updatedAt'
    ])
    .populate({
      path: '_activeTeam',
      populate: [ {path: 'teamMembers'}, {path: 'teamLeaders'}]
    })
    .populate('_role')
    .populate('_profilePic')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email',
      'lname', 'fname', 'hostPersonalEmail', 'createdAt', 'updatedAt'
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
    User.findOne({'_id': _id, 'softRemoved': false}, [
      '_id', 'email', 'fname', 'lname', 'gender',
      'houseNumber', 'streetName', 'city', 'state',
      'country', 'postalCode', 'phoneNumber',
      'long', 'lat', 'isBlocked',
      'hostName', 'username', '_host', 'isVolunteer',
      '_profilePic', 'createdAt', 'updatedAt'
    ])
    .populate({
      path: '_activeTeam',
      populate: [ {path: 'teamMembers'}, {path: 'teamLeaders'}]
    })
    .populate('_role')
    .populate('_profilePic')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email',
      'lname', 'fname', 'hostPersonalEmail', 'createdAt', 'updatedAt'
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
    .exec((err, reporter) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reporter: {...reporter, isBlocked: true}});
    });
  });
};

const unBlockReporter = (_id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_id, {'isBlocked': false})
    .exec((err, reporter) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reporter: {...reporter, isBlocked: false}});
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
    User.find({'_role': _role, '_host': _host, 'softRemoved': false}, [
      '_id', 'email', 'fname', 'lname', 'gender',
      'houseNumber', 'streetName', 'city', 'state',
      'country', 'postalCode', 'phoneNumber',
      'long', 'lat', 'isBlocked',
      'hostName', 'username', '_host', 'isVolunteer',
      '_profilePic', 'createdAt', 'updatedAt'
    ])
    .populate({
      path: '_activeTeam',
      populate: [ {path: 'teamMembers'}, {path: 'teamLeaders'}]
    })
    .populate('_role')
    .populate('_profilePic')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email',
      'lname', 'fname', 'hostPersonalEmail', 'createdAt', 'updatedAt'
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
        createdAt: r.createdAt || null,
        updatedAt: r.updatedAt || null,
        phoneNumber: r.phoneNumber || null,
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
        'activeTeam.createdAt': (r.activeTeam && r.activeTeam.createdAt) ? r.activeTeam.createdAt : null,
        'activeTeam.updatedAt': (r.activeTeam && r.activeTeam.updatedAt) ? r.activeTeam.updatedAt : null,
        'teamLeader._id': (r.teamLeader && r.teamLeader._id) ? r.teamLeader._id : null,
        'teamLeader.createdAt': (r.teamLeader && r.teamLeader.createdAt) ? r.teamLeader.createdAt : null,
        'teamLeader.updatedAt': (r.teamLeader && r.teamLeader.updatedAt) ? r.teamLeader.updatedAt : null,
        'teamMember._id': (r.teamMember && r.teamMember._id) ? r.teamMember._id : null,
        'teamMember.createdAt': (r.teamMember && r.teamMember.createdAt) ? r.teamMember.createdAt : null,
        'teamMember.updatedAt': (r.teamMember && r.teamMember.updatedAt) ? r.teamMember.updatedAt : null,
        teamLeaders: r.teamLeaders || [],
        teamMembers: r.teamMembers || [],
        isBlocked: r.isBlocked || false,
        isVolunteer: r.isVolunteer || false,
        status1: r.status1 || null,
        status2: r.status2 || null,
        '_profilePic._id': (r._profilePic && r._profilePic._id) ? r._profilePic._id : null,
        '_profilePic.url': (r._profilePic && r._profilePic.url) ? r._profilePic.url : null,
        '_profilePic.secure_url': (r._profilePic && r._profilePic.secure_url) ? r._profilePic.secure_url : null,
        '_profilePic.public_id': (r._profilePic && r._profilePic.public_id) ? r._profilePic.public_id : null,
        '_activeTeam._id': (r._activeTeam && r._activeTeam._id) ? r._activeTeam._id : null,
        '_activeTeam.teamName': (r._activeTeam && r._activeTeam.teamName) ? r._activeTeam.teamName : null,
        '_activeTeam.teamEmail': (r._activeTeam && r._activeTeam.teamEmail) ? r._activeTeam.teamEmail : null,
        '_activeTeam.createdAt': (r._activeTeam && r._activeTeam.createdAt) ? r._activeTeam.createdAt : null,
        '_activeTeam.updatedAt': (r._activeTeam && r._activeTeam.updatedAt) ? r._activeTeam.updatedAt : null,
        'pendingTeam._id': (r.pendingTeam && r.pendingTeam._id) ? r.pendingTeam._id : null,
        'pendingTeam.teamName': (r.pendingTeam && r.pendingTeam.teamName) ? r.pendingTeam.teamName : null
      };
      resolve({err: null, reporter: flatR});
    }
    catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const deleteReporter = (_reporter) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_reporter, {'softRemoved': true}, (err, reporter) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reporter: reporter});
    });
  });
};

module.exports = {
  getReporters: getReporters,
  getReporterById: getReporterById,
  blockReporter: blockReporter,
  unBlockReporter: unBlockReporter,
  getReportersByHost: getReportersByHost,
  updateReporterReports: updateReporterReports,
  flatReporter: flatReporter,
  deleteReporter: deleteReporter
};
