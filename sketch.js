var playerPaddle;
var computerpaddle;
const rand1 = Math.floor(Math.random() * (30 - -30 + 1)) + -30;
const rand2 = Math.floor(Math.random() * (20 - -20 + 1)) + -20;
let collision = false;
let sound;
let gameState = "menu";
let score = 0;
let playerhits = 0;
let computerhits = 0;
let pauseMessage = "";
let playerScore = 0;
let computerScore = 0;

let baseSize;

let startButton;
let restartButton;

let continueButton;

let pauseStart;
let pauseDuration = 3000;
let pauseAlpha;
let fadePhase = "in";

let QRpic;
let MAP1;
let MAP2;

function preload() {
  sound = loadSound("cinematic-impact-hit-352702.mp3");
  QRpic = loadImage("google-form-game-debug.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight).elt.focus();
  startButton = createButton("START");
  startButton.position(
    innerWidth / 2 - startButton.width / 2,
    innerHeight - 3 * (innerHeight / 8) - startButton.height / 2
  );
  startButton.style("font-size", "24px");
  startButton.hide();

  continueButton = createButton("CONTINUE");
  continueButton.position(
    innerWidth / 2 - startButton.width / 2,
    innerHeight - 2 * (innerHeight / 8) - startButton.height / 2
  );
  continueButton.style("font-size", "24px");
  continueButton.hide();

  //player Paddle
  gameState = "menu";
  playerPaddle = new Paddle();
  computerpaddle = new Paddle();
  ball = new Ball();
  ball.side = 20;
  ball.xVel = rand1;
  ball.yVel = rand2;
  // ball.yVel = 0;
}

function draw() {
  windowResized();
  //set background to black
  background("rgb(7,0,0)");

  if (gameState == "menu") {
    if (startButton && startButton.elt.style.display === "none") {
      startButton.show();
    }
    startButton.mousePressed(() => {
      gameState = "start";
      startButton.hide();
    });

    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(baseSize * 2.2);
    text("click here to play the og ", innerWidth / 2, innerHeight / 2);
    textStyle(BOLDITALIC);
    textSize(55);
    text(
      `SCORE : ${score}`,
      innerWidth / 2,
      innerHeight - 2 * (innerHeight / 3)
    );
  }

  // gameState = start
  if (gameState == "start") {
    startButton.hide();
    playerPaddle.xPosition = innerWidth - 55;
    playerPaddle.yPosition = mouseY;
    computerpaddle.xPosition = 10;
    // ball.xVel = rand1;
    // ball.yVel = rand1;

    ball.move();
    if (ball.xVel === 0 || ball.yVel === 0) {
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      textSize(baseSize * 1.2);
      text(
        "DAMM WAHT ARE THE CHANCES OF OF GETTING 0 OUT OF AN RNG OF -20 TO 20 ",
        innerWidth / 2,
        innerHeight / 2
      );
    }
    // move();
    // better ai
    // computerpaddle.yPosition = ball.yPosition

    // logic to bounce off the paddel
    let playerhit = isTouching(
      ball.xPosition,
      ball.yPosition,
      ball.side,
      ball.side,
      playerPaddle.xPosition,
      playerPaddle.yPosition,
      playerPaddle.width,
      playerPaddle.height
    );
    let computerhit = isTouching(
      ball.xPosition,
      ball.yPosition,
      ball.side,
      ball.side,
      computerpaddle.xPosition,
      computerpaddle.yPosition,
      computerpaddle.width,
      computerpaddle.height
    );
    if (playerhit || computerhit) {
      ball.xVel *= -1;
      ball.yVel += random(-5, 5);
      sound.play();
      if (playerhit) {
        playerhits += 1;
      }
      if (computerhit) {
        computerhits += 1;
      }
    }

    // logic to bounce the ball off of the boundries
    if (ball.yPosition <= 0 || ball.yPosition >= innerHeight) {
      ball.yVel *= -1;
    }
    // logic to make the computer Paddle smarter
    if (ball.xVel < 0) {
      computerpaddle.yPosition +=
        (ball.yPosition - computerpaddle.yPosition) * 0.069;
    }
    if (computerpaddle.yPosition + computerpaddle.height / 2 >= innerHeight) {
      computerpaddle.yPosition = innerHeight - computerpaddle.height / 2;
    }
    if (computerpaddle.yPosition - computerpaddle.height / 2 <= 0) {
      computerpaddle.yPosition = computerpaddle.height / 2;
    }
    // logic to make it more hard
    if (computerhits + playerhits >= 20 && ball.xVel < 16) {
      if (computerhit || playerhit) {
        computerpaddle.yPosition +=
          (ball.yPosition - computerpaddle.yPosition) * 0.9;
        ball.xVel *= 1.25;
      }
    }
    if (ball.xPosition > innerWidth) {
      computerScore += 1;
      startPause("Computer Scores TAKE THE L BOZO 🤡");
      pauseMessage = "Computer Scores TAKE THE L BOZO 🤡";
      gameState = "pause";
      ball.freeze();
      console.log("Player lost");
    }
    if (ball.xPosition < 0) {
      playerScore += 1;
      startPause("YOU 🫵 Scored");
      pauseMessage = "YOU 🫵 Scored";
      gameState = "pause";
      ball.freeze();
      console.log("Computer lost");
    }

    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(70);
    text(
      `${computerScore}:${playerScore}`,
      innerWidth / 2,
      innerHeight - 2 * (innerHeight / 3)
    );
    //display everyhting at the very last !  !  !
    ball.display();
    computerpaddle.display();
    playerPaddle.display();
  }
  if (playerhits > computerhits + 5 && gameState =="start") {
    textSize(baseSize);
    textAlign(CENTER, CENTER);

    text("congrats  you found a bug 🪲", innerWidth / 2, innerHeight / 2);
    imageMode(CENTER);
     let size = min(windowWidth, windowHeight) * 0.2; // 20% of smaller dimension
    image(QRpic, innerWidth / 2, innerHeight / 2 +100, size, size);
    // image(QRpic, innerWidth / 5, innerHeight / 5,MAP1,MAP2);
  }
  // gameState = pause
  if (gameState == "pause") {
    ball.freeze();

    // fill(255,pauseAlpha);
    // textSize(baseSize);
    
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    textSize(baseSize*2.2);
    text(`${computerScore}:${playerScore}`,innerWidth / 2, innerHeight - 2 * (innerHeight / 3));
    textSize(baseSize);
    text(pauseMessage, innerWidth / 2, innerHeight - 3 * (innerHeight / 9));
    if (continueButton && continueButton.elt.style.display === "none") {
      continueButton.show();
    }
    continueButton.mousePressed(() => {
      gameState = "start";
      continueButton.hide();
      move();
    });

    //  TOO  COMPLICATED TO ANIMATE FADEIN AND OUT
    // if(fadePhase == "in"){
    //   pauseAlpha += 10;
    //   if(pauseAlpha >255){
    //     pauseAlpha = 255;
    //     fadePhase = "hold";
    //     pauseStart = millis();
    //   }
    // }else if (fadePhase ==="hold"){
    //   if(millis() - pauseStart >= pauseDuration){
    //     fadePhase = "out";
    //       }
    //     }else if(fadePhase === "out"){
    //       pauseAlpha -=10;
    //   if(pauseAlpha < 0){
    //     pauseAlpha = 0;
    //     gameState = "start"
    //   }
    // }
    // text("Paused", 200, 200);
    // ball.display();
    // computerpaddle.display();
    // playerPaddle.display();
    // Restart();
  }

  // add end state

  if (gameState == "end") {
    text("game end ", 100, 100);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(70);
    text(
      `${computerScore}:${playerScore}`,
      innerWidth / 2,
      innerHeight - 2 * (innerHeight / 1)
    );
    ball.freeze();

    if (gameWinner === "Player") {
      fill(0, 255, 0);
      text("🎉 YOU WIN! 🎉", innerWidth / 2, innerHeight / 2 - 100);
    } else {
      fill(255, 0, 0);
      text("💀 COMPUTER WINS! 💀", innerWidth / 2, innerHeight / 2 - 100);
    }


    // Restart();
  }

  // console.log(ball.xPosition, ball.yPosition);
}
//draw ends here

function startPause(message) {
  ball.xPosition = innerWidth / 2;
  ball.yPosition = innerHeight / 2;
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  textSize(baseSize);
  text(message, innerWidth / 2, innerHeight - 3 * (innerHeight / 9));
  pauseStart = millis();
  pauseAlpha = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  baseSize = min(windowWidth, windowHeight) * 0.05;
  textSize(baseSize);
}
function isTouching(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (
    x1 + w1 / 2 >= x2 - w2 / 2 &&
    x1 - w1 / 2 <= x2 + w2 / 2 &&
    y1 + h1 / 2 >= y2 - h2 / 2 &&
    y1 - h1 / 2 <= y2 + h2 / 2
  ) {
    return true;
  } else {
    return false;
  }
}
function keyPressed() {
  console.log(key);
  if (key == "p") {
    console.log("Pause");
    gameState = "pause";
  }
}
function startGame() {
  gameState = "start";
}
function move() {
  ball.xVel = random(-30, 30);
  ball.yVel = random(-20, 20);
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// function Restart(){
// text('click here to Restart',100,100 )
// let continue_button = createButton('Continue')
// let restart_button = createButton('Restart')
//   continue_button.position(innerWidth - (3*(innerWidth)/2))
// console.log("Restart");

// }
