//canvas
var canvas;
var c;
//ball details
var ballX = 400;
var ballY = 300;
var ballSpeedX = (Math.random() < 0.5 ? -1 : 1) * 5;
var ballSpeedY = (Math.random() < 0.5 ? -1 : 1) * 5;

//player paddle details
var paddleY = 250;
const paddleHeight = 100;
var paddleMouseY;
var playerScore = 0;

//ai paddle details
var aiPaddleY = 250;
const paddleThickness = 10;
const aiPaddleHeight = 100;
var aiScore = 0;


window.onload = function() {
  canvas = document.getElementById('theCanvas');
  c = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function() {
      move();    //move the ball
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
  ballSpeedX = -ballSpeedX;            //re-spawn the ball in the opposite direction of where it ended
  ballX = canvas.width/2;              //resets the ball in the center horizontally
  ballY = canvas.height/2;             //resets the ball in the center vertically
}

var calculateMousePos = function(event){                    //this event, or function, will activate each time the mouse moves
  var rect = canvas.getBoundingClientRect();                //the area of the canvas
  var root = document.documentElement;                      //html page
  var mouseX = event.clientX - rect.left - root.scrollLeft; //the position it's getting from mouse x
  var mouseY = event.clientY - rect.top - root.scrollTop;   //the position it's getting from mouse y
  return {
    x:mouseX,
    y:mouseY
  };
}

var move = function(){
    ballX = ballX + ballSpeedX; //shifting the ball
    ballY = ballY + ballSpeedY; //shifting the ball

    //ball movement horizontally, towards right
    if(ballX > canvas.width) {          //when the ball touches the right side of canvas
      if(ballY > aiPaddleY && ballY < aiPaddleY+paddleHeight){ //if the ball is between the top and bottom of the paddle, in other words, touches the paddle
          ballSpeedX = -ballSpeedX;     //the ball will reverse towards the left
      }else {
      resetBall();                      //reset the ball when it touches the right side of the canvas, instead of bouncing off
      playerScore++;                    //adds one point to player
      }
    }
    //ball moving horizontally, towards left
    if(ballX < 0) {                     //when the ball touches the left side of the canvas
       if(ballY > paddleMouseY && ballY < paddleMouseY+paddleHeight){ //if the ball is between the top and bottom of the paddle, in other words, touches the paddle
          ballSpeedX = -ballSpeedX;     //the ball will turn back towards the right
       }else {
       resetBall();                     //reset the ball when it touches the left side of the canvas, instead of bouncing off
       aiScore++;                       //adds one point to ai
       }
    }
    //ball movement vertically
    if(ballY < 0) {                    //when the ball touches the bottom of canvas
      ballSpeedY = -ballSpeedY;        //the ball will reverse towards the top
    } else if(ballY > canvas.height) { //when the ball touches the top of the canvas
      ballSpeedY =- ballSpeedY;        //the ball will turn back towards the bottom
    }

    aiMove();
}

var drawAll = function(){
  //draws the canvas
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  // draws the player's paddle
  drawRect(0, paddleMouseY, paddleThickness, paddleHeight, 'white');
  //draws the ai's paddle
  drawRect(canvas.width-paddleThickness, aiPaddleY, paddleThickness, paddleHeight, 'white');

  //draws the ball
  drawCircle(ballX, ballY, 5, 'white');

  //net details and draw nets
  var netWidth = 5;
  var netX = canvas.width/2;
  var netY = 0;
  var netGap = canvas.height/13;
  while(netY < canvas.height){
    c.fillRect(netX, netY+netGap*0.25, netWidth, netGap*0.5);
    netY+=netGap;
  }

  //draws the score
  c.fillText("Player Score: " +playerScore, 100, 100);
  c.fillText("AI Score: " +aiScore, canvas.width-100, 100);
  c.font = '200px';

}

function drawCircle (centerX, centerY, radius, drawColor){
  c.fillStyle = drawColor;
  c.beginPath();
  c.arc(centerX, centerY, radius, 0,Math.PI*2, false);  //no need to change "0,Math.PI*2, false" because to draw circles, this is fixed
  c.fill();
}

var drawRect = function(x, y, width, height, drawColor){
  c.fillStyle = drawColor;
  c.fillRect(x, y, width, height);
}


var aiMove = function(){
  var aiPaddleYCenter = aiPaddleY + (paddleHeight/2);//finding the center of ai's paddle, to match with the ball to follow it
  if(aiPaddleYCenter < ballY-35){//the paddle will match the ball at 35 lower than its center. meaning the ball will not bounce off from the center of the ai's paddle
    aiPaddleY += 6;
  }
  else if(aiPaddleYCenter > ballY-35) {//the paddle will match the ball at 35 higher than its center. meaning the ball will not bounce off from the center of the ai's paddle
    aiPaddleY -= 6;
  }
}







