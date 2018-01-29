const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/db');
//routes changes START
const router=express.Router();
const authentication=require('./routes/authentication')(router);
const bodyParser=require('body-parser');
const cors = require('cors');
//routes changes END


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if(err){
    console.log('Not able to connect to DB ' + err);
  }else{
    console.log('Connected to DB ' + config.db);
  }
});

app.use(cors({
    origin: "http://localhost:4200"
}));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/authentication',authentication);

app.get('/', (req, res) =>{
  res.send('hello world');
});

app.listen(8080 ,() =>{
  console.log('Listening on port 8080');
});
