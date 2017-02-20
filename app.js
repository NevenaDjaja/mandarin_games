var express = require('express');
var path = require('path');
var PORT = process.env.PORT || 8000;

var app = express();

// configure the app
app.use(express.static(__dirname));

app.use('/lib', express.static(path.join(__dirname, 'lib')));

app.use('/data', express.static(path.join(__dirname, 'data')));

app.set('/views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'views/index.html'))
});

app.listen(PORT, function() {
	console.log("Server is up on port:", PORT)
});
