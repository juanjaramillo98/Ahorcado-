const socket = io();


let palabra = document.getElementById('reto');
let boton = document.getElementById('adivinalo');
let pista = document.getElementById('pista');

boton.addEventListener('click',()=>{
    console.log(palabra.value)
    socket.emit('palabraInsertada',{
        palabra: palabra.value ,
        pista: pista.value       
    });   
});
socket.on('jugador',(data)=>{
    console.log(data);
    document.getElementById("jugador_g").innerHTML += "<div>" + data.jugador + "</div>" ;
});
