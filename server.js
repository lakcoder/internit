const express = require('express');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
var app = express();

app.set('view engine','hbs');
app.use('/static', express.static(path.join(__dirname, 'public')));



hbs.registerPartials(__dirname + '/views/includes');


app.get('/',(req,res) =>{
  res.render('index.hbs') ;
});

app.get('/login',(req,res) =>{
  res.render('login.hbs') ;
});

app.get('/register',(req,res) =>{
  res.render('register.hbs') ;
});

app.get('/registerother',(req,res) =>{
  res.render('registerother.hbs') ;
});


app.get('/ques',(req,res) =>{
  res.render('ques.hbs') ;
});

app.get('/dashboard',(req,res) =>{
  res.render('dashboard.hbs') ;
});


app.listen(3000,() =>{
  console.log("server running on port 3000");
});
