const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CityAreaSchema = new Schema({
  hostName: { type: String, indexed: true },     // base on xlms
  cityName: { type: String, indexed: true },     // base on xlms
  address: { type: String, indexed: true },      // base on xlms
  postalCode: { type: String, indexed: true },   // base on xlms
  emailAddress: { type: String, indexed: true }, // base on xlms
  phoneNumber: { type: String, indexed: true },  // base on xlms
  name: { type: String, indexed: true },         // base on source site https://nominatim.openstreetmap.org
  address_json: { type: Schema.Types.Mixed },    // base on source site https://nominatim.openstreetmap.org
  display_name: { type: String, indexed: true }, // base on source site https://nominatim.openstreetmap.org
  osm_id: { type: String, indexed: true },       // base on source site https://nominatim.openstreetmap.org
  place_id: { type: String, indexed: true },     // base on source site https://nominatim.openstreetmap.org
  type: { type: String, indexed: true },         // base on source site https://nominatim.openstreetmap.org
  geojson: {
    type: {type: String, enum: ['MultiPolygon', 'Polygon'], default: 'Polygon'},
    coordinates: Schema.Types.Array
  },                                          // base on source site http://polygons.openstreetmap.fr/index.py?id=
  centralPoint: {
    type: {type: String, enum: 'Point', default: 'Point'},
    coordinates: {type: [Number], default: [0, 0]}
  },                                           // base on source site http://polygons.openstreetmap.fr/index.py?id=
  _user: { type: String }                      // not yet connected to db
}, {timestamps: true})

CityAreaSchema.index({geojson: '2dsphere'})
CityAreaSchema.index({centralPoint: '2dsphere'})

module.exports = mongoose.model('CityArea', CityAreaSchema)
