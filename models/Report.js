const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  generatedReportId: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  long: { type: Number },
  lat: { type: Number },
  note: { type: String },
  status: { type: String, default: 'Unresolved' },
  isVehicleInvolved: { type: Boolean, default: false },
  idPeopleInvolved: { type: Boolean, default: false },
  vehicleInvolvedDescription: { type: String },
  peopleInvolvedCount: { type: Number },
  _reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _reportType: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportType' },
  _mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
  _subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
