const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/db');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if(err){
    console.log('Not able to connect to DB ' + err);
  }else{
    console.log('Connected to DB ' + config.db);
  }
});


app.get('/', (req, res) =>{
  res.send('hello world');
});

app.listen(8080 ,() =>{
  console.log('Listening on port 8080');
});
