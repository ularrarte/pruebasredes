var loop, controller;

var bCanvas = document.getElementById("lienzo");
var lienzo = bCanvas.getContext("2d");

var menuCanvas = document.getElementById("menu");
var lienzoScore = menuCanvas.getContext("2d");

var tCanvas = document.getElementById("topCanvas");
var ctx = tCanvas.getContext("2d");

canvas1height = 400;

//MENU:

var menu = document.getElementById("menu");
var cmenu = menu.getContext("2d");



var container = document.getElementById("container");
container.style.display = "none";


var mouseX;
var mouseY;

/*
* LanguajeSelected = 0  -->Español
*
* LanguajeSelected = 1  -->Ingles
* */

var languajeSelected = 0;


//Estados
/*
* Estado menu = 0;
* Estado Jugando = 1;
* Estado Scores = 2;
* Estado Opciones = 3;
* Estado Creditos = 4;
*
* */
var curretStateId = 0;


const gameStates = {
    currentState: undefined,
    startGame() {
        container.style.display = "initial";
        menu.style.display = "none"
        curretStateId = 1;
    },
    game() {
        //El juego en si
    },
    menu() {
        document.addEventListener('click', mouseCliked, false)
    },
    menuSetup() {
        drawMenu();
        curretStateId = 0;
        gameStates.currentState = gameStates.menu();
        gameStates.currentState;
    },
    gameOver() {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////// PUNTUACIONES //////////////////////////////////////////////////////



        //localStorage.clear();


        
        mejoresPuntuaciones.push(new puntuacionNombre("Juan Pedro", score));

        localStorage.setItem("arrayPuntuaciones", JSON.stringify(mejoresPuntuaciones));
        mejoresPuntuaciones = JSON.parse(localStorage.getItem("arrayPuntuaciones"));

        mejoresPuntuaciones.sort(sortNumber);
        console.log(typeof mejoresPuntuaciones); //object
        console.log(mejoresPuntuaciones); //[1, 2, 3]
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////





        container.style.display = "none";
        menu.style.display = "initial"
        curretStateId = 0;
        gameStates.currentState = gameStates.menu();
        gameStates.currentState;
    },
    showScore() {
        drawScores();
        curretStateId = 2;
    },
    closeScore() {
        drawMenu()
        curretStateId = 0;
    },
    showOptions() {
        drawOpciones()
        curretStateId = 3;
    },
    closeOptions() {
        drawMenu();
        curretStateId = 0;

    },
    showCredits() {
        drawCredits();
        curretStateId = 4;
    },
    closeCredits() {
        drawMenu();
        curretStateId = 0;
    }
};




window.onload = function () {
    //getMobileOperatingSystem();
    gameStates.currentState = gameStates.menuSetup()
    gameStates.currentState;

    localStorage.clear();
    
    if (localStorage.getItem("arrayPuntuaciones") != null) {
        mejoresPuntuaciones = JSON.parse(localStorage.getItem("arrayPuntuaciones"));
        console.log("No deberia aparecer");
    }

    mejoresPuntuaciones.sort(sortNumber);

    console.log("El contenido del array es: " + mejoresPuntuaciones); //[1, 2, 3]

};


function drawMenu() {
    var img = new Image();
    if (languajeSelected === 1) {
        img.src = "Assets/Main_Menu_Eng.png"
    } else if (languajeSelected === 0) {
        img.src = "Assets/Main_Menu_Esp.png"
    }
    img.onload = function () {
        cmenu.drawImage(img, 0, 0, img.width, img.height, 0, 0, menu.width, menu.height);
    };
}


function drawScores() {
    var img = new Image();
    img.src = "Assets/AA_Menu_Ranking.png"
    img.onload = function () {
        cmenu.drawImage(img, 0, 0, img.width, img.height, 0, 0, menu.width, menu.height);
        lienzoScore.font = '30px WallApp';        

        for (var i = 0; i < mejoresPuntuaciones.length; i++) {
            if (i == 0) lienzoScore.fillStyle = '#ffcc00'
            else if (i == 1) lienzoScore.fillStyle = '#808080'
            else if (i == 2) lienzoScore.fillStyle = '#994d00'
            else lienzoScore.fillStyle = '#000000'
            if(i<10) lienzoScore.fillText(mejoresPuntuaciones[i].nombre + ": " + mejoresPuntuaciones[i].puntuacion, width/2 - 150, i*45 + 416);
        }
    };



    console.log("El primer elemento es :" + mejoresPuntuaciones[0]);



}

function drawOpciones() {
    var img = new Image();
    img.src = "Assets/AA_Menu_Opciones.png"
    img.onload = function () {
        cmenu.drawImage(img, 0, 0, img.width, img.height, 0, 0, menu.width, menu.height);
    };
}

function drawCredits() {
    var img = new Image();
    img.src = "Assets/AA_Menu_Creditos.png"
    img.onload = function () {
        cmenu.drawImage(img, 0, 0, img.width, img.height, 0, 0, menu.width, menu.height);
    };
}

var botonJugar = new Button(110, 381, 371, 447);
var botonScore = new Button(110, 381, 475, 550);
var botonOpciones = new Button(110, 381, 575, 650);
var botonCreditos = new Button(110, 381, 675, 750);

var botonIdioma = new Button(110, 381, 351, 413)
var botonCerrar = new Button(381, 500, 830, 886);



function mouseCliked(e) {
    mouseX = e.pageX - menu.offsetLeft;
    mouseY = e.pageY - menu.offsetTop;
    console.log(curretStateId);
    if (botonJugar.checkClicked() && curretStateId === 0) {
        gameStates.currentState = gameStates.startGame();
        gameStates.currentState;
    }
    if (botonScore.checkClicked() && curretStateId === 0) {
        gameStates.currentState = gameStates.showScore();
        gameStates.currentState;
    }
    if (botonOpciones.checkClicked() && curretStateId === 0) {
        gameStates.currentState = gameStates.showOptions();
        gameStates.currentState;
    }
    if (botonCreditos.checkClicked() && curretStateId === 0) {
        gameStates.currentState = gameStates.showCredits();
        gameStates.currentState;
    }
    if (botonCerrar.checkClicked() && curretStateId > 1) {
        gameStates.currentState = gameStates.menuSetup();
        gameStates.currentState;
    }
    if (botonIdioma.checkClicked() && curretStateId === 3) {
        languajeSelected = 1;
        console.log("SE HA CAMBIADO IDIOMA")
    }



}

function Button(xL, xR, yT, yB) {
    this.xLeft = xL;
    this.xRight = xR;
    this.yTop = yT;
    this.yBotton = yB;
}



Button.prototype.checkClicked = function () {
    if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBotton)
        return true
};


var width = 500;
var height = 600;


var background = new Image();
background.src = "wall.png";



var topBackgorund = new Image();
topBackgorund.src = "topwall.png"

var plataformasImg = new Image();
plataformasImg.src = "plataforma.png"

var plataformasImg2 = new Image();
plataformasImg2.src = "plataforma2.png"

var dragonSprite = new Image();
dragonSprite.src = "pu1.png";


var specialSprites = false;
var heEntrado = false;




var anchoCanvas = bCanvas.width;
var altoCanvas = bCanvas.height;

var platformCount = 8;

var gravity = 0.2;

var vx = 0.5;
var vy = -9;

var isPowerUp = false;

var androidDerecha = false;
var androidIzquierda = false;

var score = 0;

/////////////////////////////////////////////////////// VARIABLE MEJORES PUNTUACIONES ////////////////


function puntuacionNombre (nombre, puntuacion){
    this.nombre = nombre;
    this.puntuacion = puntuacion;
}
    
var mejoresPuntuaciones = new Array();





///////////////////////////////////////////////////////////////////////////////////////////////////////

var newLevel = true;

var boton1 = new Button(284, 500, 147, 207)
var roca = true;

function Button(xL, xR, yT, yB) {
    this.xLeft = xL;
    this.xRight = xR;
    this.yTop = yT;
    this.yBotton = yB;
}





var player = {
    x: anchoCanvas / 2 - 50,
    y: altoCanvas - 150,
    ancho: 50,
    alto: 63,
    jumping: true,
    saltado: true,
    x_vel: 0,
    y_vel: 0,


    spriteState: 0, //0 Normal, 1 Izquierda, 2 Derecha

    get midX() {
        return this.x + this.ancho * 0.5
    },
    get midY() {
        return this.y + this.alto * 0.5
    },
}

var position = 0;




var plataformas = [];



function Platform() {
    this.ancho = 100;
    this.alto = 30;

    this.x = Math.random() * (width - this.ancho);
    this.y = position;

    this.vx = Math.round(Math.random()); //Velocidad positiva o negativa, se refleja como 0 o 1, en caso de ser 0 se moficiará

    if (this.vx == 0) this.vx = -1; //Si la velocidad ha salido 0, la ponemos a -1

    this.puntuado = false;
    this.saltado = false;

    position += (height / platformCount);


    if (score > 2500) {
        this.probabilidad = [0, 0, 1, 1, 2, 2, 2];
        setDificultad();
    } else if (score > 1500) {
        this.probabilidad = [0, 0, 1, 1, 2, 2];
        setDificultad();
    } else if (score > 500) {
        this.probabilidad = [0, 0, 0, 1, 2, 2];
        setDificultad();
    } else if (score > 100) {

        this.probabilidad = [0, 0, 0, 1, 2];
        if (newLevel) {
            background.src = "wallpp.png";
            setDificultad();
        }
        newLevel = false;
    } else {
        this.probabilidad = [0];
    }
    //Una vez tenemos la probabilidad, la asignamos sobre el tipo
    this.type = this.probabilidad[Math.floor(Math.random() * this.probabilidad.length)];

};


var powerup;

for (var i = 0; i < platformCount; i++) {
    plataformas.push(new Platform());
}



player.x = plataformas[plataformas.length - 1].x + 20;
player.y = plataformas[plataformas.length - 1].y - player.alto + 10;

var Base = function () {
    this.height = 5;
    this.width = width;


    this.x = 0;
    this.y = height - this.height;
};

var base = new Base();

var Agujero = function () { }

var jon = new Image();
jon.src = 'Jon.png';

var jonLeft = new Image();
jonLeft.src = 'JonI.png';

var jonRight = new Image();
jonRight.src = 'JonD.png';

var jonDragon = new Image();
jonDragon.src = "drogonn.png";



var bCanvas = document.getElementById("lienzo");
var lienzo = bCanvas.getContext("2d");
var android = false;

var auxX = 50;
var auxY = 450;

espanha = document.getElementById('sprite');
espania = document.getElementById('walker');

var enemy = function () {

    // Set cube size
    this.x = 150;
    this.y = 40;
    this.width = 36;
    this.height = 65;

    // Direction: True -> / False <- 
    this.vx = true;

    // Projectile array, just one arrow at the same time
    this.attack = [];

    // Main method to control enemy IA
    this.drawEnemy = function () {

        // Move the character through the canvas
        this.move();

        // Projectile generation
        //setTimeout(this.shoot.bind(this), 5000);
        this.shoot();

        // Draw in the top canvas
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(espania, 0, 0, this.width, this.height, this.x, this.y, 36, 65);

        // Draw projectiles
        this.attack.forEach(function (arrow) {
            arrow.draw();
            arrow.collision(player);
        });

        // Delete the arrow as it leaves the bottom canvas 
        if (this.attack.length > 0) {
            if (!this.attack[0].existence) {
                this.attack.pop();
            }
        }

    }

    // Increase or decrease X pos as direction marks
    this.move = function () {

        if (this.vx) {
            this.x++;
        } else if (!this.vx) {
            this.x--;
        }
        this.checkPos();

    }

    // Check pos in canvas to set direction
    this.checkPos = function () {
        if (this.vx && (this.x + this.width) >= 400) {
            this.vx = false;
        } else if (!this.vx && this.x <= 0) {
            this.vx = true;
        }
    }

    this.shoot = function () {

        if (this.attack.length < 1) {
            this.attack.push(new arrow((this.x + 25), (this.y + 50), 3));
        }
    }

}

function arrow(positionX, positionY, vY) {

    // Public
    this.posX = positionX;
    this.posY = positionY;
    this.posYbelow = 0;
    this.vy = vY;

    this.projectileWidth = 21;
    this.projectileHeight = 16;

    this.posCanvas = false;
    this.existence = true;


    this.fall = function () {
        if (this.posCanvas) {
            this.posYbelow += this.vy;
        } else if (!this.posCanvas) {
            this.posY += this.vy;
        }
    }

    this.draw = function () {

        // Draw the arrow in both canvas and set delay between them
        if (this.posY < canvas1height && this.posYbelow <= height) {
            // Top canvas
            this.fall();
            ctx.drawImage(espanha, 0, 0, this.projectileWidth, this.projectileHeight, this.posX, this.posY, 21, 16);

            // Collider
            ctx.rect(this.posX, this.posY, this.projectileWidth, this.proejctileHeight);
            ctx.stroke();

        } else if (this.posY > canvas1height && this.posYbelow <= height) {

            if (!this.posCanvas) {
                // Transition
                setTimeout(this.cloudDelay.bind(this), 3000);
            } else {
                // Bottom canvas
                this.fall();
                lienzo.drawImage(espanha, 0, 0, this.projectileWidth, this.projectileHeight, this.posX, this.posYbelow, 21, 16);
                //  pintaPersonaje(true);

                // Collider
                lienzo.rect(this.posX, this.posYbelow, this.projectileWidth, this.proejctileHeight);
                lienzo.stroke();
            }

        } else {
            // Delete arrow
            this.existence = false;
        }

    }

    this.cloudDelay = function () {
        this.posCanvas = true;
    }


    this.collision = function (player) {

        /*console.log("PosX: " + this.posX + " PlayerX: " + player.x);
        console.log("PosY: " + this.posYbelow + " PlayerY: " + player.y);
        if (this.posX < player.x + player.width &&
            this.posX + this.projectileWidth > player.x &&
            this.posYbelow - this.projectileHeight < player.y + player.height &&
            this.posYbelow > player.y){
                console.log("Collision detected!");   
                this.existence = false;
            
            }

    }*/
        if (player.x < this.posX && (player.x + player.ancho) > (this.posX + this.projectileWidth) &&
            (this.posYbelow + this.projectileHeight > player.y) && (this.posYbelow + this.projectileHeight) < (player.y + player.alto + 10)) {
            this.existence = false;
            gameStates.currentState = gameStates.gameOver();
            gameStates.currentState;
        }

    }
}

var enem = new enemy;





function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        window.alert("Esto es Andorid PUTAaaa: " + android);
        android = true;
        window.alert("2: " + android);

        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}



function pintaPersonaje(boolAux) {
    //window.alert(player.x + " " + player.y);      
    lienzo.drawImage(background, 0, 0);
    ctx.drawImage(topBackgorund, 0, 0);
    gestionPuntuacion();
    if (player.spriteState == 0) lienzo.drawImage(jon, player.x, player.y);
    if (player.spriteState == 1) lienzo.drawImage(jonLeft, player.x, player.y);
    if (player.spriteState == 2) lienzo.drawImage(jonRight, player.x, player.y);
    if (player.spriteState == 3) lienzo.drawImage(jonDragon, player.x - 150, player.y - 62);

    lienzo.drawImage(dragonSprite, powerup.x, powerup.y);
}

function pintaPlataformas() {

    for (var i = 0; i < platformCount; i++) {
        var aux = plataformas[i];
        if (!plataformas[i].saltado && plataformas[i].type == 1 || plataformas[i].type == 0) lienzo.drawImage(
            plataformasImg, plataformas[i].x, plataformas[i].y);
        else if (plataformas[i].type == 2 && !plataformas[i].saltado) lienzo.drawImage(plataformasImg2, plataformas[i].x,
            plataformas[i].y);

    }
}



function putasColisionesMeComenLosPutosCojones2() {
    for (var i = 0; i < plataformas.length; i++) {
        var puta = plataformas[i];
        if (player.y_vel > 0 && (player.x + 15 < puta.x + puta.ancho) && (player.x + player.ancho -
            15 > puta.x) &&
            (player.y + player.alto > puta.y) && (player.y + player.alto < puta.y + puta.alto)) {
            if (!puta.saltado) player.y_vel = vy;

            if (puta.type == 2) {
                plataformas[i].saltado = true;
            }

            if (!puta.puntuado) {
                score += 10;
                plataformas[i].puntuado = true;
            }

        }

        player.saltado = true;

        //Colisiones con los power ups




        if (player.y_vel > 0 && powerup.x > player.x && (powerup.x + powerup.ancho) < (player.x + player.ancho) &&
            (powerup.y > player.y) && (powerup.y + powerup.alto < player.y + player.alto)
        ) {


            player.y_vel = -20;
            gravity = 0.1;

            dragonSprite.src = "pu2.png";


            player.spriteState = 3;
            powerup.render = false;
            specialSprites = true;
            isPowerUp = true;

            score += 50;
            //setDificultad();

            //Intervalo para el PU

            if (powerup.type == 1) {
                function intervalTrigger() {
                    return window.setInterval(function () {
                        gravity = 0.2;
                        //specialSprites = false;
                        dragonSprite.src = "pu1.png";

                        window.clearInterval(id);
                    }, 800);
                };

                function spriteChanger() {
                    return window.setInterval(function () {
                        player.spriteState = 0;
                        isPowerUp = false;
                        specialSprites = false;
                        window.clearInterval(id2);
                    }, 1500);
                };
                var id = intervalTrigger();
                var id2 = spriteChanger();
            }
        }
    }
}


function gestionPowerUp() {


    if (plataformas[0].type == 0 || plataformas[0].type == 1) {
        powerup = {
            ancho: 25,
            alto: 25,
            render: true,
            type: 1,

            x: plataformas[2].x + plataformas[2].ancho / 2 - 25 / 2,
            y: plataformas[2].y - plataformas[2].alto,
        }
    } else {
        powerup = {
            ancho: 25,
            alto: 25,
            render: false,
            type: 1,

            x: -25,
            y: -25,
        }
    }

}

function setDificultad() {
    /*if (score >= 500) {
        background.src = "wallpp.png";

        vx -= 0.05;
        vy += 1;

        function intervalTrigger() {
            return window.setInterval(function () {
                background.src = "wall.png";
                window.clearInterval(id);
            }, 1000);
        };
        var id = intervalTrigger();
    }
    if (score >= 1000) {

        vx -= 0.025;
        vy += 1;

        function intervalTrigger() {
            background.src = "wallpp.png";
            return window.setInterval(function () {
                background.src = "wall.png";
                window.clearInterval(id2);
            }, 1000);
        };
        var id2 = intervalTrigger();
    }
    if (score >= 2000) {

        vx -= 0.025;
        vy += 1;


        function intervalTrigger3() {
            background.src = "wallpp.png";
            return window.setInterval(function () {
                background.src = "wall.png";
            }, 1000);
        };
        var id3 = intervalTrigger3();
    }*/
    function intervalTrigger() {
        return window.setInterval(function () {
            background.src = "wall.png";
            window.clearInterval(id);
        }, 1000);
    };
    var id = intervalTrigger();
}

function gestionPuntuacion() {
    lienzo.font = "30px Impact";
    lienzo.fillText(score, 10, 590);


}

//Controlador de las movidas de teclado
controller = {


    left: false,
    right: false,
    up: false,


    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;
        //window.alert("asas");

        switch (event.keyCode) {

            case 37: //Flecha izquierda
                controller.left = key_state;
                break;
            case 38: //Flecha derecha
                controller.up = key_state;
                break;
            case 39: //Flecha de salto.
                controller.right = key_state;
                break;

        }

    }
};

loop = function () {

    var xFactor = 0.9;


    //Gestión de la velocidad y de los sprites:

    if (controller.left || androidIzquierda && !specialSprites) {
        if (!isPowerUp) player.spriteState = 1;
        player.x_vel -= vx;
    } else if (controller.right || androidDerecha && !specialSprites) {
        if (!isPowerUp) player.spriteState = 2;
        player.x_vel += vx;
    } else if (!specialSprites) {
        if (!isPowerUp) player.spriteState = 0;
    } else {
        androidDerecha = false;
        androidIzquierda = false;
    }



    //Gestión del movimiento del personaje:
    if (player.y >= (height / 2) - (player.alto / 2)) {
        player.y += player.y_vel;
        player.y_vel += gravity;
    } else {
        plataformas.forEach(function (p, i) {

            if (player.y_vel < 0) {
                p.y -= player.y_vel;
            }

            if (p.y > height) {
                plataformas[i] = new Platform();
                plataformas[i].y = p.y - height;
            }

        });

        base.y -= player.y_vel;
        player.y_vel += gravity;

        if (player.y_vel >= 0) {
            player.y += player.y_vel;
            player.y_vel += gravity;
        }
    }

    plataformas.forEach(function (p, i) {
        if (p.type == 1) {
            if (p.x < 0 || p.x + p.ancho > width) {
                p.vx *= -1;
            }
            p.x += p.vx;
        }
    });







    player.x += player.x_vel;

    player.x_vel *= 0.9; //Eje X

    //Si se sale por la parte izquierda del canvas...
    if (player.x < -32) {
        player.x = 520;
    } else if (player.x > 520) {
        //Si se sale por laparte derecha...
        player.x = -32;
    }

    if (player.y > 580) {
        gameStates.currentState = gameStates.gameOver();
        gameStates.currentState;

        player.x = plataformas[plataformas.length - 1].x + 20;
        player.y = plataformas[plataformas.length - 1].y - player.alto + 10;
    }

    //score++;



    lienzo.clearRect(0, 0, bCanvas.width, bCanvas.height);
    ctx.clearRect(0, 0, width, height);


    gestionPowerUp();
    putasColisionesMeComenLosPutosCojones2()
    pintaPersonaje();
    enem.drawEnemy();
    pintaPlataformas();
    window.requestAnimationFrame(loop);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// MEJORES PUNTUACIONES JUANPE /////////////////////////////////////////////////
function sortNumber(a, b) {
    return b.puntuacion - a.puntuacion;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function orientation(event) {
    var string = "Magnetometer: " +
        event.alpha + ", " +
        event.beta + ", " +
        event.gamma;
    if (event.gamma > 8) {
        androidDerecha = true;
    } else {
        androidDerecha = false;
    }
    if (event.gamma < -8) {
        androidIzquierda = true;
    } else {
        androidIzquierda = false;
    }
    document.getElementById("debug").innerHTML = string + " <br/> Isq: " + androidIzquierda + " Dcha: " +
        androidDerecha;
    lienzo.fillText(Math.round(string), 100, 100);

}

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", orientation, false);
} else {
    console.log("DeviceOrientationEvent is not supported");
}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);