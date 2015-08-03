var express = require('express');
var path = require('path');
var fs = require('fs');
var http = require('http');

var app = express();

// configure the app
app.use(express.static(__dirname));

app.use('/lib', express.static(path.join(__dirname, 'lib')));

// app.use('/views', express.static(path.join(__dirname, 'views')));

app.use('/data', express.static(path.join(__dirname, 'data')));

app.set('/views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'views/index.html'))
});


//app.use('/', routes);

var server = http.createServer(app);

server.listen(8000);
