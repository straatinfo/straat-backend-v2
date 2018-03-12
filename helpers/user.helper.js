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
      '_profilePic'
    ])
    .populate({
      path: '_host',
      select: { '_id': 1, 'hostName': 1, 'isSpecific': 1 },
      populate: {
        path: '_activeDesign'
      }
    })
    // .populate({
    //   path: '_activeTeam',
    //   populate: [{path: 'teamMembers'}, {path: 'teamLeaders'}]
    // })
    .populate('_activeTeam')
    .populate('_role')
    .populate('_profilePic')
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
    User.findByIdAndUpdate(_id, input, async (err, user) => {
      try {
        if (err) {
          return resolve({err: err});
        }
        if (!user) {
          return resolve({err: 'Invalid User ID'});
        }
        const getUserD = await findUserById(user._id);
        if (getUserD.err) {
          return resolve({err: getUserD.err});
        }
        resolve({err: null, user: getUserD.user});
      }
      catch (e) {
        reject(e);
      }
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

const addMessageToUser = (_user, _message) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_user,
    { '$addToSet': { 'messages': _message } },
    { 'new': true, 'upsert': true },
    (err, user) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: user});
    });
  });
};

const removeMessageToUser = (_user, _message) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_user,
    { '$pop': { 'messages': _message } },
    (err, user) => {
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
  createNewUser: createNewUser,
  addTeamToHost: addTeamToHost,
  updateUser: updateUser,
  forgotPassword: forgotPassword,
  changePassword: changePassword,
  addMessageToUser: addMessageToUser,
  removeMessageToUser: removeMessageToUser
};
