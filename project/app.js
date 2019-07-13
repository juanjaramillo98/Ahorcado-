var express = require('express');
var app = express();



app.get('/',function(req, res) {
	res.sendFile(__dirname + '/publico/Ahorcado.html');
});
app.use('/publico',express.static(__dirname + '/publico'));

var serv = app.listen(2000);

const socketIO = require('socket.io');
const io = socketIO(serv);

io.on('connection',(socket)=>{
	console.log('nueva coneccion',socket.id);

	socket.on('jugador',(data)=>{
		console.log(data);
		io.sockets.emit('jugador',data);
	});

	socket.on('palabraInsertada',(data)=>{
		console.log(data);
		io.sockets.emit('palabraInsertada',data);
	});
});