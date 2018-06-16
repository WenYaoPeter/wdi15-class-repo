var gameTitle;
var restartGame;
var replayGameBtn;
var body = document.getElementsByTagName('body')[0];
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
var wUp = 87;
var sDown = 83;
var keystate2 = {};
var player1Score= 0;

//ai paddle details
var aiPaddleY = 250;
const paddleThickness = 10;
const aiPaddleHeight = 100;
var aiScore = 0;

var oUp = 79;
var lDown = 76;
var keystate = {};

var showWinScreen = false;
const winningScore = 3;


window.onload = function() {

  //Game Title
  gameTitle = document.createElement('h2');
  gameTitle.textContent = 'The Pong Game';
  body.appendChild(gameTitle);
  var kukuBird = document.getElementsByTagName('img')[0];
  gameTitle.appendChild(kukuBird);
  body.insertBefore(gameTitle, document.body.children[0]);
  gameTitle.style.fontFamily = "Indie Flower, cursive"

  //Restart Game Button
  restartGame = document.createElement('Button');
  restartGame.textContent = 'Restart!';
  body.appendChild(restartGame);
  var gitHubIcon = document.getElementsByClassName('fab')[0];
  restartGame.appendChild(gitHubIcon);
  restartGame.classList.add('close');
  restartGame.style.margin = '20px 650px 0 13px';
  restartGame.addEventListener('click', function(){
    player1Score = 0;
    aiScore = 0;
    resetBall();
  });

  //Replay Game Button
  replayGameBtn = document.createElement('Button');
  replayGameBtn.textContent = "Re-Play Game ";
  body.appendChild(replayGameBtn);
  var replayIcon = document.getElementsByClassName('fa-spin')[0];
  replayGameBtn.appendChild(replayIcon);
  replayGameBtn.style.margin = '20px 0 0 654px';
  replayGameBtn.classList.add('replayGameBtn');
  replayGameBtn.addEventListener('click', function(){
    if(showWinScreen){
      player1Score = 0;
      aiScore = 0;
      showWinScreen = false;
    }
  });


  canvas = document.getElementById('theCanvas');
  c = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function() {
      move(); //move the ball
      drawAll(); //draw all items
  }, 1000/framesPerSecond);

  // canvas.addEventListener('mousemove',
  //    function(event){//event holds the mouse's info
  //     var mousePos = calculateMousePos(event);
  //     //the mouse was aligning itself to the top of the paddle
  //     paddleMouseY = mousePos.y - (paddleHeight/2);//move the mouse to the center of the paddle
  //    });

}

var resetBall = function(){
  if(player1Score >= winningScore){          //if player 1 wins, win screen will show and ball will not reset
    player1Score = winningScore;             //the player's score will be set to
    showWinScreen = true;                   //showing win screen
  }else if (aiScore >= winningScore){        //if player 2 wins, win screen will show and ball will not reset
    aiScore = winningScore;                  //the player's score will be set to
    showWinScreen = true;                   //showing win screen
  }

  ballSpeedX = -ballSpeedX;//re-spawn the ball in the opposite direction of where it ended
  ballSpeedY = ((Math.random() < 0.5 ? -1 : 1) * Math.random())* 10;
  ballX = canvas.width/2;//resets the ball in the center horizontally
  ballY = canvas.height/2;//resets the ball in the center vertically
}

// var calculateMousePos = function(event){//this event, or function, will activate each time the mouse moves
//   var rect = canvas.getBoundingClientRect();//the area of the canvas
//   var root = document.documentElement;//html page
//   var mouseX = event.clientX - rect.left - root.scrollLeft;//the position it's getting from mouse x
//   var mouseY = event.clientY - rect.top - root.scrollTop;//the position it's getting from mouse y
//   return {
//     x:mouseX,
//     y:mouseY
//   };


var move = function(){
  if(showWinScreen){
    return;
  }

    ballX = ballX + ballSpeedX; //shifting the ball
    ballY = ballY + ballSpeedY; //shifting the ball

    //ball movement horizontally
    if(ballX > canvas.width) {    //when the ball touches the right side of canvas
      if(ballY > aiPaddleY && ballY < aiPaddleY+paddleHeight){
          ballSpeedX = -ballSpeedX;//the ball will reverse towards the left

      //the nearer to the edge of the paddle the ball is, the steeper the angle and the faster the speed of the ball will be
          var centerOfaiPaddle = aiPaddleY+(paddleHeight/2);  //finding the center of the player's paddle
          var ballYOnAiPaddle = ballY - centerOfaiPaddle;    //position of ball on player's paddle
          ballSpeedY = ballYOnAiPaddle*0.80;

      }else {
      player1Score++;                   //before ballreset, to check for win state in case someone wins
      resetBall();                //reset the ball when it touches the right side of the canvas, instead of bouncing off
      }
    }
    if(ballX < 0) {        //when the ball touches the left side of the canvas
       if(ballY > paddleY && ballY < paddleY+paddleHeight){ //if the ball is between the top and bottom of the paddle, in other words, touches the paddle
        ballSpeedX = -ballSpeedX; //the ball will turn back towards the right
       //the nearer to the edge of the paddle the ball is, the steeper the angle and the faster the speed of the ball will be
          var centerOfPlayerPaddle = paddleY+(paddleHeight/2); //finding the center of the player's paddle
          var ballYOnPlayerPaddle = ballY - centerOfPlayerPaddle;   //position of ball on player's paddle
          ballSpeedY = ballYOnPlayerPaddle*0.80;

       }else {
        aiScore++;                    //before ballreset, to check for win state in case someone wins
        resetBall();                 //reset the ball when it touches the left side of the canvas, instead of bouncing off
        }
    }
    //ball movement vertically
    if(ballY < 0) {                    //when the ball touches the bottom of canvas
      ballSpeedY = -ballSpeedY;        //the ball will reverse towards the top
    } else if(ballY > canvas.height) { //when the ball touches the top of the canvas
      ballSpeedY =- ballSpeedY;        //the ball will turn back towards the bottom
    }

    aiMove();
    player1Move();
}

var drawAll = function(){

  //draws the canvas
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  if(showWinScreen){    //black everything out/stops the game when someone wins
    c.fillStyle = 'white';
    c.font = '20px Arial';
    c.textAlign = 'center';

  //show which player wins
    if(player1Score >= winningScore){
         c.fillText('Player 1 won! ' , 500, 250);
         c.fillText(+player1Score+ ' : ' +aiScore, 500, 275);
        } else if(aiScore >= winningScore){
          c.fillText('Player 2 won! ' ,500, 250);
          c.fillText(+player1Score+ ' : ' +aiScore, 500, 275);
        }

        c.fillText('Click to Re-Play', 500, 300);

    return;
  }

  // draws the player's paddle
  drawRect(0, paddleY, paddleThickness, paddleHeight, 'white');
  document.addEventListener('keydown', function(event){
    keystate2[event.keyCode] = true;
  });

  document.addEventListener('keyup', function(event){
    delete keystate2[event.keyCode];
  });

  //draws the ai's paddle
  drawRect(canvas.width-paddleThickness, aiPaddleY, paddleThickness, paddleHeight, 'white');
  document.addEventListener('keydown', function(event){
    keystate[event.keyCode] = true;
  });

  document.addEventListener('keyup', function(event){
    delete keystate[event.keyCode];
  });
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
  c.font = '20px Arial';
  c.textAlign = 'center';
  c.fillText("Player 1 Score: " +player1Score, 100, 100);
  c.fillText("Player 2 Score: " +aiScore, canvas.width-100, 100);

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

var aiMove = function(){
  if(keystate[oUp]){
    aiPaddleY -= 10;
  }
    else if(keystate[lDown]){
      aiPaddleY += 10;
    }
}

var player1Move = function(){
  if(keystate2[wUp]){
    paddleY -= 10;
  }
   else if(keystate2[sDown]){
    paddleY += 10;
   }
}








