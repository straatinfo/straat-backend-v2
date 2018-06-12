const fs = require('fs');
const stream = require('stream');
const highland = require('highland');
 
module.exports = function (FILE_PATH) {
  const myFunction = function (x) {
    return highland(fs.createReadStream(FILE_PATH, 'utf8')).split().head().map(y => {
      return y.split(',').reduce((a, b, i) => {
        return {...a, [b]: x[i]};
      }, {});
    });
  };
  return highland(fs.createReadStream(FILE_PATH, 'utf8'))
  .split()
  .map(x => x.split(','))
  .flatMap(myFunction)
}
