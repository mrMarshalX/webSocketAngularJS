var express = require('express');
var app = express();
var socket = require('socket.io');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var counter = 0;
var data = [];

app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
	res.sendfile('./public/index.html');
});

(function () {
	setInterval(function () {		
		if (data.length >= 100) {
			data.unshift(counter++);
			data.pop();
		} else {
			data.push(counter++);
		}
	}, 5000);
})();

io.on('connection', function (socket) {
	var updateInterval = null;

	socket.emit('client-connected', {
		timestamp: new Date().getTime(),
		message: 'Welcome to the new service'
	});

	updateInterval = setInterval(function () {
		socket.emit('data-update', data);
	}, 5000);

	socket.on('disconnect', function () {
		console.log('user disconnected');
		clearInterval(updateInterval);
	});
});

http.listen(3000, function () {
	console.log('Server is up and working on port 3000');
});