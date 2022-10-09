let board = document.querySelector(".board");
let scoreElement = document.querySelector(".score");
let lose = document.querySelector(".game-over");
let startGameDiv = document.querySelector(".start-game");
let restartGameBtn = document.querySelector(".restart-game-btn");
let highScoreElement = document.querySelector(".high-score");
let boardWidth = 15;
let boardHeight = 10;
let frameRate = 200;
let highScore = 0;
let currentScore = 0;
board.style.gridTemplateColumns = `repeat(${boardWidth}, 1fr)`;
board.style.gridTemplateRows = `repeat(${boardHeight}, 1fr)`;
let midBoard = Math.ceil(boardWidth / 2);
let snake = [
  { x: midBoard, y: 3 },
  { x: midBoard, y: 2 },
  { x: midBoard, y: 1 },
];
let apple = { x: 1, y: 1 };
let direction = { x: 0, y: 1 };
// ================ CLEAR BOARD =====================

function clearBoard() {
  board.innerHTML = "";
}
// ================ APPLE LOCATION =====================
function randomAppleLocation() {
  let num1 = Math.floor(Math.random() * boardWidth + 1);
  let num2 = Math.floor(Math.random() * boardHeight + 1);
  let location = { x: num1, y: num2 };
  if (snakeCollision(location)) {
    randomAppleLocation();
  } else {
    apple.x = num1;
    apple.y = num2;
  }
}
// ================ SNAKE COLLISION =====================
function snakeCollision(location) {
  let result = false;
  for (let i = 1; i < snake.length - 1; i++) {
    if (JSON.stringify(snake[i]) === JSON.stringify(location)) {
      result = true;
    }
  }
  return result;
}

// ================ SNAKE - APPLE COLLISION =====================
function snakeAppleCollision() {
  if (snakeCollision(apple)) {
    currentScore += 1;
    scoreElement.textContent = `${currentScore}`;
    randomAppleLocation();
    snake.push(snake.at(-1));
  }
}

// ================ UPDATE =====================
function update() {
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }
  snake[0].y += direction.y;
  snake[0].x += direction.x;
}
// ================ DRAW SNAKE =====================
function drawSnake() {
  snake.forEach((section, i) => {
    let snakeElement = document.createElement("div");
    if (i === 0) {
      snakeElement.classList.add("snake-head");
    } else {
      snakeElement.classList.add("snake");
    }
    snakeElement.style.gridColumnStart = section.x;
    snakeElement.style.gridRowStart = section.y;

    board.appendChild(snakeElement);
  });
}
// ================ DRAW APPLE =====================
function drawApple() {
  let appleElement = document.createElement("div");
  appleElement.classList.add("apple");
  appleElement.style.gridColumnStart = apple.x;
  appleElement.style.gridRowStart = apple.y;
  board.append(appleElement);
}
// ================ EVENT LISTENERS =====================
addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y !== 1) {
        direction.y = -1;
        direction.x = 0;
      }
      break;
    case "ArrowDown":
      if (direction.y !== -1) {
        direction.y = 1;
        direction.x = 0;
      }
      break;
    case "ArrowLeft":
      if (direction.x !== 1) {
        direction.y = 0;
        direction.x = -1;
      }
      break;
    case "ArrowRight":
      if (direction.x !== -1) {
        direction.y = 0;
        direction.x = 1;
      }
      break;
  }
});
// Hit Enter to start/restart game
addEventListener("keydown", (e) => {
  if (lose.style.display === "flex" && e.code === "Enter") {
    board.style.display = "grid";
    lose.style.display = "none";
    resetGame();
    randomAppleLocation();
    animate();
  }
  if (startGameDiv.style.display === "") {
    startGameDiv.style.display = "none";
    board.style.display = "grid";
    lose.style.display = "none";
    resetGame();
    randomAppleLocation();
    animate();
  }
});
// ================ RESET GAME =====================

function resetGame() {
  clearBoard();
  currentScore = 0;
  scoreElement.textContent = `${currentScore}`;
  snake = [
    { x: midBoard, y: 3 },
    { x: midBoard, y: 2 },
    { x: midBoard, y: 1 },
  ];
  apple = { x: 1, y: 1 };
  direction = { x: 0, y: 1 };
}
// ================ DISPLAY GAME-OVER =====================

function displayGameOver() {
  lose.style.display = "flex";
  board.style.display = "none";
  if (currentScore > highScore) {
    highScore = currentScore;
  }
  highScoreElement.textContent = `High Score: ${highScore}`;
}
// ================ SNAKE BOUNDARIES =====================

function snakeInsideBoundary() {
  let nextHeadPos = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };
  return (
    snake[0].x + direction.x <= boardWidth &&
    snake[0].x + direction.x > 0 &&
    snake[0].y + direction.y > 0 &&
    snake[0].y + direction.y <= boardHeight &&
    !snakeCollision(nextHeadPos)
  );
}

// ================ ANIMATION =====================
// randomAppleLocation(); // give apple a random location in the start
function animate() {
  if (snakeInsideBoundary()) {
    clearBoard();
    update();
    snakeAppleCollision();
    drawSnake();
    drawApple();
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, frameRate);
  } else {
    displayGameOver();
  }
}
// animate();
