const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname));

app.get('/',(req,res) =>{
  res.render('index.hbs') ;
});

app.get('/about',(req,res) =>{
  res.render('about.hbs') ;
});

app.get('/contacts',(req,res) =>{
  res.render('contacts.hbs') ;
});

app.get('/events',(req,res) =>{
  res.render('events.hbs') ;
});

app.get('/faq',(req,res) =>{
  res.render('faq.hbs') ;
});

app.get('/login',(req,res) =>{
  res.render('login.hbs') ;
});

app.get('/register',(req,res) =>{
  res.render('register.hbs') ;
});

app.listen(3000,() =>{
  console.log("server running on port 3000");
});
