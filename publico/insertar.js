const socket = io();


let palabra = document.getElementById('reto');
let insertar = document.getElementById('adivinalo');
let finalizar = document.getElementById('finalizado');
let pista = document.getElementById('pista');

insertar.addEventListener('click',()=>{
    console.log(palabra.value);
    socket.emit('palabraInsertada',{
        palabra: palabra.value ,
        pista: pista.value       
    });   
});
finalizar.addEventListener('click',()=>{
    console.log("asta luego");
    socket.emit('partidaFinalizada');   
});
socket.on('jugador',(data)=>{
    console.log(data);
    document.getElementById("jugador_g").innerHTML += "<div>" + data.jugador + "</div>" ;
});
