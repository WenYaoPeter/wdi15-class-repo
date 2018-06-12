//var spawnAreaOnX = (innerWidth-50);
//var spawnAreaOnY = (innerHeight-50);
// var x = Math.random() * spawnAreaOnX; //random coordinate, to spawn the ball on a random spot
// var y = Math.random() * spawnAreaOnY; //random coordinate, to spawn the ball on a random spot
// var dx = (Math.random() - 0.5) * 2;
// var dy = (Math.random() - 0.5) * 2;
// var radius = 5;


// canvas object
// canvas = {
// canvas draw ball, on x & y axis, random spot
//    drawCircle : function(){
//     c.beginPath();
//     c.arc(x, y, radius, 0, Math.PI * 2, false);
//     c.fillStyle = "white"
//     c.fill();
//     c.strokeStyle = "white";
//      c.stroke();
// }
//canvas.drawCircle();
// the canvas
var keystate = {};
var upKey = 38;
var downKey = 40;
var canvas = document.getElementById('theCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//net
var net = {

  h : 30,
  w : 5,
  x : canvas.width/2, //
  y : 0,
  netGap : canvas.height/13, //gap between each net //64.7

//draw net function
  draw : function(){
     for(this.y = 0; this.y < canvas.height; this.y += this.netGap){ // -this.y += this.netGap- create each net with a gap in between each other
      c.beginPath()
      c.fill()
      c.fillRect(this.x, this.y+this.netGap, this.w, this.h)
    }
  }
}

//ball
var spawnAreaOnX = canvas.width-50;
var spawnAreaOnY = canvas.height-50;
var ballX = (spawnAreaOnX/2);
var ballY = (spawnAreaOnY/2);
var ballSpeedX = /*((Math.random() - 0.5) * 7) */ (Math.random() < 0.5 ? -1 : 1) * 7; //Math.random() - 0.5 spawns the ball towards a random direction. * 7 is just the speed
var ballSpeedY = /*((Math.random() - 0.5) * 7) */ (Math.random() < 0.5 ? -1 : 1) * 7; //Math.random() - 0.5 spawns the ball towards a random direction. * 7 is just the speed

// ball object
var ball = {

  x : ballX,
  y : ballY,
  dx : ballSpeedX,
  dy : ballSpeedY,
  radius : 5,



//draw the ball function, on x & y axis, random spot
  draw : function(){
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = "white"
  c.fill()
  c.strokeStyle = "white"
  c.stroke()
},

//move the ball function
  move : function(){
  this.x += this.dx; // makes ball move, along x axis, once it is created
  this.y += this.dy; // makes ball move, along y axis, once it is created

//ball can bounce off top and bottom screen
//ball can bounce off left and right screen, *** but not against the paddle ***

//***
//find player paddle and AI paddle
//player: x 20, y canvas.height/2 - player.y

//
  if (this.x + this.radius > ai.x || this.x - this.radius < player.x) {//the part where its supposed to bounce off against paddle.
      this.dx = -this.dx;
    }
    else if(this.y + this.radius == player.y || this.y - this.radius == ai.y || this.y + this.radius > canvas.height || this.y - this.radius < 0){
      this.dy = -this.dy;
   }
 }
}
//}//end of ball object

// player object
  var player = {

    x: 20,
    y: canvas.height/2,
    height: 70,
    width: 10,
    moveUp: upKey, // arrow up keyCode is 38
    moveDown: downKey, //downArrow's keyCode is 40
    //use keyCode to represent a key on the keyboard. It tells the program what key has been pressed or released.
    //a keyCode is returned to the program when the button has been pressed.



    draw : function(){
      c.beginPath();
      c.fillRect(this.x, this.y, this.width, this.height);
    },

    move : function(){
      // if up key is pressed,
      //   move player up
      // else if down key is pressed,
      //   move player down

          if(keystate[this.moveUp]){ //if the key's data(the key.keyCode value, which is the key code), is equal to this.moveup's keycode, the condition is true)
            this.y -= 7;
          } else if (keystate[this.moveDown]) { //if the key's data(the key.keyCode value, which is the key code), is equal to this.moveup's keycode, the condition is true)
            this.y += 7;
          }
        }
      }
      document.addEventListener("keydown", function(key){
        //checks which key is pressed
            keystate[key.keyCode] = true;
      });


      document.addEventListener("keyup", function(key){
        //checks which key is released
            delete keystate[key.keyCode];
      });


 // ai object
  var ai = {
    x: canvas.width-20,
    y: canvas.height/2,
    height: 70,
    width: 10,

    draw : function(){
      c.beginPath();
      c.fillRect(this.x, this.y, this.width, this.height);
    }

   //  move : function(){

   //  }
    }


//animation
  function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    ball.draw();
    //ball.move();
    ai.draw();
    player.draw();
    player.move();
    net.draw();
    ball.move(player.y);
  }
  animate();


//*** paddle cannot move yet ***
//*** score system not started yet ***








//player 1 is on the left, 2/AI right


// ballX
// ballY
//
//move the ball, vector of the ball - dy, dx, at fixed speed, but random direction
// ballSpeedX
// ballSpeedY

//bounce the ball against the walls and the paddle



//set up the score
//draw the middle line




