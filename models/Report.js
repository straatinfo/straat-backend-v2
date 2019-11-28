const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  reportCoordinate: {
    type: {type: String, enum: 'Point', default: 'Point'},
    coordinates: { type: [Number], default: [0, 0]}
  },
  unfollow: { user: mongoose.Schema.Types.ObjectId },
  attachments: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload'
  }],
  _reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _reportType: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportType' },
  _mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
  _subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  _conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  teams: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Team' } // used for report type c reporting
  ]
}, { timestamps: true })

reportSchema.index({reportCoordinate: '2dsphere'})
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


module.exports = mongoose.model('Report', reportSchema)
