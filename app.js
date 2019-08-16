var express = require('express');
var app = express();
var path = require('path');
var partida = {palabra:"",pista:"" };

app.set('port', process.env.PORT || 3000)

var serv = app.listen(app.get('port'));

app.get('/',function(req, res) {
	res.sendFile(path.join(__dirname , 'publico','Ahorcado.html'));
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
		partida.palabra = data.palabra;
		partida.pista = data.pista;
		io.sockets.emit('palabraInsertada',data);
	});
	socket.on('obtenerPalabra',()=>{
		io.sockets.emit('palabraInsertada',partida);
		io.sockets.emit('iniciarPartida');
	})
	socket.on('partidaFinalizada',()=>{
		partida.palabra = "";
		partida.pista = "";
		io.sockets.emit('partidaFinalizada');
	})
});