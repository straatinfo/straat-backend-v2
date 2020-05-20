const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ReportType = require('./ReportType');
const Conversation = require('./Conversation');

const reportSchema = new Schema({
  generatedReportId: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  long: { type: Number },
  lat: { type: Number },
  note: { type: String },
  status: { type: String, enum: [ 'NEW', 'INPROGRESS', 'DONE', 'EXPIRED'], default: 'NEW' },
  isUrgent: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: false },
  isInMap: { type: Boolean, default: true },
  isVehicleInvolved: { type: Boolean, default: false },
  vehicleInvolvedCount: { type: Number, default: 0 },
  vehicleInvolvedDescription: { type: String, default: '' },

  isPeopleInvolved: { type: Boolean, default: false },
  peopleInvolvedCount: { type: Number, default: 0 },
  peopleInvolvedDescription: { type: String, default: '' },

  finishedDate: { type: Date },
  causeOfFinished: { type: String },
  softRemoved: { type: Boolean, default: false },
  geoLocation: {
    type: {type: String, enum: 'Point', default: 'Point'},
    coordinates: { type: [Number], default: [0, 0]}
  },
  attachments: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload'
  }],
  _reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'Host' },
  _reportType: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportType' },
  _mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
  _subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  _conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  teams: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Team' } // used for report type c reporting
  ]
}, { timestamps: true })

reportSchema.index({geoLocation: '2dsphere'})
// will contiue later
// reportSchema.statics.Filter = function (filter, isMinify = true, cb) {
//   if (isMinify) {
//     return this.find(filter, {_id: true, name: true, description: true})
//     .populate('subCategories', ['_id', 'name', 'description'])
//     .populate('_reportType', ['_id', 'code', 'name', 'description'])
//   }
//   return this.find(filter)
//     .populate(['subCategories', '_reportType'])
// }


reportSchema.pre('save', async function () {

  const reportType = await ReportType.findById(this._reportType);
  const date = new Date()
  const monthstr = '' + (date.getMonth() + 1)
  const monthPad = '00'
  const datestr = '' + date.getDate()
  const datePad = '00'
  const dateFormat = datePad.substring(0, datePad.length - datestr.length) + datestr
  const monthFormat = monthPad.substring(0, monthPad.length - monthstr.length) + monthstr
  const dateString = date.getFullYear() + '' + monthFormat + '' + dateFormat
  const reportCount = await getReportDateRange(date);
  const str = '' + (reportCount + 1);
  const pad = '00000'
  const countFormat = pad.substring(0, pad.length - str.length) + str
  const generatedReportId = reportType.code + dateString + '_' + countFormat
  
  if (!Array.isArray(this.attachments)) this.attachments = [];
  this.generatedReportId = generatedReportId;

  this.geoLocation = {
    type: 'Point',
    coordinates: [this.long, this.lat]
  };

  const conversation = await Conversation.create({});

  this._conversation = conversation._id;
});

const Report = mongoose.model('Report', reportSchema);

function getReportDateRange (date) {
  let lesYear = date.getFullYear()
  let lesMont = date.getMonth() + 1
  let lesDate = date.getDate()

  date.setDate(date.getDate() + 1)
  let gtrYear = date.getFullYear()
  let gtrMont = date.getMonth() + 1
  let gtrDate = date.getDate()

  return Report.countDocuments({
    $and: [
      { createdAt: { $gte: lesYear + '-' + lesMont + '-' + lesDate } },
      { createdAt: { $lte: gtrYear + '-' + gtrMont + '-' + gtrDate } }
    ]
  });
}

module.exports = Report;
