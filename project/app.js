var express = require('express');
var app = express();
var path = require('path');

var serv = app.listen(2000);

app.get('/',function(req, res) {
	res.sendFile(path.join(__dirname , 'publico','Inicio.html'));
});
app.use('/publico',express.static(path.join(__dirname , 'publico')));

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