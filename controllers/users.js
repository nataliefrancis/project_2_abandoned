//////////// LOGIN/LOGOUT/AUTHENTICATION  ///////////////////

var passport = require('passport');

//GET /signup
function getSignup(request, response, next) {
	response.render('signup', {message : request.flash('signupMessage')});
}

//POST /signup
function postSignup(request, response, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});

	return signupStrategy(request, response, next);
}

//GET /login
function getLogin(request, response, next) {
	response.render('login', {message: request.flash('loginMessage')});
}

//POST /login
function postLogin(request, response, next) {
	let loginStrategy = passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});

	return loginStrategy(request, response, next);
}

// GET /logout
function getLogout(request, repsonse, next) {
	request.logout();
	response.redirect('/');
}

module.exports = {
	getLogin: getLogin,
	postLogin: postLogin,
	getSignup: getSignup,
	postSignup: postSignup,
	getLogout: getLogout
};
