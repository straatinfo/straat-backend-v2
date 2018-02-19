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
      'hostName', 'username', '_host', 'isVolunteer',
      'picUrl', 'picSecuredUrl'
    ])
    .populate('_role')
    .populate({
      path: 'teamMembers',
      populate: {
        path: '_team'
      }
    })
    .populate({
      path: 'teamLeaders',
      populate: {
        path: '_team'
      }
    })
    .exec(function(err, user) {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: user});
    });
  });
};

const updateUser = (_id, input) => {
  return new Promise((resolve, reject) => {
    console.log(input);
    User.findByIdAndUpdate(_id, input, async (err, user) => {
      if (err) {
        return resolve({err: err});
      }
      const getUserD = await findUserById(user._id);
      if (getUserD.err) {
        return resolve({err: getUserD.err});
      }
      resolve({err: null, user: getUserD.user});
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
      User.findByIdAndUpdate(input._host,
      { '$addToSet': { 'reporters': user._id } },
      { 'new': true, 'upsert': true },
      (err, host) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, user: user});
      });
    });
  });
};

// for host
// add team to hos
const addTeamToHost = (_host, _team) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_host,
    { '$addToSet': { 'teams': _team } },
    (err, host) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, host: host});
    });
  });
};

const forgotPassword = (email, newPassword) => {
  return new Promise(async(resolve, reject) => {
    try {
      // find user
      const checkU = await checkUserByCredentials(email);
      if (checkU.err) {
        return resolve({err: checkU.err});
      }
      if (!checkU.user) {
        return resolve({err: 'Invalid email'});
      }

      // update user password
      const userInstance = new User();
      const encryptedPassword = userInstance.encryptPassword(newPassword);
      const updateU = await updateUser(checkU.user._id, {'password': encryptedPassword});
      if (updateU.err) {
        return resolve({err: updateU.err});
      }
      resolve({err: null, user: updateU.user});
    }
    catch (e) {
      reject(e);
    }
  });
};

const changePassword = (_user, newPassword) => {
  return new Promise(async(resolve, reject) => {
    try {
      // update user password
      const userInstance = new User();
      const encryptedPassword = userInstance.encryptPassword(newPassword);
      const updateU = await updateUser(_user, {'password': encryptedPassword});
      if (updateU.err) {
        return resolve({err: updateU.err});
      }
      resolve({err: null, user: updateU.user});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  checkUserByCredentials: checkUserByCredentials,
  findUserById: findUserById,
  createNewUser: createNewUser,
  addTeamToHost: addTeamToHost,
  updateUser: updateUser,
  forgotPassword: forgotPassword,
  changePassword: changePassword
};
