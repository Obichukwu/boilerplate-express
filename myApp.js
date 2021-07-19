var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  const indexPath = __dirname + '/views/index.html';
  res.sendFile(indexPath);
});

app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/json',(req,res)=>{  
  const mySecret = process.env['MESSAGE_STYLE']
  if (mySecret == "uppercase"){
    res.json({"message": "HELLO JSON"});
  }
  else{
    res.json({"message": "Hello json"});
  }  
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString()
  next();
}, function(req, res) {
  res.json({time: req.time});
});

app.get('/:word/echo',(req,res)=>{  
  res.json({"echo": req.params.word});
});

const nameHandler = (req,res)=>{  
  res.json({"name": `${req.query.first} ${req.query.last}`});
}
app.route('/name').get((req,res)=>{  
  res.json({"name": `${req.query.first} ${req.query.last}`});
}).post((req,res)=>{
  res.json({"name": `${req.body.first} ${req.body.last}`});
});
//














 module.exports = app;
