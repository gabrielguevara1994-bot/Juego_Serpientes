
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA=25;

    

    // Primera pintura del juego al cargar la página
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
    }

    function dibujarTablero(){
      ctx.strokeStyle="rgba(187, 219, 43, 0.86)";
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(100,100);
      ctx.stroke();
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



