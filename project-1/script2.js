var startGameBtn;
var replayGameBtn;
var gameTitle;
var body = document.getElementsByTagName('body')[0];


//canvas
var canvas;
var c;
//ball details
var ballX = 400;
var ballY = 300;
var ballSpeedX = (Math.random() < 0.5 ? -1 : 1) * 5;
var ballSpeedY = (Math.random() < 0.5 ? -1 : 1) * 5;

//player paddle details
var player1PaddleY = 250;
const paddleHeight = 100;
var paddleMouseY;
var playerScore = 0;

//player2 paddle details
var player2paddle = 250;
const paddleThickness = 10;
const player2paddleHeight = 100;
var player2Score = 0;

var showWinScreen = false;//false by default
const winningScore = 2;


//arrow key
var arrowUp = 38; //key code for arrow up key
var arrowDown = 40; //key code for arrow down key
var keystate = {};

window.onload = function() {

//game title
  gameTitle = document.createElement('h2');
  gameTitle.textContent = 'The Pong Game';
  body.appendChild(gameTitle);
  body.insertBefore(gameTitle, document.body.children[0]);

//Start Game button
  startGameBtn = document.createElement('button');
  startGameBtn.textContent = "Start Game";
  body.appendChild(startGameBtn);
  startGameBtn.classList.add('startGameBtn');

//Replay Game Button
  replayGameBtn = document.createElement('button');
  replayGameBtn.textContent = 'Re-play Game';
  body.appendChild(replayGameBtn);
  replayGameBtn.classList.add('replayGameBtn');
  replayGameBtn.addEventListener('click', function(){
    if(showWinScreen){
      playerScore = 0;
      player2Score = 0;
      showWinScreen = false;
    }

  });

  canvas = document.getElementById('theCanvas');
  c = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function() {
      move();   //move the ball
      drawAll();//draw all items
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove',
     function(event){                                       //event holds the mouse's info
      var mousePos = calculateMousePos(event);
//the mouse was aligning itself to the top of the paddle
      paddleMouseY = mousePos.y - (paddleHeight/2);         //move the mouse to the center of the paddle
     });

  document.addEventListener('keydown', function(event){
    keystate[event.keyCode] = true;
  });
  document.addEventListener('keyup', function(event){
    delete keystate[event.keyCode];
  });
}

var resetBall = function(){
  if(playerScore >= winningScore || player2Score >= winningScore){
    playerScore = 0;
    player2Score = 0;
    showWinScreen = true;
  }

  ballSpeedX = -ballSpeedX;                                 //re-spawn the ball in the opposite direction of where it ended
  ballSpeedY = ((Math.random() < 0.5 ? -1 : 1) * Math.random())* 10;//re-spawn the ball at the same speed as when it started. up or down randomlu
  ballX = canvas.width/2;                                   //resets the ball in the center horizontally
  ballY = canvas.height/2;                                  //resets the ball in the center vertically
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
  if(showWinScreen){
    return;
  }

    ballX = ballX + ballSpeedX; //shifting the ball
    ballY = ballY + ballSpeedY; //shifting the ball

    //ball movement horizontally, towards right
    if(ballX > canvas.width) {                                //when the ball touches the right side of canvas
      if(ballY > player2paddle && ballY < player2paddle+paddleHeight){//if the ball is between the top and bottom of the paddle, in other words, touches the paddle
          ballSpeedX = -ballSpeedX;                           //the ball will reverse towards the left

//the nearer to the edge of the paddle the ball is, the steeper the angle and the faster the speed of the ball will be
          var centerOfPlayer2Paddle = player2paddle+(paddleHeight/2);  //finding the center of the player's paddle
          var ballYOnPlayer2Paddle = ballY - centerOfPlayer2Paddle;     //position of ball on player's paddle
          ballSpeedY = ballYOnPlayer2Paddle*0.80;

      }else {
      playerScore++;                    //adds one point to player, before the ball is reset
      resetBall();                      //reset the ball when it touches the right side of the canvas, instead of bouncing off

      }
    }
//ball moving vertically and horizontally, towards left
    if(ballX < 0) {                                                   //when the ball touches the left side of the canvas
       if(ballY > paddleMouseY && ballY < paddleMouseY+paddleHeight){ //if the ball is between the top and bottom of the paddle, in other words, touches the paddle
          ballSpeedX = -ballSpeedX;                                   //the ball will turn back towards the right, *horizontally

//the nearer to the edge of the paddle the ball is, the steeper the angle and the faster the speed of the ball will be
          var centerOfPlayerPaddle = paddleMouseY+(paddleHeight/2); //finding the center of the player's paddle
          var ballYOnPlayerPaddle = ballY - centerOfPlayerPaddle;   //position of ball on player's paddle
          ballSpeedY = ballYOnPlayerPaddle*0.80;

       }
       else {
       player2Score++;                       //adds one point to ai, before the ball is reset
       resetBall();                     //reset the ball when it touches the left side of the canvas, instead of bouncing off

       }
    }
//ball movement vertically
    if(ballY < 0) {                   //when the ball touches the bottom of canvas
      ballSpeedY = -ballSpeedY;       //the ball will reverse towards the top
    } else if(ballY > canvas.height) {//when the ball touches the top of the canvas
      ballSpeedY =- ballSpeedY;       //the ball will turn back towards the bottom
    }

    player2Move();
}


var drawAll = function(){

//draws the canvas
  drawRect(0, 0, canvas.width, canvas.height, 'black');

      if(showWinScreen){
        c.fillStyle = 'white';
        c.fillText('click to continue', 100, 100);
    return;
  }

// draws the player's paddle
  drawRect(0, paddleMouseY, paddleThickness, paddleHeight, 'white');
//draws the ai's paddle
  drawRect(canvas.width-paddleThickness, player2paddle, paddleThickness, paddleHeight, 'white');



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
  c.fillText("Player 1 Score: " +playerScore, 100, 100);
  c.fillText("Player 2 Score: " +player2Score, canvas.width-100, 100);

}

function drawCircle (centerX, centerY, radius, drawColor){
  c.fillStyle = drawColor;
  c.beginPath();
  c.arc(centerX, centerY, radius, 0,Math.PI*2, false);    //no need to change "0,Math.PI*2, false" because to draw circles, this is fixed
  c.fill();
}

var drawRect = function(x, y, width, height, drawColor){
  c.fillStyle = drawColor;
  c.fillRect(x, y, width, height);
}


var player2Move = function(){
  //var player2paddleCenter = player2paddle + (paddleHeight/2);     //finding the center of ai's paddle, to match with the ball to follow it
  // if(player2paddleCenter < ballY-35){                        //the paddle will match the ball at 35 lower than its center. meaning the ball will not bounce off from the center of the ai's paddle
  //   player2paddle += 9;
  // }
  // else if(player2paddleCenter > ballY-35) {                  //the paddle will match the ball at 35 higher than its center. meaning the ball will not bounce off from the center of the ai's paddle
  //   player2paddle -= 9;
  // }

    if(keystate[arrowUp]) {
      player2paddle -= 7;
    }
    if(keystate[arrowDown]) {
      player2paddle += 7;
    }
}







