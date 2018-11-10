const express = require('express');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
var morgan  = require('morgan');
var app = express();

var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'startupconclave',resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

app.set('views', path.join(__dirname, 'app', 'views'));

//setting template engine
app.set('view engine','hbs');
app.use('/static', express.static(path.join(__dirname, 'public')));

//NodeJS logger helps in debugging
app.use(morgan('dev'));

hbs.registerPartials(__dirname + '/app/views/includes');



//Models
var models = require("./app/models");

// //Authenticate conection
// models.sequelize.authenticate().then(function() {
//
//     console.log('Connected! Database looks fine')
//
// }).catch(function(err) {
//
//     console.log(err, "Something went wrong with the Database Update!")
//
// });


//Server->Routes->controllers->views

var authRoute = require('./app/routes/auth.js')(app);



app.listen(3000,function(){
  console.log("server running on port 3000");
});
