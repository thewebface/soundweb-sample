
// Create server
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app, { log: false })
  , static = require('node-static')
  , soundweb = require('soundweb');

app.listen(25001);

var staticServer = new static.Server('./static');

// Response to regular HTTP requests
function handler (req, res) {
	req.on('end', function() {
		staticServer.serve(req, res);
	});
}

// Connect to Soundweb

var swclient = soundweb.createClient({host:'192.168.1.50', port:2000});

// Response to socket.io connections
io.sockets.on('connection', function(socket) {
	swclient.on('SET_VALUE', function(data) {
		socket.emit(data.group, {id: data.id, value: data.value});
	});
});

