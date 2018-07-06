var startGameBtn;
var gameTitle;
var restartGame;
var replayGameBtn;
var player1Name;
var player2Name;
var body = document.getElementsByTagName('body')[0];
var canvas;
var c;
var randomColor;
// var randomRadius;
// var dummyBallX;
// var dummyBallY;
// var dummyBallRadius;
// var dummyDy = 5;
// var dummyDx = 5;
//ball detplayer2ls
var ballX = 400;
var ballY = 300;
var ballSpeedX = (Math.random() < 0.5 ? -1 : 1) * 5;
var ballSpeedY = (Math.random() < 0.5 ? -1 : 1) * 5;

//player 1 paddle details
var player1PaddleY = 250;
var paddleMouseY;
var wUp = 87;
var sDown = 83;
var keystate2 = {};
var player1Score = 0;
const paddleHeight = 100;

//player2 paddle detaills
var player2PaddleY = 250;
var player2Score = 0;
const paddleThickness = 10;
const player2PaddleHeight = 100;


var oUp = 79;
var lDown = 76;
var keystate = {};

var startGameScreen = true;
var showWinScreen = false;
const winningScore = 3;

window.onload = function() {

  canvas = document.getElementById('theCanvas');
  c = canvas.getContext('2d');

  //start game
  startGameBtn = document.getElementsByTagName('Button')[0];
  startGameBtn.textContent = 'Start Game!';
  if(startGameScreen){
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    c.fillStyle = 'white';
    c.font = '20px Arial';
    c.textAlign = 'center';
    c.fillText("Press Start Button to play" ,390, 200);

    var player1NameInput = document.getElementsByTagName('input')[0];
    // player1NameInput.style.margin = '0';
    // player1NameInput.placeholder = 'Player 1 Name';
    // body.appendChild(player1NameInput);
    player1NameInput.addEventListener('change', function(event){
      player1Name = player1NameInput.value;
     });

    var player2NameInput = document.getElementsByTagName('input')[1];
    // player2NameInput.style.margin = '0';
    // player2NameInput.placeholder = 'Player 2 Name';
    // body.appendChild(player2NameInput);
    player2NameInput.addEventListener('change', function(event){
      player2Name = player2NameInput.value;
     });

  startGameBtn.addEventListener('click', function(){

    if(player1NameInput.value === "" && player2NameInput.value === ""){
          alert("Please Enter Players' name");
          startGameScreen = true;
      }else if(player1NameInput.value === "" || player2NameInput.value === " "){
          alert("Please Enter Player 1's Name");
          startGameScreen = true;
       }
       else if(player1NameInput.value === " " || player2NameInput.value === ""){
          alert("Please Enter Player 2's Name");
          startGameScreen = true;
       } else {
            var framesPerSecond = 30;
            setInterval(function() {
                move();    //move the ball
                drawAll(); //draw all items
                //moveDummyBalls();
                startGameScreen = false;
            }, 1000/framesPerSecond);
          }
  });
}


  //Game Title
  gameTitle = document.createElement('h2');
  gameTitle.textContent = 'Pong Game';
  body.appendChild(gameTitle);
  var kukuBird = document.getElementsByTagName('img')[0];
  gameTitle.appendChild(kukuBird);
  body.insertBefore(gameTitle, document.body.children[0]);
  gameTitle.style.fontFamily = "Indie Flower, cursive"


  //Restart Game Button
  restartGame = document.getElementsByTagName('Button')[1];
  // var gitHubIcon = document.getElementsByClassName('fab')[0];
  // restartGame.appendChild(gitHubIcon);
  restartGame.classList.add('close');
  restartGame.addEventListener('click', function(){
    player1Score = 0;
    player2Score = 0;
    resetBall();
  });

  //Replay Game Button
  replayGameBtn = document.getElementsByTagName('Button')[2];
   var replayIcon = document.getElementsByClassName('fa-spin')[0];
  // replayGameBtn.appendChild(replayIcon);
  replayGameBtn.classList.add('replayGameBtn');
  replayGameBtn.addEventListener('click', function(){
    if(showWinScreen){
      player1Score = 0;
      player2Score = 0;
      showWinScreen = false;
    }
  });
}
  // var framesPerSecond = 30;
  // setInterval(function() {
  //     //move();    //move the ball
  //     //drawAll(); //draw all items
  // }, 1000/framesPerSecond);

  // canvas.addEventListener('mousemove',
  //    function(event){//event holds the mouse's info
  //     var mousePos = calculateMousePos(event);
  //     //the mouse was aligning itself to the top of the paddle
  //     paddleMouseY = mousePos.y - (paddleHeight/2);//move the mouse to the center of the paddle
  //    });

var resetBall = function(){
  if(player1Score >= winningScore){         //if player 1 wins, win screen will show and ball will not reset
    player1Score = winningScore;            //the player's score will be set to
    showWinScreen = true;                   //showing win screen
  }else if (player2Score >= winningScore){  //if player 2 wins, win screen will show and ball will not reset
    player2Score = winningScore;            //the player's score will be set to
    showWinScreen = true;                   //showing win screen
  }

  ballSpeedX = -ballSpeedX;                 //re-spawn the ball in the opposite direction of where it ended
  ballSpeedY = ((Math.random() < 0.5 ? -1 : 1) * Math.random())* 10;
  ballX = canvas.width/2;                   //resets the ball in the center horizontally
  ballY = canvas.height/2;                  //resets the ball in the center vertically
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

    ballX = ballX + ballSpeedX;                                           //shifting the ball
    ballY = ballY + ballSpeedY;                                           //shifting the ball

    //ball movement horizontally
    if(ballX > canvas.width) {                                            //when the ball crosses the right side of canvas
      if(ballY > player2PaddleY && ballY < player2PaddleY+paddleHeight){
          ballSpeedX = -ballSpeedX;                                       //the ball will reverse towards the left

      //the nearer to the edge of the paddle the ball is, the steeper the angle and the faster the speed of the ball will be
          var centerOfplayer2Paddle = player2PaddleY+(paddleHeight/2);    //finding the center of the player's paddle
          var ballYOnplayer2Paddle = ballY - centerOfplayer2Paddle;       //position of ball on player's paddle
          ballSpeedY = ballYOnplayer2Paddle*0.80;

      }else {
      player1Score++;                                                     //before ballreset, to check for win state in case someone wins
      resetBall();                                                        //reset the ball when it touches the right side of the canvas, instead of bouncing off
      }
    }
    if(ballX < 0) {                                                       //when the ball touches the left side of the canvas
       if(ballY > player1PaddleY && ballY < player1PaddleY+paddleHeight){ //if the ball is between the top and bottom of the paddle, in other words, touches the paddle
        ballSpeedX = -ballSpeedX;                                         //the ball will turn back towards the right

       //the nearer to the edge of the paddle the ball is, the steeper the angle and the faster the speed of the ball will be
          var centerOfPlayer1Paddle = player1PaddleY+(paddleHeight/2);    //finding the center of the player's paddle
          var ballYOnPlayer1Paddle = ballY - centerOfPlayer1Paddle;       //position of ball on player's paddle
          ballSpeedY = ballYOnPlayer1Paddle*0.80;

       }else {
        player2Score++;                    //before ballreset, to check for win state in case someone wins
        resetBall();                       //reset the ball when it touches the left side of the canvas, instead of bouncing off
        }
    }
    //ball movement vertically
    if(ballY < 0) {                    //when the ball touches the bottom of canvas
      ballSpeedY = -ballSpeedY;        //the ball will reverse towards the top
    } else if(ballY > canvas.height) { //when the ball touches the top of the canvas
      ballSpeedY =- ballSpeedY;        //the ball will turn back towards the bottom
    }

    player2Move();
    player1Move();


}

var drawAll = function(){

  //draws the canvas
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  if(showWinScreen){                                                // a)black everything out/stops the game when someone wins
    c.fillStyle = 'white';
    c.font = '20px Arial';
    c.textAlign = 'center';

  //show which player wins
    if(player1Score >= winningScore){                              //if player 1 wins, show "Player 1 won!"
         c.fillText( player1Name+' Won! ' , 390, 190);             //display score
         c.fillText(+player1Score+ ' : ' +player2Score, 390, 140);
         c.fillText('Click to Re-Play', 390, 240);
    } else if(player2Score >= winningScore){                       //if player 2 wins, show "Player 2 won!"
          c.fillText( player2Name+' Won! ', 390, 190);             //display score
          c.fillText(+player1Score+ ' : ' +player2Score, 390, 140);
          c.fillText('Click to Re-Play', 390, 240);
    }

    return;                                                        // a)black everything out/stops the game when someone wins by returning
  }

//generate random colors
  // var getRandomColors = function(max){
  // return Math.floor(Math.random() * Math.floor(max));
  // }
  // getRandomColors(100);
  // randomColor = "rgb("+getRandomColors(100)+", "+getRandomColors(100)+", "+getRandomColors(100)+")"; //generate a random color for each ball each time the loop lopps

  // draws the player's paddle
  drawRect(0, player1PaddleY, paddleThickness, paddleHeight, 'white');                              //drawRect(x, y, width, height, drawColor )
  document.addEventListener('keydown', function(event){                                             //listens for 'keydown event on the document object'
    keystate2[event.keyCode] = true;                                                                //returns true when the particular keyCode, either 87, 83, is pressed
  });

  document.addEventListener('keyup', function(event){                                               //listens for 'keyup event on the document object'
    delete keystate2[event.keyCode];                                                                //tells the program nothing is pressed anymore, by deleting that keyCode
  });

  //draws the player2's paddle
  drawRect(canvas.width-paddleThickness, player2PaddleY, paddleThickness, paddleHeight, 'white');  //drawRect(x, y, width, height, drawColor )
  document.addEventListener('keydown', function(event){                                            //listens for 'keydown event on the document object'
    keystate[event.keyCode] = true;                                                                //returns true when the particular keyCode, either 79, 76, is pressed
  });

  document.addEventListener('keyup', function(event){                                              //listens for 'keyup event on the document object'
    delete keystate[event.keyCode];                                                                //tells the program nothing is pressed anymore, by deleting that keyCode
  });


  //draws the ball
  drawCircle(ballX, ballY, 5, 'white');



  //random radius
    // var getRandomRadius = function(max){
    //  return Math.floor(Math.random() * Math.floor(max));
    //   }
  //draws the dummyBalls
  // for(i = 0; i < 100; i++){
  //    var dummyBallRadius = getRandomRadius(50);                          //generate a random color for each ball each time the loop lopps
  //    var dummyBallX = Math.random() * canvas.width;                           // spawn the ball on random position within the canvas
  //    var dummyBallY = Math.random() * canvas.height;                          // spawn the ball on random position within the canvas
  //    drawDummyBalls(dummyBallX, dummyBallY, dummyBallRadius, 'white');
  //  }

   // var moveDummyBalls = function(){
   //  requestAnimatonFrame(moveDummyBalls);
   //  drawDummyBalls(dummyBallX, dummyBallY, dummyBallRadius, 'white');

   //  if(dummyBallX+dummyBallRadius > canvas.width || dummyBallX-dummyBallRadius < 0) {
   //    dummyDx = -dummyDy;
   //  }
   //  dummyBallX += dummyDx;
   // }
   // moveDummyBalls();

  // var netWidth = 5;
  // var netX = canvas.width/2;                                      //the position on x axis which the net is to be drawn
  // var netY = 0;                                                   //draw the net starting from y axis
  // var netGap = canvas.height/13;
  // while(netY < canvas.height){                                    //draw the number of nets needed, within the canvas height, using the canvas height as the limit
    // c.fillRect(netX, netY+netGap*0.25, netWidth, netGap*0.5);     //c.fillRect(x, y, width, height). draws the net using netY+netGap as each incremental value on the y axis
    // netY+=netGap;                                                 //increment value of netY each time a net is created, with its net gap
                                                                     //eg. 1 net+netGap is 5px, height is 600px, i can create 120 nets
  //}

  //draw nets
  for(var i = 0; i < canvas.height; i+=40){                         //draw the number of nets available within canvas, using the height as the limit
    drawRect(canvas.width/2, i, 5, 20, 'white');                    //position each net on y axis incrementally by 40
  }

  //draws the score
  c.font = '20px Arial';
  c.textAlign = 'center';
  c.fillText(player1Name+ " Score: " +player1Score, 100, 100);              //draw the text on x-100 and y-1oo
  c.fillText(player2Name+ " Score: " +player2Score, canvas.width-100, 100); //canvas.height-100 -- 100px from the right side of the canvas

}

var drawDummyBalls = function(dummyX, dummyY, dummyRadius, dummyColor){
  c.fillStyle = dummyColor;
  c.beginPath();
  c.arc(dummyX, dummyY, dummyRadius, 0,Math.PI*2, false);
  c.fill();
}

function drawCircle (centerX, centerY, radius, drawColor){
  c.fillStyle = drawColor;                                            //declaring a parameter as a value to pass in an argument for the variable
  c.beginPath();
  c.arc(centerX, centerY, radius, 0,Math.PI*2, false);                //no need to change "0,Math.PI*2, false" because to draw circles, this is fixed
  c.fill();
}

var drawRect = function(x, y, width, height, drawColor){
  c.fillStyle = drawColor;                                            //declaring a parameter as a value to pass in an argument for the variable
  c.fillRect(x, y, width, height);
}

var player2Move = function(){
  if(keystate[oUp]){                          //keystate listens for oUp keyCode
    player2PaddleY -= 10;                     //when it hears the keyCode in the 'keydown' event, it returns true
  }
    else if(keystate[lDown]){                 //keystate listens for lDown keyCode
      player2PaddleY += 10;
    }
}

var player1Move = function(){
  if(keystate2[wUp]){                         //keystate2 listens for wUp keyCode
    player1PaddleY -= 10;                     //when it hears the keyCode in the 'keydown' event, it returns true
  }
   else if(keystate2[sDown]){                 //keystate2 listens for sDown keyCode
    player1PaddleY += 10;                     //when it hears the keyCode in the 'keydown' event, it returns true
   }
}



