document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){
        console.log('salta');

        if(nivel.muerto == false)
            saltar();
        else {
            nivel.velocidad = 9;
            nubes.velocidad = 1;
            troncos.x = ancho + 100;
            nubes.x = ancho + 100;
            nivel.marcador = 0;
            nivel.muerto = false;
        }
    }
})

var imgPerro, imgNubes, imgTroncos, imgSuelo;

function cargaImagenes(){
    imgPerro = new Image();
    imgNubes = new Image();
    imgTroncos = new Image();
    imgSuelo = new Image();

    imgPerro.src = 'img/imgPerro.png';
    imgNubes.src = 'img/imgNubes.png';
    imgTroncos.src = 'img/imgTroncos.png';
    imgSuelo.src = 'img/imgSuelo.png';
}


var ancho = 700;
var alto = 300;

var canvas,ctx;

function inicializa(){
    canvas=document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    cargaImagenes();
}



function borraCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}

var suelo = 200;
var perro = {y: suelo, vy:0, gravedad:2, salto:20, vymax:9, saltando:false};
var nivel = {velocidad: 9, marcador: 0, muerto: false};
var troncos = {x: ancho + 100, y: suelo+13};
var nubes = {x: 400, y: 50 , velocidad: 1};
var suelog = {x: 0, y: suelo+8};

function dibujaPerro(){
    ctx.drawImage(imgPerro,0,0,600,500,100,perro.y,50,50);
}

//--------------------------------TRONCOS-------------------------------
function dibujaTronco(){
    ctx.drawImage(imgTroncos,0,0,960,480,troncos.x,troncos.y,60,40);
}

function logicaTronco(){
    if(troncos.x < -100){
        troncos.x = ancho + 100;
        nivel.marcador++;
    }
    else{
        troncos.x -= nivel.velocidad;
    }
}

//---------------------------------SUELO----------------------------------
function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,1920,960,0,suelog.y,1200,70);
}

function logicaSuelo(){
    if(suelog.x > 700){
        suelog.x = 0;
    }
    else{
        suelog.x += nivel.velocidad;
    }
}

//----------------------------------NUBES-------------------------------
function dibujaNubes(){
    ctx.drawImage(imgNubes,0,0,1920,1080,nubes.x,nubes.y,60,40);
}

function logicaNubes(){
    if(nubes.x < -100){
        nubes.x = ancho + 100;
    }
    else{
        nubes.x -= nubes.velocidad;
    }
}

function saltar(){
    perro.saltando = true;
    perro.vy = perro.salto;
}

function gravedad(){
    if(perro.saltando == true){
        
        if(perro.y - perro.vy - perro.gravedad > suelo){
            perro.saltando = false;
            perro.vy = 0;
            perro.y = suelo;
        }
        else{
            perro.vy -= perro.gravedad;
            perro.y -= perro.vy;
        }
    }
}

function colision(){
    if(troncos.x >= 100 && troncos.x <= 150){
        if(perro.y >= suelo-25){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nubes.velocidad = 0;
        }
    }
}


function puntuacion(){
    ctx.font = '30px impact';
    ctx.fillStyle = "#555555";
    ctx.fillText(`${nivel.marcador}`,600,50);
    
    if(nivel.muerto == true){
        ctx.font = '60px impact';
        ctx.fillText('GAME OVER',240,150);
    }
}


//---------------------------------------
// bucle principal
var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);

function principal(){
    borraCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaTronco();
    logicaNubes();
    dibujaSuelo();
    dibujaTronco();
    dibujaNubes();
    dibujaPerro();
    puntuacion();
}
