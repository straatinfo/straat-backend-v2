const HostDB = require('../models/Host')
// const http = require('http')
// const request = require('request')

const create = (data) => {
  return new Promise((resolve, reject) => {
    const host = new HostDB(data)
    host.save((err, report) => {
      if (err) {
        resolve({err: err})
      }

      resolve({data: report})
    })
  })
}

const validateCity = async (city = '') => {

  const cityX = new RegExp(['^', city, '$'].join(''), 'i')
  const host = await HostDB.findOne({cityName: cityX})
  console.log('finding city: ', city)
  return Promise.resolve({err: null, host: host})
}

const toHtml = (hostMigration, color) => {
  return `<h4 style="color:${color}"> ${hostMigration.hostName} : ${hostMigration.cityName}</h4><hr />`
}

const getKey = (hostMigration, key) => {
  return hostMigration.map(host => host[key])
}

module.exports = {
  create,
  toHtml,
  getKey,
  validateCity
}
