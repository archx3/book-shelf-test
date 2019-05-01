const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema(
{
  type : {
    type : String,
    default : "Point"
  },
  coordinates : {
    type : [Number],
    index : "2Dsphere"
  }
});

//const GeoLocation = mongoose.model('GeoLocation', GeoSchema);

module.exports = GeoSchema;

/* JUNK
 if (req.query.lng && req.query.lat)
 {
 Ninja.geoNear(
 {
 type : "Point", coordinates : [parseFloat(req.query.lng), parseFloat(req.query.lat)]
 },
 { maxDistance : 100000, spherical : true }) //all ninjas in 100000 metres radius
 .then(function (ninjas)
 {
 res.send(ninjas);
 }).catch(next)
 }*/
