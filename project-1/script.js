

//style the canvas
var canvas = document.getElementById('theCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


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

// canvas draw ai and player


var spawnAreaOnX = innerWidth-50;
var spawnAreaOnY = innerHeight-50;
var ballX = Math.random() * spawnAreaOnX
var ballY = Math.random() * spawnAreaOnY
var balldx = (Math.random() - 0.5) * 30
var balldy = (Math.random() - 0.5) * 30
// ball object
var ball = {

  x: ballX,
  y: ballY,
  dx : balldx,
  dy : balldy,
  radius : 5,

//draw the ball, on x & y axis, random spot
  draw : function(){
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = "white"
  c.fill()
  c.strokeStyle = "white"
  c.stroke()
},

//move the ball
  move : function(){
  this.x += this.dx;
  this.y += this.dy;
}

}



function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  ball.draw();
  ball.move();
}
animate();

// player object
// var player = {
//   x: ,
//   y: ,
//   height: ,
//   width: ,

//   draw : function(){
//     c.beginPath();
//     c.fillRect(this.x, this.y, this.width, this.height)
//   },

//   move : function(){

//   }

// }
// // ai object
// var ai = {
//   x: ,
//   y: ,
//   height: ,
//   width: ,

//   draw : function(){
//     c.beginPath();
//     c.fillRect(this.x, this.y, this.width, this.height)
//   },

//   move : function(){

//   }

// }




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




