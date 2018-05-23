const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CityAreaSchema = new Schema({
  hostName: { type: String, indexed: true },
  cityName: { type: String, indexed: true },
  address: { type: String, indexed: true },
  postalCode: { type: String, indexed: true },
  emailAddress: { type: String, indexed: true },
  phoneNumber: { type: String, indexed: true },
  centralPoint: {
    type: {type: String, enum: 'Point', default: 'Point'},
    coordinates: {type: [Number], default: [0, 0]}
  },
}, {timestamps: true})
CityAreaSchema.index({centralPoint: '2dsphere'})

module.exports = mongoose.model('Host', CityAreaSchema)
