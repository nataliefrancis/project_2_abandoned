var mongoose = require("mongoose");
// connecting with mongo database
mongoose.connect('mongodb://localhost/trip-app');

module.exports.User = require('./users.js');
module.exports.Trip = require('./trips.js');