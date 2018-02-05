const User = require('../models/User');
const RoleHelper = require('../helpers/role.helper');

const getHosts = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const getRole = await RoleHelper.getRoleByCode('HOST');
      if (getRole.err) {
        return resolve({err: getRole.err});
      }
      const _role = getRole.role._id;
      User.find({'_role': _role}, [
        '_id', 'hostName', 'houseNumber', 'streetName',
        'city', 'state', 'country', 'postalCode',
        'phoneNumber', 'long', 'lat', 'isPatron'
      ])
      .populate('_role')
      .populate('design')
      .exec((err, hosts) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, hosts: hosts});
      });
    }
    catch (e) {
      reject(e);
    }
  });
};

const getHostWithinRadius = (long, lat, radius) => {
  return new Promise(async(resolve, reject) => {
    try {
      const longOffsetMax = parseFloat(long) + parseFloat(radius);
      const longOffsetMin = parseFloat(long) - parseFloat(radius);
      const latOffsetMax = parseFloat(lat) + parseFloat(radius);
      const latOffsetMin = parseFloat(lat) - parseFloat(radius);
      const getRole = await RoleHelper.getRoleByCode('HOST');
      if (getRole.err) {
        return resolve({err: getRole.err});
      }
      const _role = getRole.role._id;
      User.find({
        $and: [
          {'_role': _role},
          {
            $or: [
              {
                $and: [
                  { 'long': { $gte: longOffsetMin } },
                  { 'long': { $lte: longOffsetMax } }
                ],
                $and: [
                  { 'lat': { $gte: latOffsetMin } },
                  { 'lat': { $lte: latOffsetMax } }
                ]
              }
            ]
          }
        ]
      }, [
        '_id', 'hostName', 'houseNumber', 'streetName',
        'city', 'state', 'country', 'postalCode',
        'phoneNumber', 'long', 'lat'
      ])
      .populate('_role')
      .populate('design')
      .exec((err, hosts) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, hosts: hosts});
      });

    }
    catch (e) {
      reject(e);
    }
  });
};

const getHostById = (_id) => {
  return new Promise((resolve, reject) => {
    User.find(_id)
    .populate('_role')
    .populate('design')
    .exec((err, host) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, host: host});
    });
  });
};

const updateHost = (_id, input) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_id, input, async(err, host) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const getH = await getHostById(_id);
        if (getH.err) {
          return resolve({err: getHerr});
        }
        const host = getH.role;
        resolve({err: null, host: host});
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const deleteHost = (_id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndRemove(_id, (err, host) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, host: host});
    });
  });
};

const createHost = (input) => {
  return new Promise(async(resolve, reject) => {
    try {
      const getRole = await RoleHelper.getRoleByCode('HOST');
      if (getRole.err) {
        return resolve({err: getRole.err});
      }
      _role = getRole.role._id;
      const newUser = new User({...input, '_role': _role});
      newUser.save(async(err, host) => {
        if (err) {
          return resolve({err: err});
        }
        const getH = await getHostById(newUser._role);
        if (getH.err) {
          return resolve({err: getH.err});
        }
        resolve({err: null, host: getH.host});
      });
    }
    catch (e) {
      reject(e);
    }
  });
};

const createHostLoop = (dataArray=[], promiseFunction = createHost) => {
  return new Promise(async(resolve, reject) => {
    let err = [], success = [];
    try {
      const create = await Promise.all(dataArray.map(async (d) => {
        try {
          const newCreate = await promiseFunction(d);
          if (newCreate.err) {
            return err.push(newCreate.err);
          }
          success.push(newCreate.host);
        }
        catch (e) {
          err.push(e);
        }
      }));
      resolve({err: err, success: success});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getHostById: getHostById,
  getHosts: getHosts,
  getHostWithinRadius: getHostWithinRadius,
  updateHost: updateHost,
  deleteHost: deleteHost,
  createHost: createHost,
  createHostLoop: createHostLoop
};
