const root = require('./root');
const user = require('./user');
const host = require('./host');
const role = require('./role');
const reportType = require('./reportType');
const mainCategory = require('./mainCategory');
const subCategory = require('./subCategory');
const design = require('./design');
const mediaUpload = require('./mediaUpload');
const conversation = require('./conversation');
const message = require('./message');
const team = require('./team');
const teamMember = require('./teamMember');
const teamInvite = require('./teamInvite');
const feedback = require('./feedback');
const report = require('./report');

module.exports = [
  root,
  user,
  host,
  role,
  reportType,
  mainCategory,
  subCategory,
  design,
  mediaUpload,
  conversation,
  message,
  team,
  teamMember,
  teamInvite,
  feedback,
  report
];
