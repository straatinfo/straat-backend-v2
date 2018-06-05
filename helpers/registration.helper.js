const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const jsonFile = path.join(__dirname, '../assets/jsonfiles/hostcode.json')
const HostHelper = require('../helpers/host.helper')
const CityAreaHelper = require('../helpers/cityarea.helper')
const HostMigrationelper = require('../helpers/hostMigration.helper')
const L = require('./../assets/dictionary')
const CityHelper = require('../helpers/city.helper')

const readJsonFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFile, 'utf-8', function (err, data) {
      if (err) {
        return resolve({err: err})
      }
      const json = JSON.parse(data)
      resolve({err: null, json: json})
    })
  })
}

const getHostId = (code) => {
  return new Promise(async(resolve, reject) => {
    try {
      const json = await readJsonFile()
      if (json.err) {
        resolve({err: json.err})
      }
      const data = _.find(json.json, (d) => {
        return d.code === code
      })
      if (!data) {
        resolve({err: 'Invalid Code'})
      }
      console.log(data)
      resolve({err: null, _host: data._host})
    } catch (e) {
      reject(e)
    }
  })
}

// use by registration validation
// it used gps
// const getHostIdByCity = (city, coordinate = {longitude: null, latitude: null}, isCoor = false) => {
//   return new Promise(async(resolve, reject) => {
//     try {

//       // get coordinate first
//       const datas = await CityAreaHelper.getGeoJson(city.toUpperCase(), 'city', true)
//       if (datas.err) {
//         // failed to fetch geoJson
//         return resolve({err: 'Invalid city'});
//       }

//       // use coordinate if pass
//       const [lng, lat] = isCoor ? [coordinate.longitude, coordinate.latitude] : datas.centralPoint.coordinates
//       const area = await HostHelper.getHostByCoordinates({lat, lng})
//       if (area.err) {
//         // failed to fetch geoJson
//         return resolve({err: 'No host available for this city'});
//       }

//       resolve({err: null, _host: area.hosts._id, coordinates: [lng, lat], area: area });
//     }
//     catch (e) {
//       reject(e);
//     }
//   });
// }

// will be changed by hostname from googleAPI
// const getHostIdByCity = (city, coordinate = {longitude: null, latitude: null}, isCoor = false) => {
//   return new Promise(async(resolve, reject) => {
//     try {
//       const cityName = city.toUpperCase ? city.toUpperCase() : ''
//       // get coordinate first
//       const datas = await HostMigrationelper.validateCity(cityName)
//       if (datas.err || !datas.host) {
//         return resolve({err: 'Invalid city'})
//       }

//       // for tet
//       // host List
//       // const hosts = await HostHelper.getHosts()
//       // console.log('hosts: ', hosts)

//       // get host by city
//       const host = await HostHelper.getHostByCity(cityName)
//       if (host.err || !host.hosts) {
//         return resolve({err: 'No host available for this city'})
//       }
//       resolve({err: null, _host: host.hosts._id, coordinates: [0, 0]})
//     }
//     catch (e) {
//       console.log(e)
//       reject(e)
//     }
//   })
// }

// city, coordinate = {longitude: null, latitude: null}, isCoor = false, hostName
const getHostIdByCity = (params) => {
  const { city, language } = params
  return new Promise(async(resolve, reject) => {
    try {
      const cityName = city.toUpperCase ? city.toUpperCase() : ''
      const datas = await CityHelper.validateCity(cityName)
      if (!datas) {
        return resolve({err: L(language, 'invalidCity')})
      }

      // get host name | get data from google api
      const {hostName, err} = await CityAreaHelper.getHostNameByAddress(cityName)
      if (err) {
        return resolve({err: L(language, 'noHostNameForThatAddress')})
      }

      // get host base on hostName
      const host = await HostHelper.getHostByHostName(hostName)
      if (host.err || !host.host) {
        return resolve({err: L(language, 'noHostAvailableForThisAddress')})
      }
      return resolve({host: host.host, _host: host.host._id})
    } catch (e) {
      reject(e)
    }
  })
}



const validatePostalCode = (postalCode) => {
  return new Promise(async(resolve, reject) => {
    try {
      const postcodeData = await CityAreaHelper.validatePostalCode(postalCode)
      if (postcodeData.err) {
        return resolve({err: 'Invalid postalCode'})
      }
      resolve(postcodeData)
    }
    catch (e) {
      console.log(e)
      reject(e)
    }
  })
}

const validateNumber = (postalCode, number) => {
  return new Promise(async(resolve, reject) => {
    try {
      const postcodeData = await CityAreaHelper.validateNumber(postalCode, number)
      if (postcodeData.err) {
        return resolve({err: 'Invalid address'})
      }

      // no error
      console.log('postcodeData', postcodeData)
      resolve({...postcodeData, _host: 'test host'})
    }
    catch (e) {
      console.log(e) 
      reject(e)
    }
  })
}


module.exports = {
  readJsonFile: readJsonFile,
  getHostId: getHostId,
  getHostIdByCity,
  validatePostalCode,
  validateNumber
}