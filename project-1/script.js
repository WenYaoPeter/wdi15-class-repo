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
var keystate;
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
  x : canvas.width/2,
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
var ballY = (spawnAreaOnY/2);                      //(Math.random()<0.5 ? -1 : 1) checks if the generator value is +ve or -ve
var ballSpeedX = /*((Math.random() - 0. 5) * 7) */ (Math.random() < 0.5 ? -1 : 1) * 2; //Math.random() - 0.5 spawns the ball towards a random direction. * 2 is just the speed
var ballSpeedY = /*((Math.random() - 0.5) * 7) */ (Math.random() < 0.5 ? -1 : 1) * 2; //Math.random() - 0.5 spawns the ball towards a random direction. * 2 is just the speed

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

 if ((this.x + this.radius > ai.x || this.x - this.radius < player.x)) {//the part where its supposed to bounce off against paddle.
       this.dx = -this.dx;
    }
  else if(this.y < player.y+player.h || this.y < ai.y+ai.h || this.y + this.radius > canvas.height || this.y - this.radius < 0){
       this.dy = -this.dy;
    }
      //the ball moves out of the screen
      //the ball the re-spawns at the center of the screen

      //canvas.width/2
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
    },

     move : function(){
    //calculate the destination on y axis the ai should be going, which is where the ball wants to go to
    var aiY = ball.y - (this.height - ball.radius) * 0.5;
    //this.y = aiY //this will mean that ai's y position is exactly the same as the ball. Meaning the ai will follow the ball perfectly
    this.y += (aiY-this.y) * 0.15;//this will mean that the ai is slightly slower than the ball. Meaning the ai will not be able to follow the ball perfectly
     }
    }


//animation
  function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    ball.draw();
    ai.draw();
    ai.move();
    player.draw();
    player.move();
    net.draw();
    ball.move();
  }
  animate();


//*** score system not started yet ***
//set up the score





