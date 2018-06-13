//canvas
var canvas;
var c;
//ball details
var ballX = 400;
var ballY = 300;
var ballSpeedX = 5;
var ballSpeedY = 5;

//player paddle details
var paddleY = 250;
const paddleHeight = 100;
var paddleMouseY;

//ai paddle details
var aiPaddleY = 250;
const paddleThickness = 10;
const aiPaddleHeight = 100;


window.onload = function() {
  canvas = document.getElementById('theCanvas');
  c = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function() {
      move(); //move the ball
      drawAll(); //draw all items
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove',
     function(event){//event holds the mouse's info
      var mousePos = calculateMousePos(event);
      //the mouse was aligning itself to the top of the paddle
      paddleMouseY = mousePos.y - (paddleHeight/2);//move the mouse to the center of the paddle
     });

}

var resetBall = function(){
  ballSpeedX = -ballSpeedX;//re-spawn the ball in the opposite direction of where it ended
  ballX = canvas.width/2;//resets the ball in the center horizontally
  ballY = canvas.height/2;//resets the ball in the center vertically
}

var calculateMousePos = function(event){//this event, or function, will activate each time the mouse moves
  var rect = canvas.getBoundingClientRect();//the area of the canvas
  var root = document.documentElement;//html page
  var mouseX = event.clientX - rect.left - root.scrollLeft;//the position it's getting from mouse x
  var mouseY = event.clientY - rect.top - root.scrollTop;//the position it's getting from mouse y
  return {
    x:mouseX,
    y:mouseY
  };
}

var move = function(){
    ballX = ballX + ballSpeedX; //shifting the ball
    ballY = ballY + ballSpeedY; //shifting the ball

    //ball movement horizontally
    if(ballX > canvas.width) {    //when the ball touches the right side of canvas
      if(ballY > paddleMouseY && ballY < paddleMouseY+paddleHeight){
          ballSpeedX = -ballSpeedX;//the ball will reverse towards the left
      }else {
      resetBall();                //reset the ball when it touches the right side of the canvas, instead of bouncing off
      }
    }
    if(ballX < 0) {        //when the ball touches the left side of the canvas
       if(ballY > paddleMouseY && ballY < paddleMouseY+paddleHeight){ //if the ball is between the top and bottom of the paddle, in other words, touches the paddle
        ballSpeedX = -ballSpeedX; //the ball will turn back towards the right
       }else {
        resetBall();                 //reset the ball when it touches the left side of the canvas, instead of bouncing off
        }
    }
    //ball movement vertically
    if(ballY < 0) {                    //when the ball touches the bottom of canvas
      ballSpeedY = -ballSpeedY;        //the ball will reverse towards the top
    } else if(ballY > canvas.height) { //when the ball touches the top of the canvas
      ballSpeedY =- ballSpeedY;        //the ball will turn back towards the bottom
    }
}

var drawAll = function(){
  //draws the canvas
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  // draws the player's paddle
  drawRect(0, paddleMouseY, paddleThickness, paddleHeight, 'white');
  //draws the ai's paddle
  drawRect(canvas.width-paddleThickness, paddleMouseY, paddleThickness, paddleHeight, 'white');

  //draws the ball
  drawCircle(ballX, ballY, 5, 'white');


}

function drawCircle (centerX, centerY, radius, drawColor){
  c.fillStyle = drawColor;
  c.beginPath();
  c.arc(centerX, centerY, radius, 0,Math.PI*2, false);//no need to change "0,Math.PI*2, false" because to draw circles, this is fixed
  c.fill();
}

var drawRect = function(x, y, width, height, drawColor){
  c.fillStyle = drawColor;
  c.fillRect(x, y, width, height);
}