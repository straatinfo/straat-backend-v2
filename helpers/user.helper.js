const User = require('../models/User');
const ErrorHelper = require('./error.helper');
const bcrypt = require('bcrypt-nodejs');


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


const checkUserByUNameEmail = (userName, email) => {
  return new Promise((resolve, reject) => {
    User.findOne({$or: [
      { 'email': email },
      { 'username': userName }
    ]}, function (err, user) {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user});
    });
  });
};

// test


const comparePassword = (password, hash) => {
   return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(err, res) {
      if (err) {
        return resolve({err});
      }
      resolve({res});
    });
  });
}



const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, [
      '_id', 'email', 'fname', 'lname', 'gender',
      'houseNumber', 'streetName', 'city', 'state',
      'country', 'postalCode', 'phoneNumber',
      'long', 'lat', 'isBlocked', 'isPatron',
      'hostName', 'username', '_host', 'isVolunteer',
      '_profilePic', 'language'
    ])
    .populate({
      path: '_host',
      select: { _id: 1, hostName: 1, isSpecific: 1, language: true, geoLocation: true, long: true, lat: true },
      populate: {
        path: '_activeDesign',
        populate: {
          path: '_profilePic',
          select: { _id: true, secure_url: true }
        }
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
    // failed to kc userData kunin lang nya ref ng input
    const userData = {
      email: null, username: null, lname: null, fname: null, gender: null,
      houseNumber: null, streetName: null, city: null, state: null,
      country: null, postalCode: null, phoneNumber: null, long: null, lat: null,
      isVolunteer: null, isBlocked: null, _profilePic: null
    };

    // remove empty param
    const toSave = {}
    for (let f in userData) {
      if (input[f]) {
        toSave[f] = input[f]
      }
    }


    User.findByIdAndUpdate(_id, toSave, async (err, user) => {
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
      const updateU = await User.findByIdAndUpdate(checkU.user._id, {'password': encryptedPassword}); // updateUser(checkU.user._id, {'password': encryptedPassword});
      console.log(updateU);
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

const activateUser = (email, newPassword) => {
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
      const updateU = await User.findByIdAndUpdate(checkU.user._id, {'password': encryptedPassword, 'isActivated': true});
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

const deactivateUser = (email) => {
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
      const updateU = await User.findByIdAndUpdate(checkU.user._id, {'password': encryptedPassword, 'isActivated': true});
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
      const updateU = await await User.findByIdAndUpdate(_user, {'password': encryptedPassword, 'isActivated': true});
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

const userModel = function () {
  return User
}

const setActiveTeam = (_user, _team) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_user,
    { _activeTeam: _team },
    (err, user) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: user});
    })
  })
}

module.exports = {
  checkUserByCredentials: checkUserByCredentials,
  findUserById: findUserById,
  createNewUser: createNewUser,
  addTeamToHost: addTeamToHost,
  updateUser: updateUser,
  forgotPassword: forgotPassword,
  changePassword: changePassword,
  addMessageToUser: addMessageToUser,
  removeMessageToUser: removeMessageToUser,
  checkUserByUNameEmail,
  comparePassword,
  activateUser,
  deactivateUser,
  userModel,
  setActiveTeam
};
