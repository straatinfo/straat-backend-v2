const path = require('path');
const fs = require('fs');
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

module.exports = {
  readJsonFile: readJsonFile
};
