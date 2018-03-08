var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//following two lines allow us to view body of request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views')); //tell express to serve this folder
app.use(express.static(__dirname + '/public'));


var todoRoutes = require('./routes/todos');

app.get('/', function(req, res){
   res.sendFile('index.html'); 
});

app.use('/api/todos', todoRoutes); //first param is the prefix to the routes

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('APP IS RUNNING ON PORT' + process.env.PORT);
});