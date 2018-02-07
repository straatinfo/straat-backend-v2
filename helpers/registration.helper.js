const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const jsonFile = path.join(__dirname, '../assets/jsonfiles/hostcode.json');

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
      resolve({err: null, _host: data._host});
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  readJsonFile: readJsonFile,
  getHostId: getHostId
};
