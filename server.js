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

//setting template engine
app.set('view engine','hbs');
app.use('/static', express.static(path.join(__dirname, 'public')));

//NodeJS logger helps in debugging
app.use(morgan('dev'));

hbs.registerPartials(__dirname + '/views/includes');



//Models
var models = require("./app/models");

//Sync Database
models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});



app.get('/',function(req,res){
  res.render('index.hbs') ;
});


app.get('/login1',function(req,res){
  res.render('login.hbs') ;
});

app.get('/register',function(req,res){
  res.render('register.hbs') ;
});

app.get('/registerother',function(req,res){
  res.render('registerother.hbs') ;
});


app.get('/ques',function(req,res){
  res.render('ques.hbs') ;
});

app.get('/dashboard',function(req,res){
  res.render('dashboard.hbs') ;
});


app.listen(3000,function(){
  console.log("server running on port 3000");
});
