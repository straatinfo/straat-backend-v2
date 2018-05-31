const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitySchema = new Schema({
  cityName: { type: String, unique: true, indexed: true, required: true }
}, { timestamps: true })

module.exports = mongoose.model('City', CitySchema)
