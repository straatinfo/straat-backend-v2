const User = require('../models/User')
const RoleHelper = require('../helpers/role.helper')
const CityAreaHelper = require('../helpers/cityarea.helper')
const CityArea = require('../models/CityArea')
const _ = require('lodash')
const isValidCoordinates = require('is-valid-coordinates')

const getHosts = () => {
  return new Promise(async(resolve, reject) => {
    try {
      // isa to sa mag papatagal, tutal naka seed nmn yung host role db, dapat constant nalang naten un role id para di na mag search
      const getRole = await RoleHelper.getRoleByCode('HOST')
      if (getRole.err) {
        return resolve({err: getRole.err})
      }
      const _role = getRole.role._id
      User.find({'_role': _role, 'softRemoved': false}, [
        '_id', 'hostName', 'houseNumber', 'streetName', 'state',
        'city', 'state', 'country', 'postalCode', 'username',
        'phoneNumber', 'long', 'lat', 'isPatron', 'email',
        'lname', 'fname', 'hostPersonalEmail', 'isSpecific',
        'isActivated'
      ])
      .populate('_activeDesign')
      .populate('_role')
      .populate('designs')
      .populate('teams')
      .exec((err, hosts) => {
        if (err) {
          return resolve({err: err})
        }
        const filteredHost = _.filter(hosts, (h) => {
          return h.hostName !== 'freeHost'
        })
        resolve({err: null, hosts: filteredHost})
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getHostCities = () => {
  return new Promise(async(resolve, reject) => {
    try {
      // isa to sa mag papatagal, tutal naka seed nmn yung host role db, dapat constant nalang naten un role id para di na mag search
      const getRole = await RoleHelper.getRoleByCode('HOST')
      if (getRole.err) {
        return resolve({err: getRole.err})
      }
      const _role = getRole.role._id
      User.find({'_role': _role, 'softRemoved': false}, {_id: true, city: true, hostName: true})
      .exec((err, hosts) => {
        if (err) {
          return resolve({err: err})
        }
        const filteredHost = _.filter(hosts, (h) => {
          return h.hostName !== 'freeHost'
        })
        resolve({err: null, hosts: filteredHost})
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getHostWithinRadius = (long, lat, radius) => {
  return new Promise(async(resolve, reject) => {
    try {
      const longOffsetMax = parseFloat(long) + parseFloat(radius)
      const longOffsetMin = parseFloat(long) - parseFloat(radius)
      const latOffsetMax = parseFloat(lat) + parseFloat(radius)
      const latOffsetMin = parseFloat(lat) - parseFloat(radius)
      const getRole = await RoleHelper.getRoleByCode('HOST')
      if (getRole.err) {
        return resolve({err: getRole.err})
      }
      const _role = getRole.role._id
      User.find({
        $and: [
          {'_role': _role, 'softRemoved': false},
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
        '_id', 'hostName', 'houseNumber', 'streetName', 'state',
        'city', 'state', 'country', 'postalCode', 'username',
        'phoneNumber', 'long', 'lat', 'isPatron', 'email',
        'lname', 'fname', 'hostPersonalEmail', 'isSpecific',
        'isActivated'
      ])
      .populate('_activeDesign')
      .populate('_role')
      .populate('design')
      .exec((err, hosts) => {
        if (err) {
          return resolve({err: err})
        }
        const filteredHost = _.filter(hosts, (h) => {
          return h.hostName !== 'freeHost'
        })
        resolve({err: null, hosts: filteredHost})
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getHostById = (_id) => {
  return new Promise((resolve, reject) => {
    User.findById(_id)
    .populate('_activeDesign')
    .populate('_role')
    .populate('design')
    .exec((err, host) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, host: host})
    })
  })
}

const updateHost = (_id, input) => {
  return new Promise((resolve, reject) => {
    const hostData = {
      email, username, lname, fname, hostPersonalEmail, houseNumber, city, state, streetName, country, postalCode, phoneNumber, long, lat
    } = input

    input.geoLocation = {
      type: 'Point',
      coordinates: [long, lat]
    };
    User.findByIdAndUpdate(_id, hostData, async(err, host) => {
      if (err) {
        return resolve({err: err})
      }
      try {
        const getH = await getHostById(_id)
        if (getH.err) {
          return resolve({err: getH.err})
        }
        resolve({err: null, host: getH.host})
      } catch (e) {
        reject(e)
      }
    })
  })
}

const deleteHost = (_id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_id, {'softRemoved': true}, (err, host) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, host: host})
    })
  })
}

const createHost = (input) => {
  return new Promise(async(resolve, reject) => {
    try {
      const getRole = await RoleHelper.getRoleByCode('HOST')
      if (getRole.err) {
        return resolve({err: getRole.err})
      }
      _role = getRole.role._id
      const newUser = new User({
        ...input,
        geoLocation: {
          type: 'Point',
          coordinates: [input.long || 0, input.lat || 0]
        }
        , '_role': _role})
      newUser.save(async(err, host) => {
        if (err) {
          return resolve({err: err})
        }
        const getH = await getHostById(newUser._id)
        console.log(getH)
        if (getH.err) {
          return resolve({err: getH.err})
        }
        resolve({err: null, host: getH.host})
      })
    } catch (e) {
      reject(e)
    }
  })
}

const createHostLoop = (dataArray = [], promiseFunction = createHost) => {
  return new Promise(async(resolve, reject) => {
    let err = [], success = []
    try {
      const create = await Promise.all(dataArray.map(async (d) => {
        try {
          const newCreate = await promiseFunction(d)
          if (newCreate.err) {
            return err.push(newCreate.err)
          }
          success.push(newCreate.host)
        } catch (e) {
          err.push(e)
        }
      }))
      resolve({err: err, success: success})
    } catch (e) {
      reject(e)
    }
  })
}

const getFreeHost = () => {
  return new Promise((resolve, reject) => {
    User.findOne({'hostName': 'freeHost'}, [
      '_id', 'hostName', 'houseNumber', 'streetName', 'state',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email',
      'lname', 'fname', 'hostPersonalEmail', 'isSpecific',
      'isActivated'
    ])
    .populate('_role')
    .populate({
      path: 'mainCategories',
      populate: {
        path: 'subCategories'
      }
    })
    .populate('_activeDesign')
    .populate('design')
    .exec((err, host) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, host: host})
    })
  })
}

const updateHostReport = (_host, _report) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_host,
    { '$addToSet': { 'hostReports': _report } },
    { 'new': true, 'upsert': true },
    (err, user) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, user: user})
    })
  })
}

const flatHost = (h) => {
  return new Promise(async(resolve, reject) => {
    try {
      const flattenHost = {
        _id: h._id || null,
        hostName: h.hostName || null,
        hostAlternateName: h.hostAlternateName || null,
        email: h.email || null,
        username: h.username || null,
        streetName: h.streetName || null,
        city: h.city || null,
        country: h.country || null,
        state: h.state || null,
        postalCode: h.postalCode || null,
        phoneNumber: h.phoneNumber || null,
        houseNumber: h.houseNumber || null,
        '_role._id': (h._role && h._role._id) ? h._role._id : null,
        '_role.name': (h._role && h._role.name) ? h._role.name : null,
        '_role.code': (h._role && h._role.code) ? h._role.code : null,
        '_role.accessLevel': (h._role && h._role.accessLevel) ? h._role.accessLevel : null,
        lname: h.lname || null,
        fname: h.fname || null,
        hostPersonalEmail: h.hostPersonalEmail || null,
        long: h.long || null,
        lat: h.lat || null,
        designs: h.designs || [],
        teams: h.teams || [],
        isPatron: h.isPatron || false,
        isActivated: h.isActivated || false,
        isSpecific: h.isSpecific || false,
        language: h.language || null,
        '_activeDesign._id': (h._activeDesign && h._activeDesign._id) ? h._activeDesign._id : null,
        '_activeDesign.designName': (h._activeDesign && h._activeDesign.designName) ? h._activeDesign.designName : null,
        '_activeDesign.colorOne': (h._activeDesign && h._activeDesign.colorOne) ? h._activeDesign.colorOne : null,
        '_activeDesign.colorTwo': (h._activeDesign && h._activeDesign.colorTwo) ? h._activeDesign.colorTwo : null,
        '_activeDesign.colorThree': (h._activeDesign && h._activeDesign.colorThree) ? h._activeDesign.colorThree : null,
        '_activeDesign.colorFour': (h._activeDesign && h._activeDesign.colorFour) ? h._activeDesign.colorFour : null,
        '_activeDesign.url': (h._activeDesign && h._activeDesign.url) ? h._activeDesign.url : null,
        '_activeDesign.secure_url': (h._activeDesign && h._activeDesign.secure_url) ? h._activeDesign.secure_url : null
      }
      resolve({err: null, host: flattenHost})
    } catch (e) {
      reject(e)
    }
  })
}

/**
 *
 * @description get host object by lat lang
 *              must transform string address to specific coordinate in client
 * @param {lat, lng} latlng
 *
 */

const getHostByCoordinates = async (latlng) => {
  return new Promise(async(resolve, reject) => {
    // get specifc host first if none then get nearest host
    try {
      const {lat, lng } = latlng
      if (!isValidCoordinates(parseFloat(lng), parseFloat(lat))) {
        throw new Error('not valid coordinate')
      }
      const hosts = await getHostCities()
      if (hosts.err) {
        return resolve({err: hosts.err})
      }
      const hostList = hosts.hosts.filter((h, i) => h.city ? h.city : false)
      const activeHosts = hostList.map((h, i) => h.city.toUpperCase())
      const specificHost = await CityAreaHelper.searchIntersect(latlng, {cityName: {$in: activeHosts}})
      console.log('hostList', hostList)
        // no specific host - must find nearest host
      if (!specificHost.area) {
        const nearHost = await CityAreaHelper.searchNear(latlng, {cityName: {$in: activeHosts}})
          // console.log('nearHost', nearHost)
        return resolve({err: null, hosts: hostList.find((h, i) => h.city.toUpperCase() === nearHost.area.cityName.toUpperCase())})
      }
      if (specificHost.err) {
        return resolve({err: specificHost.err})
      }

      return resolve({err: null, hosts: hostList.find((h, i) => h.city.toUpperCase() === specificHost.area.cityName.toUpperCase())})
    } catch (e) {
      return resolve({err: e.message})
    }
  })
}

const getHostByCity = async (cityName) => {
  return new Promise(async(resolve, reject) => {

    // get specifc host first if none then get nearest host
    try {
      const cityX = new RegExp(['^', cityName, '$'].join(''), 'i')
      const getRole = await RoleHelper.getRoleByCode('HOST')
      console.log('getRole: ', getRole)
      if (getRole.err) {
        return resolve({err: getRole.err})
      }
      const _role = getRole.role._id
      const host = await User.findOne({'_role': _role, 'softRemoved': false, city: cityX}, {_id: true, city: true, hostName: true})

      return resolve({err: null, hosts: host})


      // const specificHost = await CityAreaHelper.searchIntersect(latlng, {cityName: {$in: activeHosts}})
      // console.log('hostList', hostList)
      //   // no specific host - must find nearest host
      // if (!specificHost.area) {
      //   const nearHost = await CityAreaHelper.searchNear(latlng, {cityName: {$in: activeHosts}})
      //     // console.log('nearHost', nearHost)
      //   return resolve({err: null, hosts: hostList.find((h, i) => h.city.toUpperCase() === nearHost.area.cityName.toUpperCase())})
      // }
      // if (specificHost.err) {
      //   return resolve({err: specificHost.err})
      // }

      // return resolve({err: null, hosts: hostList.find((h, i) => h.city.toUpperCase() === specificHost.area.cityName.toUpperCase())})
    } catch (e) {
      return resolve({err: e.message})
    }
  })
}

const getHostByHostName = (_hostName) => {
  return new Promise((resolve, reject) => {
    const hostName = new RegExp(['^', _hostName, '$'].join(''), 'i')
    User.findOne({hostName: hostName}, {language: true, isSpecific: true, hostName: true})
    .populate('_activeDesign')
    .exec((err, host) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, host: host})
    })
  })
}

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
  flatHost: flatHost,
  getHostByCoordinates,
  getHostByCity,
  getHostByHostName
}
