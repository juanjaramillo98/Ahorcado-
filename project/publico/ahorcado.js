// ### VARIABLES ###

// Palabra a averiguar
var palabra = "";
var palabraINS = "";
var pistica = "";
var longitudPalabra;
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");





const socket = io();



socket.on('palabraInsertada', function (data) {
  palabraINS = data.palabra
  pistica = data.pista
  console.log(palabra);
});

socket.on('iniciarPartida',() =>{
  inicio();
});

socket.on('partidaFinalizada',()=>{
  palabraINS = "";
  palabra = "";
  pista = "";
  location.reload();
  console.log("finalizada");
});




// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  //rand = (Math.random() * 19).toFixed(0);
  //palabra = palabras[rand][0].toUpperCase();
  palabra = palabraINS;
  console.log(palabra);
}

/*
function generaPalabra() {
 
  console.log(palabra);
 
}
*/

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}


//Generar abecedario
function generaABC(a, z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for (; i <= j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='" + letra + "'>" + letra + "</button>";
    if (i == 110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='" + letra + "'>Ñ</button>";
    }
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if (palabra.indexOf(letra) != -1) {
    for (var i = 0; i < palabra.length; i++) {
      if (palabra[i] == letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto verde";
  } else {
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallo!";
    document.getElementById("acierto").className += "acierto rojo";
    document.getElementById("image" + cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () {
    document.getElementById("acierto").className = "";
  }, 800);
}



// Compruba si ha finalizado
function compruebaFin() {
  if (oculta.indexOf("_") == -1) {
    document.getElementById("msg-final").innerHTML = "Felicidades !!";
    let jugador = document.getElementById('usuario');
    let cont = 1;

    if (cont = 1) {
      if (palabra != ""){
        socket.emit('jugador', {
          jugador: jugador.value
          
        });
      } 
      cont=cont+3;
    }

    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  } else if (cont == 0) {
    document.getElementById("msg-final").innerHTML = "Game Over";
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}
// Obtener pista
function pista() {
  document.getElementById("hueco-pista").innerHTML = pistica;
}

// Restablecer juego
function inicio() {
  generaPalabra();
  longitudPalabra = palabra.length;
  pintarGuiones(longitudPalabra);
  generaABC("a", "z");
  cont = 6;
  document.getElementById("intentos").innerHTML = cont;
}


// Iniciar
window.onload = inicio();

// si alguien entra despues de incertada la palabra
function obtenerPalabra(){
  socket.emit('obtenerPalabra');
  console.log(palabra);
}

//entrada de el admin a la insercion de palabras
function admin(){
  let jugador = document.getElementById('usuario');
  if(jugador.value == "Nitrome"){
    location.href='publico/Insertar.html';
  }
}