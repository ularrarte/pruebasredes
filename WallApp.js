var loop, controller;

    var bCanvas = document.getElementById("lienzo");
    var lienzo = bCanvas.getContext("2d");

    //MENU:

    var menu = document.getElementById("menu");
    var cmenu = menu.getContext("2d");

    var container = document.getElementById("container");
    container.style.display = "none";


    var mouseX;
    var mouseY;



    //Estados

    const gameStates = {
      currentState: undefined,
      startGame() {
        container.style.display = "initial";
        menu.style.display = "none"
      },
      game() {
        //El juego en si
      },
      menu() {
        document.addEventListener('click', mouseCliked, false)
      },
      menuSetup() {
        drawMenu();
        gameStates.currentState = gameStates.menu();
        gameStates.currentState;
      },
      gameOver() {
        container.style.display = "none";
        menu.style.display = "initial"
        gameStates.currentState = gameStates.menu();
        gameStates.currentState;
      }
    };





    Button.prototype.checkClicked = function () {
      if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBotton)
        return true
    };

    var width = 500;
    var height = 600;


    var background = new Image();
    background.src = "wall.png";

    var plataformasImg = new Image();
    plataformasImg.src = "plataforma.png"

    var plataformasImg2 = new Image();
    plataformasImg2.src = "plataforma2.png"

    var dragonSprite = new Image();
    dragonSprite.src = "pu1.png";

    var pu2 = new Image();
    pu2.src = "pu2.png";

    var specialSprites = false;
    var heEntrado = false;




    var anchoCanvas = bCanvas.width;
    var altoCanvas = bCanvas.height;

    var platformCount = 9;

    var gravity = 0.2;

    var vx = 0.5;
    var vy = -10;

    var isPowerUp = false;

    var androidDerecha = false;
    var androidIzquierda = false;

    var score = 0;

    var boton1 = new Button(284, 500, 147, 207)

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
      
     
      if (score > 2500) this.probabilidad = [0, 0, 1, 1, 2, 2, 2]; //50% de probabilidad (3 de cada 6)
      else if (score > 1500) this.probabilidad = [0, 0, 1, 1, 2, 2]; //50% de probabilidad (3 de cada 6)
      else if (score > 500) this.probabilidad = [0, 0, 0, 1, 2, 2]; //40% de probabilidad de baldosa con moivmiento (2 de cada 5)
      else if (score > 100) this.probabilidad = [0, 0, 0, 1, 2]; //20% de probabilidad de baldosas con movimiento (1 de cada 5)
      else this.probabilidad = [0];
      //Una vez tenemos la probabilidad, la asignamos sobre el tipo
      this.type = this.probabilidad[Math.floor(Math.random() * this.probabilidad.length)];
      console.log("kokoka " + this.probabilidad.length);

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

    var Agujero = function () {}

    var jon = new Image();
    jon.src = 'Jon2.png';

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


    /*for (var a = 0; a < 6; a++){
    		plataformas[a] = [];
    			for(var b = 0; b < 5; b++) {
            auxX += Math.floor(Math.random() * 20); 
            auxY -= Math.floor(Math.random() * 20); 
    				plataformas[a][b] = { x: auxX, y: auxY};
            console.log("El segundo reich de palacios estaba en el: " + plataformas[a][b].x + " " + plataformas[a][b].y);  
            console.log("Que coño le pasa a esto: " + plataformas[a].length + " lol: " + plataformas[a][b].length);
    			}
    	}*/




    window.onload = function () {
      //getMobileOperatingSystem();
      gameStates.currentState = gameStates.menuSetup()
      gameStates.currentState;
    };

    function drawMenu() {
      var img = new Image();
      img.src = "MenuPrueba.jpg"
      img.onload = function () {
        cmenu.drawImage(img, 0, 0);
      };
    }

    function mouseCliked(e) {
      mouseX = e.pageX - menu.offsetLeft;
      mouseY = e.pageY - menu.offsetTop;
      if (boton1.checkClicked()) {
        console.log("De oca a oca el valle no se toca")
        gameStates.currentState = gameStates.startGame()
        gameStates.currentState;
      }
    }


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



    function pintaPersonaje() {
      //window.alert(player.x + " " + player.y);      
      lienzo.drawImage(background, 0, 0);
      if (player.spriteState == 0) lienzo.drawImage(jon, player.x, player.y);
      if (player.spriteState == 1) lienzo.drawImage(jonLeft, player.x, player.y);
      if (player.spriteState == 2) lienzo.drawImage(jonRight, player.x, player.y);
      if (player.spriteState == 3) lienzo.drawImage(jonDragon, player.x, player.y);

      if (powerup.render) lienzo.drawImage(dragonSprite, powerup.x, powerup.y);
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

        if (player.y_vel > 0 && powerup.x > player.x && (powerup.x + powerup.ancho) < (player.x + player.ancho) && (
            powerup
            .y + powerup.alto > player.y) && (powerup.y + powerup.alto < player.y + player.alto)) {
          player.y_vel = -20;
          gravity = 0.1;
          player.spriteState = 3;
          specialSprites = true;
          isPowerUp = true;

          score += 50;
          setDificultad();

          //Intervalo para el PU

          if (powerup.type == 1) {
            function intervalTrigger() {
              return window.setInterval(function () {
                gravity = 0.2;
                //specialSprites = false;
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
          ancho: 5,
          alto: 5,
          render: true,
          type: 1,

          x: plataformas[0].x + plataformas[2].ancho / 2,
          y: plataformas[0].y - plataformas[2].alto / 2,
        }
      } else {
        powerup = {
          ancho: 5,
          alto: 5,
          render: true,
          type: 1,

          x: 0,
          y: 0,
        }
      }

    }

    function setDificultad() {
      if (score >= 500) {
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
      }
    }

    function gestionPuntuacion() {
      document.getElementById("scoreText").innerHTML = Math.round(score);
      lienzo.fillText(Math.round(score), 100, 100);
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
          //console.log(player.vy);

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
        //console.log("OOOOOOOOOOOOOOOOOOOOOOO");

        gameStates.currentState = gameStates.gameOver();
        gameStates.currentState;

        player.x = plataformas[plataformas.length - 1].x + 20;
        player.y = plataformas[plataformas.length - 1].y - player.alto + 10;
      }

      //score++;



      lienzo.clearRect(0, 0, bCanvas.width, bCanvas.height);

      gestionPowerUp();
      putasColisionesMeComenLosPutosCojones2()
      gestionPuntuacion();
      pintaPersonaje();
      pintaPlataformas();
      window.requestAnimationFrame(loop);
    }


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