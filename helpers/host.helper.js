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
        'city', 'state', 'country', 'postalCode', 'username',
        'phoneNumber', 'long', 'lat', 'isPatron', 'email',
        'lname', 'fname', 'hostPersonalEmail'
      ])
      .populate('_role')
      .populate('designs')
      .populate('teams')
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
        'city', 'state', 'country', 'postalCode', 'username',
        'phoneNumber', 'long', 'lat', 'isPatron', 'email',
        'lname', 'fname', 'hostPersonalEmail'
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
    User.findById(_id)
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
    User.findByIdAndUpdate(_id, {...input}, async(err, host) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const getH = await getHostById(_id);
        if (getH.err) {
          return resolve({err: getH.err});
        }
        resolve({err: null, host: getH.host});
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
        const getH = await getHostById(newUser._id);
        console.log(getH);
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

const getFreeHost = () => {
  return new Promise((resolve, reject) => {
    User.findOne({'hostName': 'freeHost'}, [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .populate('_role')
    .populate({
      path: 'mainCategories',
      populate: {
        path: 'subCategories'
      }
    })
    .populate('design')
    .exec((err, host) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, host: host});
    });
  });
};

const updateHostReport = (_host, _report) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_host,
    { '$addToSet': { 'hostReports': _report } },
    { 'new': true, 'upsert': true },
    (err, user) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: user});
    });
  });
};

const flatHost = (h) => {
  return new Promise((resolve, reject) => {
    try {
      const flattenHost = {
        _id: h._id || '',
        hostName: h.hostName || '',
        email: h.email || '',
        username: h.username || '',
        streetName: h.streetName || '',
        city: h.city || '',
        country: h.country || '',
        postalCode: h.postalCode || '',
        phoneNumber: h.phoneNumber || '',
        '_role._id': (h._role && h._role._id) ? h._role._id : null,
        '_role.name': (h._role && h._role.name) ? h._role.name : '',
        '_role.code': (h._role && h._role.code) ? h._role.code : '',
        '_role.accessLevel': (h._role && h._role.accessLevel) ? h._role.accessLevel : null,
        long: h.long || null,
        lat: h.lat || null,
        designs: h.designs || [],
        teams: h.teams || [],
        isPatron: h.isPatron || false
      };
      resolve({err: null, host: flattenHost});
    }
    catch (e) {
      reject(e);
    }
  });
};

/* 

  "designs": [],
  "teams": [],
  "isPatron": false
*/

module.exports = {
  getHostById: getHostById,
  getHosts: getHosts,
  getHostWithinRadius: getHostWithinRadius,
  updateHost: updateHost,
  deleteHost: deleteHost,
  createHost: createHost,
  createHostLoop: createHostLoop,
  getFreeHost: getFreeHost,
  updateHostReport: updateHostReport,
  flatHost: flatHost
};
