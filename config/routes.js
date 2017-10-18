///////////////////////
//	ROUTES
///////////////////////

var express = require('express');
var app = express();
var router = express.Router();

//Parses info from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override'); 

var passport = require('passport');
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics'); //not created yet

//////// PASSPORT ROUTES  ////////////////

router.route('/')
	.get(staticsController.home) 

router.route('/signup')
	.get(usersController.getSignup)
	.post(usersController.postSignup)

router.route('/login')
	.get(usersController.getLogin)
	.post(usersController.postLogin)

router.route('/logout')
	.get(usersController.getLogout)

module.exports = router;


