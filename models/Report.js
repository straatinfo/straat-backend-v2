const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  generatedReportId: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  long: { type: Number },
  note: { type: String },
  status: { type: String, default: 'Unresolved' },
  isVehicleInvolved: { type: Boolean, default: false },
  idPeopleInvolved: { type: Boolean, default: false },
  vehicleInvolvedDescription: { type: String },
  peopleInvolvedCount: { type: Number },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reportType: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportType' },
  mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
