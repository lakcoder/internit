const express = require('express');
const fs = require('fs');

var app = express();

app.use(express.static(__dirname));

app.listen(3000,() =>{
  console.log("server running on port 3000");
});
