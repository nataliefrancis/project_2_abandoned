var mongoose = require("mongoose");
// connecting with mongo database
mongoose.connect('mongodb://localhost/trip-app');

module.exports.User = require('./user.js');
module.exports.Trip = require('./trips.js');