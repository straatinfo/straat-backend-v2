const CityArea = require('../models/CityArea')
const http = require('http')
const request = require('request')
/**
 *
 * @description create new city area
 * @param { address, display_name, geometries, centralPoint: {latitude, longitude}, osm_id, place_id, type, cityName } data
 *
 */
const create = (data) => {
  return new Promise((resolve, reject) => {
    const { address, display_name, geometries, centralPoint: {latitude, longitude}, osm_id, place_id, type, cityName } = data
    const name = display_name.split(', ')[0]
    const area = new CityArea(data)

    area.save((err) => {
      if (err) {
        return resolve({err: err})
      }
      return resolve({area: area})
    })
  })
}

/**
 *
 * @description find area scope using lng, lat
 * @param {lng, lat} data
 *
 */
const searchIntersect = (latlng, options) => {
  return new Promise((resolve, reject) => {
    const {lat, lng } = latlng
    CityArea.findOne({...options,
      geojson: {$geoIntersects: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        }
      }}
    }, {geojson: false}, (err, record) => {
      if (err) {
        return resolve({err: err})
      }
      return resolve({area: record})
    })
  })
}

/**
 *
 * @description find nearest area by lng, lat
 * @param {lng, lat} data
 *
 */
const searchNear = (latlng, options) => {
  return new Promise((resolve, reject) => {
    const {lat, lng } = latlng
    CityArea.findOne({...options,
      centralPoint: {$near: {
        $geometry: {
          type: 'Point',
          coordinates: [ parseFloat(lng), parseFloat(lat) ]
        }
      }}
    }, {geojson: false}, (err, record) => {
      if (err) {
        return resolve({err: err})
      }
      return resolve({area: record})
    })
  })
}
/**
 * @description filter nominatim result
 * @param {} nominatim
 *
 */
const filterGeoJson = (result = [], bound = 'city') => {
  return result.find((nomi) => {
    if (nomi.address && (nomi.address.county || nomi.address.city || !nomi.address.suburb || !nomi.address.village || !nomi.address.hamlet) && nomi.class === 'boundary') {
      return true
    } else {
      return false
    }
  })
}

/**
 *
 * @description get geojson from neo
 * @param {*} bound - 'city' & 'county'
 */

const getGeoJson = (city, bound = 'city') => {
  return new Promise((resolve, reject) => {
    const options = {
      // url: 'https://nominatim.openstreetmap.org/search/' + city + '?polygon_geojson=1&limit=1&addressdetails=1&format=json&countrycodes=NL,PH',
      url: bound === 'city' ? 'https://nominatim.openstreetmap.org/search/?polygon_geojson=1&addressdetails=1&format=json&countrycodes=NL,PH&city=' + city
                            : 'https://nominatim.openstreetmap.org/search/' + city + '?polygon_geojson=1&limit=1&addressdetails=1&format=json&countrycodes=NL,PH',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'nominatim.openstreetmap.org',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36'
      }
    }
    try {
      request.get(options, function (error, response, body) {
        if (error) {
          console.log('error in : ' + city, error)
          return resolve({err: 'no data in: ' + city})
          //throw new Error(error)
        }

        const result = filterGeoJson(JSON.parse(body), bound)

        if (!result) {
          return resolve({err: 'no data in: ' + city})
         // throw new Error(' ')
        }

        if (!error && response.statusCode === 200) {
          // success here
          // when come here that means it has atleast 1 record
          console.log('result', result)
          const {address, display_name, geojson, lat, lon, osm_id, place_id, type} = result
          return resolve({ name: display_name.split(', ')[0], address_json: address, display_name, geojson, centralPoint: {type: 'Point', coordinates: [ parseFloat(lon), parseFloat(lat) ]}, osm_id, place_id, type, cityName: city })
        }
        throw new Error(' ')
      })
    } catch (e) {
      //   return resolve({err: 'no data in: ' + city})
      console.log('error in : ' + city, e)
      return resolve({err: 'no data in: ' + city})
    }
  })
}

module.exports = {
  create,
  searchIntersect,
  searchNear,
  getGeoJson
}
