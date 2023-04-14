//snake food
const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.highscore');

let gameOver = false;
let foodX = 13,
  foodY = 10;

//snake head
let snakeX = 5,
  snakeY = 10;
//snake body
let snakeBody = [];

let velocityX = 0,
  velocityY = 0;
let score = 0;
//getting high score from the local storage
let highScore = localStorage.getItem('high-score') || 0;
highScoreElement.innerHTML = `High Score : ${highScore}`;

let setIntervalId;

const changeFoodPosition = () => {
  //pass a random value between 0 - 30 as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  //clearing timer and reloading page on game over
  clearInterval(setIntervalId);
  alert('Game over ! Press OK to replay . . .');
  location.reload();
};

const changeDirection = (e) => {
  //changing velocity value based on key press

  if (e.key === 'ArrowUp' && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === 'ArrowDown' && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === 'ArrowLeft' && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === 'ArrowRight' && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  initGame();
};

const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class='food' style='grid-area: ${foodY} / ${foodX}'></div>`;

  //check if snake hit food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    //push food position to snake body array
    snakeBody.push([foodX, foodY]);
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem('high-score', highScore);
    scoreElement.innerHTML = `Score : ${score}`;
    highScoreElement.innerHTML = `High Score : ${highScore}`;
  }

  //shifting forward the elements of snakeBody by 1
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  //setting first element of snake body to current snake position
  snakeBody[0] = [snakeX, snakeY];

  //updating snake head position based on current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  //check if snake head is out of wall
  if (snakeX <= 0 || snakeY > 30 || snakeY <= 0 || snakeX > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    //adding a div for each part of snake's body
    htmlMarkup += `<div class='snake-head' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
    //check for snake head hit body
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    )
      gameOver = true;
  }
  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 200);
document.addEventListener('keydown', changeDirection);

//perloader call
function changeLoader() {
  let loader = document.getElementById('preloader');
  setTimeout(() => {
    loader.style.display = 'none';
  }, 1500);
}

window.addEventListener('load', changeLoader());
