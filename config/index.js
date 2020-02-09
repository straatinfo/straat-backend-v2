const config = require('../config/' + process.env.NODE_ENV || 'defaults');
const defaults = require('./defaults');

module.exports = Object.assign(defaults, config);
