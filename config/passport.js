// USER AUTHENTICATIONS

let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user');

module.exports = function(passport) {

	passport.serializeUser(function(user, callback) {
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback) {
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback) {
		//Find a user with this email
		User.findOne({'local.email' : email}, function(err, user) {
			if (err) return callback(err);
			//If there is already a user with that email address
			if (user) {
				return callback(null, false, req.flash('signupMessage', "Sorry, this email address is already being used"));
			} else {
				//If there is not already a user with that email
				//create one
				let newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.encrypt(password);
				newUser.save(function(err) {
					if (err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback) {
		User.findOne({'local.email' : email}, function(err, user) {
			if (err) return callback(err);
			//If no user is found
			if (!user) {
				return callback(null, false, req.flash('loginMessage', "Could not find the email address."));
			}
			//If wrong password
			if(!user.validPassword(password)) {
				return callback(null, false, req.flash('loginMessage', 'Password is incorrect'));
			}

			return callback(null, user);
		});
	}));

};