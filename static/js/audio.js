
var socket = io.connect("http://" + window.location.host);

socket.on('SW_AMX_LEVEL', function(data) {
	$('#level-inner').css("width", 100*data.value/150 + "%");
});

