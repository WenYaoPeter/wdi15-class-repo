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
var canvas = document.getElementById('theCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//net
var net = {

  h : 30,
  w : 10,
  x : canvas.width/2, //
  y : 0,
  netGap : canvas.height/15,

//draw net function
  draw : function(){
     for(this.y = 0; this.y < canvas.height; this.y += this.netGap){
      c.beginPath()
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

  if ((this.x + this.radius > canvas.width) || (this.x - this.radius < 0)) {
      this.dx = -this.dx;
    } else if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
      this.dy = -this.dy;
   }
 }
}

//}//end of ball object

 // ai object
  var ai = {
    x: 20,
    y: canvas.height/2,
    height: 70,
    width: 10,

    draw : function(){
      c.beginPath();
      c.fillRect(this.x, this.y, this.width, this.height);
    }
}
  //  move : function(){

  //  }

  // }

// player object
  var player = {
    x: canvas.width-20,
    y: canvas.height/2,
    height: 70,
    width: 10,

    draw : function(){
      c.beginPath();
      c.fillRect(this.x, this.y, this.width, this.height);
    }
  }
//   move : function(){

//    }

//  }

//animation
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  ball.draw();
  ball.move();
  ai.draw();
  player.draw();
  net.draw();
}
animate();


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




