const Socket = require('../models/Socket');

const findSocket = () => {
  return new Promise((resolve, reject) => {
    Socket.find({})
    .populate('_user', [
      '_id', 'email', 'fname', 'lname', 'gender',
      'houseNumber', 'streetName', 'city', 'state',
      'country', 'postalCode', 'phoneNumber',
      'long', 'lat', 'isBlocked',
      'hostName', 'username', '_host', 'isVolunteer',
      'picUrl', 'picSecuredUrl'
    ])
    .exec((err, sockets) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, sockets: sockets});
    });
  });
}

const findSocketByUser = (_user) => {
  return new Promise((resolve, reject) => {
    Socket.findOne({'_user': _user}, (err, socket) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, socket: socket});
    });
  });
};

// find user socket if non then create, if find then update(new socket ID, because socket id is dynamic)
// as of this code only one session is allowed
const findSocketByUserAndUpdate = (_user, _socket) => {
  return new Promise((resolve, reject) => {
    Socket.findOneAndUpdate({_user}, {$set:{_socket}}, {new: true}, (err, socket) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, socket: socket});
    });
  });
};
const findSocketByUserUnfilx = (_user) => {
  return new Promise((resolve, reject) => {
    Socket.findOne({'_user': _user}, (err, socket) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, socket: socket});
    });
  });
};

const findSocketById = (_id) => {
  return new Promise((resolve, reject) => {
    Socket.findById(_id, (err, socket) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, socket: socket});
    });
  });
};

const findSocketBySocketId = (_socket) => {
  return new Promise((resolve, reject) => {
    Socket.findOne({'_socket': _socket}, (err, socket) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, socket: socket});
    });
  });
}

const registerSocket = (_socket, _user) => {
  return new Promise((resolve, reject) => {
    const newSocket = new Socket({'_socket': _socket, '_user': _user});
    newSocket.save((err, socket) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, socket: socket});
    });
  });
}

const updateSocket = (_socket, _user) => {
  return new Promise((resolve, reject) => {
    Socket.findOneAndUpdate({'_user': _user}, {'_socket': _socket}, (err, socket) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, socket: socket});
    });
  });
};

const removeSocket = (_socket) => {
  return new Promise((resolve, reject) => {
    Socket.findOneAndRemove({'_socket': _socket}, (err, socket) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, socket: socket});
    });
  });
}

module.exports = {
  findSocketById: findSocketById,
  registerSocket: registerSocket,
  removeSocket: removeSocket,
  updateSocket: updateSocket,
  findSocketByUser: findSocketByUser,
  findSocketByUserAndUpdate,
  findSocketBySocketId: findSocketBySocketId,
  findSocket: findSocket
};
