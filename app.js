var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
// express middleware
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require("path");


// Utilização do ejs
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(express.static(path.join(__dirname, 'app/public')));
// set up our express application
app.use(bodyParser.urlencoded({
  extended: true
})); // get information from html forms


app.use(session({
    secret: 'APLJ_TEYEYUEUOOOO88888',
    name: 'aplj_session',
    resave: true,
    saveUninitialized: true
}));



// routes ======================================================================
// routes pour user
var route = express.Router();
require('./config/routes')(route); // load our routes and pass in our app
app.use('/', route);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);