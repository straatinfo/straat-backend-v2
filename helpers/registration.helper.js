const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const jsonFile = path.join(__dirname, '../assets/jsonfiles/hostcode.json');
const HostHelper = require('../helpers/host.helper')
const CityAreaHelper = require('../helpers/cityarea.helper')

const readJsonFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFile, 'utf-8', function(err, data) {
      if (err) {
        return resolve({err: err});
      }
      const json = JSON.parse(data);
      resolve({err: null, json: json});
    });
  });
};

const getHostId = (code) => {
  return new Promise(async(resolve, reject) => {
    try {
      const json = await readJsonFile();
      if (json.err) {
        resolve({err: json.err});
      }
      const data = _.find(json.json, (d) => {
        return d.code === code;
      });
      if (!data) {
        resolve({err: 'Invalid Code'});
      }
      console.log(data);
      resolve({err: null, _host: data._host});
    }
    catch (e) {
      reject(e);
    }
  });
}

// use by registration validation
const getHostIdByCity = (city, coordinate = {longitude: null, latitude: null}, isCoor = false) => {
  return new Promise(async(resolve, reject) => {
    try {
      

      // get coordinate first
      const datas = await CityAreaHelper.getGeoJson(city.toUpperCase(), 'city', true)
      if (datas.err) {
        // failed to fetch geoJson
        return resolve({err: 'Invalid city'});
      }

      // use coordinate if pass
      const [lng, lat] = isCoor ? [coordinate.longitude, coordinate.latitude] : datas.centralPoint.coordinates
      const area = await HostHelper.getHostByCoordinates({lat, lng})
      if (area.err) {
        // failed to fetch geoJson
        return resolve({err: 'No host available for this city'});
      }

      resolve({err: null, _host: area.hosts._id, coordinates: [lng, lat], area: area });
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  readJsonFile: readJsonFile,
  getHostId: getHostId,
  getHostIdByCity
};
