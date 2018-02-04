module.exports = {
  DATA_BASE: process.env.DATA_BASE || 'mongodb://localhost:27017/straat',
  SESSION_SECRET: process.env.SESSION_SECRET || 'mysupersecretkey',
}