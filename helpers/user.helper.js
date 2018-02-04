const User = require('../models/User');
const ErrorHelper = require('./error.helper');

const checkUserByCredentials = (loginName) => {
  return new Promise((resolve, reject) => {
    User.find({$or: [
      { 'email': loginName },
      { 'username': loginName }
    ]}, function (err, users) {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: users[0]});
    });
  });
};


const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, [
      '_id', 'email', 'fname', 'lname', 'gender',
      'houseNumber', 'streetName', 'city', 'state',
      'country', 'postalCode', 'phoneNumber',
      'long', 'lat', 'isBlocked', 'isPatron',
      'hostName', 'username'
    ])
    .populate('_role')
    .populate('_host')
    .exec(function(err, user) {
      if (err) {
        return resolve({err: err});
      }
      if (user.err) {
        return resolve({err: user.err});
      }
      resolve({err: null, user: user});
    });
  });
};

const createNewUser = (input) => {
  return new Promise((resolve, reject) => {
    const userEncryption = new User();
    const encryptedPassword = userEncryption.encryptPassword(input.password);
    const newUser = new User({
      ...input,
      password: encryptedPassword
    });
    newUser.save(function(err, user) {
      if (err) {
        return resolve({err: err});
      }

      resolve({err: null, user: user});
    });
  });
};

module.exports = {
  checkUserByCredentials: checkUserByCredentials,
  findUserById: findUserById,
  createNewUser: createNewUser
};
