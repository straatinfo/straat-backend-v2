const CityList = require('../assets/jsonfiles/NetherlandsCityList')
const _ = require('lodash')
const City = require('../models/City')

const getCityById = (_id) => {
  return new Promise((resolve, reject) => {
    City.findById(_id)
    .exec((err, city) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, city})
    })
  })
}

const getCityByCityName = (city) => {
  const cityName = new RegExp(['^', city, '$'].join(''), 'i')
  return new Promise((resolve, reject) => {
    City.findOne({cityName: cityName})
    .exec((err, city) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, city})
    })
  })
}

const createCity = (input) => {
  return new Promise((resolve, reject) => {
    const newCity = new City(input)
    newCity.save((err, city) => {
      if (err) {
        return resolve({err: err})
      }
      return resolve({err: null})
    })
  })
}

const validateCity = (city) => {
  const cityName = new RegExp(['^', city, '$'].join(''), 'i')
  return new Promise((resolve, reject) => {
    City.findOne({cityName: cityName})
    .exec((err, city) => {
      if (err) {
        return resolve(false)
      }
      if (city) {
        return resolve(true)
      }
      return resolve(false)
    })
  })
}

const getModel = () => {
  return City
}

/**
 * @description migrate json files from asset to db for fast city validation
 * @param {*} islive
 */
const migrateCityJsonToDb = async (islive = false) => {
  if (!islive) {
    // for security
    return Promise.resolve({result: 'did not run'})
  }
  try {
    return Promise.resolve({err: 'sendBasicMail.err'})
  } catch (e) {
    Promise.reject(e)
  }
}

const getUniqueCity = () => {
  console.log('total cities from json: ', CityList.length)

  const cityListOnly = CityList.map(adr => adr.CityName)
  const uniqueCity = _.uniq(cityListOnly)
  console.log('total unique cities: ', uniqueCity.length)

  // get only unique cities from list
  return uniqueCity
}

const cityParse = (cityList, start, logs) => {
  return Promise.all(cityList.map(async (cityName, index) => {
    // search if already saved
    const sch = await getCityByCityName(cityName)
    if (sch.city) {
      logs(index + start, 'failed', cityName, 'aleady')
      return false
    }
    //     logs(index + start, 'success', cityName, 'yes')
    // return true
    const area = await createCity({cityName: cityName})
    if (area.err) {
      logs(index + start, 'failed', cityName, area.err)
      return false
    }
    logs(index + start, 'success', cityName, area.err)
    return true
  }))
}

module.exports = {
  getModel,
  getCityById,
  createCity,
  migrateCityJsonToDb,
  getUniqueCity,
  cityParse,
  validateCity
}
