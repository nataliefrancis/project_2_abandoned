var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/trip-app");

module.exports.User = require('./users.js');
module.exports.Trip = require('./trips.js');