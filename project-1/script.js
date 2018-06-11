

//style the canvas
var canvas = document.getElementById('theCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//player 1 is on the left, 2/AI right

//draw the ball, on x & y axis, random spot
var spawnAreaOnX = (innerWidth-50);
var spawnAreaOnY = (innerHeight-50);
var x = Math.random() * spawnAreaOnX; //random coordinate, to spawn the ball on a random spot
var y = Math.random() * spawnAreaOnY; //random coordinate, to spawn the ball on a random spot
var dx = (Math.random() - 0.5) * 2;
var dy = (Math.random() - 0.5) * 2;
var radius = 5;
c.beginPath();
c.arc(x, y, radius, 0, Math.PI * 2, false);
c.fillStyle = "white"
c.fill();
c.strokeStyle = "white";
c.stroke();

// ballX
// ballY
//
//move the ball, vector of the ball - dy, dx, at fixed speed, but random direction
// ballSpeedX
// ballSpeedY

//bounce the ball against the walls and the paddle

//draw/setup the paddle, on x & y axis
// create element for paddleX
// create element for paddleY
//link it to keyboard control

//set up the score
//draw the middle line




