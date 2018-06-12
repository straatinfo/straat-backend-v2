
const CityHelper = require('../helpers/city.helper')
const _ = require('lodash')

const htmlAreas = (data) => {
  return `${data.i}\t: ${data.status}\t :${data.CityName}\t \t \t: ${data.message}\n`
}

const htmlInit = (res) => {
  res.write(`-index--:-status\t-:- City Name ----------------\n`)
  res.write(`--------:------------------------------\n`)
}

const htmlLogs = (res, i = 0, status = false, city = null, message = null) => {
  res.write(`${i}\t: ${status}\t :${city}\t: ${message}\n`)
}

const migrate = async (req, res, next) => {
  const logs = (i = 0, status = false, city = null, message = null) => {
    htmlLogs(res, i, status, city, message)
  }
  try {
    return false // dont run until db is empty
    // already in db
    htmlInit(res)
    const getUniqueCity = CityHelper.getUniqueCity()

    for (let counter = 0; getUniqueCity.length > counter; counter = counter + 100) {
      await CityHelper.cityParse(getUniqueCity.slice(counter, counter + 100), counter, logs)
    }
  } catch (e) {
    console.log(e.message)
    return res.send(e)
  }
  return res.end('')
}

const printCityList = async (req, res, next) => {
  try {
    const getUniqueCity = CityHelper.getUniqueCity()

    for (let counter = 0; getUniqueCity.length > counter; counter++) {
      res.write(`${counter + 1}\t:${getUniqueCity[counter]}\n`)
    }
  } catch (e) {
    return res.send(e)
  }
  return res.end('')
}

const validateCity = async function (req, res, next) {
  const { city } = req.params
  const result = await CityHelper.validateCity(city)
  res.send(result)
}

module.exports = {
  migrate,
  printCityList,
  validateCity
}
