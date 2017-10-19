// SERVER-SIDE JAVASCRIPT

///////////////////////////////
//	SET UP AND CONFIGURATION
///////////////////////////////

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// connect to db models -- start database
var db = require('./models');

// generate a new express app
var app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// use ejs
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// serve static files in public
app.use(express.static(__dirname + '/public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.use(function(req, res, next) {
	res.locals.currentUser = req.user; //look into this, want to pull email?
	next();
});

// put in app.use for router

///////////////////////
//	ROUTES 
///////////////////////


// Passport routes for login/logout
var routes = require('./config/routes');

// root route
app.get('/', function(req, res) {
	res.sendFile('views/index.html', { root : __dirname});
});


app.listen(process.env.PORT || 3000, function() {
	console.log("App listening on port 3000");
});