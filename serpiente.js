
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    let intervaloSerpiente;
    let direccionActual= "derecha";
    let comida={
      comidaX:10,
      comidaY:10
    }
    let comidas=false
    let puntaje=0
    let juegoFinalizado= true;
    let velocidad = 300;

    const TAMANIO_CELDA=25;
    const SERPIENTE = [
    { x: ((canvas.width/2)/TAMANIO_CELDA), y: ((canvas.height/2)/TAMANIO_CELDA)+1 },
    { x: (canvas.width/2)/TAMANIO_CELDA, y: (canvas.height/2)/TAMANIO_CELDA },
    { x: ((canvas.width/2)/TAMANIO_CELDA)-1, y: ((canvas.height/2)/TAMANIO_CELDA) },
    { x: ((canvas.width/2)/TAMANIO_CELDA)-2, y: ((canvas.height/2)/TAMANIO_CELDA) }
    ]

    // Primera pintura del juego al cargar la página
    generarComida();
    dibujarTodo();
    

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero2();
    pintarSerpiente();
    pintarComida();
}


    function dibujarTablero2(){
      for(let i=0;i<canvas.width;i+=TAMANIO_CELDA){
      ctx.strokeStyle="rgba(187, 219, 43, 0.86)";
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,canvas.height);
      ctx.stroke();
      }
      for(let i=0;i<canvas.height;i+=TAMANIO_CELDA){
      ctx.strokeStyle="rgba(187, 219, 43, 0.86)";
      ctx.beginPath();
      ctx.moveTo(0,i);
      ctx.lineTo(canvas.width,i);
      ctx.stroke();
    }
    }

    function pintarParte(lineaX, lineaY, color) {
    let valorX = lineaX * TAMANIO_CELDA;
    let valorY = lineaY * TAMANIO_CELDA;
    ctx.fillStyle = color;
    ctx.fillRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);
    ctx.strokeStyle="black";
    ctx.strokeRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
    for (let i = 0; i < SERPIENTE.length; i++) {
        let elemento = SERPIENTE[i];
        if (i === 0) {
            pintarParte(elemento.x, elemento.y, "pink");
        } else {
            pintarParte(elemento.x, elemento.y, "yellow");
        }
    }
}

function moverDerecha(){
    let cabezaActual = SERPIENTE[0];
    let nuevaCabeza = {
        x: cabezaActual.x + 1,
        y: cabezaActual.y
    };

    SERPIENTE.unshift(nuevaCabeza);
}


function moverIzquierda(){
    let cabezaActual = SERPIENTE[0];
    let nuevaCabeza = {
        x: cabezaActual.x + -1,
        y: cabezaActual.y
    };

    SERPIENTE.unshift(nuevaCabeza);
}

function moverAbajo(){
    let cabezaActual = SERPIENTE[0];
    let nuevaCabeza = {
        x: cabezaActual.x,
        y: cabezaActual.y+1
    };
    SERPIENTE.unshift(nuevaCabeza);
}

function moverArriba(){
    let cabezaActual = SERPIENTE[0];
    let nuevaCabeza = {
        x: cabezaActual.x,
        y: cabezaActual.y-1
    };
    SERPIENTE.unshift(nuevaCabeza);
}

function cambiarDireccion(nuevaDireccion){
    if (direccionActual === "derecha" && nuevaDireccion === "izquierda") return;
    if (direccionActual === "izquierda" && nuevaDireccion === "derecha") return;
    if (direccionActual === "arriba" && nuevaDireccion === "abajo") return;
    if (direccionActual === "abajo" && nuevaDireccion === "arriba") return;

    direccionActual = nuevaDireccion;
}

function iniciarJuego(){
    clearInterval(intervaloSerpiente); 
    juegoFinalizado = false;

    intervaloSerpiente = setInterval(moverSerpiente,velocidad);
}

function pausarJuego(){
    clearInterval(intervaloSerpiente);
}

function moverSerpiente(){
    if (direccionActual == "derecha"){
        moverDerecha();
    }
    if (direccionActual == "izquierda"){
        moverIzquierda();
    }
    if (direccionActual == "abajo"){
        moverAbajo();
    }
    if (direccionActual == "arriba"){
        moverArriba();
    }
    verificarColicionBordes();
    if (atraparComida()) {
    puntaje += 1;
    document.getElementById("puntaje").innerText = puntaje;
    generarComida();
} else {
    // Solo eliminamos la cola si NO comió
    SERPIENTE.pop(); 
}
    dibujarTodo();
}

function generarComida(){
    let totalColumnas = canvas.width / TAMANIO_CELDA;
    let totalFilas = canvas.height / TAMANIO_CELDA;
    comida.comidaX = Math.floor(Math.random() * totalColumnas);
    comida.comidaY = Math.floor(Math.random() * totalFilas);
}

function pintarComida(){
    pintarParte(comida.comidaX, comida.comidaY, "#44ff00");
}

function atraparComida(){
    let cabezaActual = SERPIENTE[0];

    if (cabezaActual.x == comida.comidaX && cabezaActual.y == comida.comidaY){
        return true;
    }else {
        return false;
    }
}

function verificarColicionBordes() {
    let cabeza = SERPIENTE[0];

    let totalColumnas = canvas.width / TAMANIO_CELDA;
    let totalFilas = canvas.height / TAMANIO_CELDA;

    // Evaluamos si la cabeza tocó cualquiera de los 4 bordes
    if (cabeza.x < 0 || cabeza.x >= totalColumnas || cabeza.y < 0 || cabeza.y >= totalFilas) {
        pausarJuego();
        deshabilitarBotones();
        alert("GAME OVER");
        document.getElementById("estado").innerHTML="GAME OVER"
        juegoFinalizado= true;
        puntaje = 0;
        document.getElementById("puntaje").innerText = puntaje;
        return true;
    }
}

function reiniciarJuego() {
    pausarJuego();
    direccionActual = "derecha";

    SERPIENTE.length = 0;
    SERPIENTE.push(
        { x: ((canvas.width / 2) / TAMANIO_CELDA), y: ((canvas.height / 2) / TAMANIO_CELDA) + 1 },
        { x: (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA },
        { x: ((canvas.width / 2) / TAMANIO_CELDA) - 1, y: ((canvas.height / 2) / TAMANIO_CELDA) },
        { x: ((canvas.width / 2) / TAMANIO_CELDA) - 2, y: ((canvas.height / 2) / TAMANIO_CELDA) }
    );

    generarComida();
    dibujarTodo();
    juegoFinalizado = false;
    habilitarBotones();
}

function deshabilitarBotones(){
    let arriba = document.getElementById("arriba");
    arriba.disabled = true;
    let abajo = document.getElementById("abajo");
    abajo.disabled = true;
    let derecha = document.getElementById("derecha");
    derecha.disabled = true;
    let izquierda = document.getElementById("izquierda");
    izquierda.disabled = true;
    let iniciar = document.getElementById("iniciar");
    iniciar.disabled = true;
}

function habilitarBotones(){
    let arriba = document.getElementById("arriba");
    arriba.disabled = false;
    let abajo = document.getElementById("abajo");
    abajo.disabled = false;
    let derecha = document.getElementById("derecha");
    derecha.disabled = false;
    let izquierda = document.getElementById("izquierda");
    izquierda.disabled = false;
    let iniciar = document.getElementById("iniciar");
    iniciar.disabled = false;
}




