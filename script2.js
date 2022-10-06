let board = document.querySelector(".board");
let gameOver = document.querySelector(".game-over");
let restartGameBtn = document.querySelector(".restart-game");
let boardWidth = 11;
let frameRate = 200;
board.style.gridTemplateColumns = `repeat(${boardWidth}, 1fr)`;
board.style.gridTemplateRows = `repeat(${boardWidth}, 1fr)`;
let midBoard = Math.ceil(boardWidth / 2);

let snake = [
  { x: midBoard, y: 3 },
  { x: midBoard, y: 2 },
  { x: midBoard, y: 1 },
];
let apple = { x: 1, y: 1 };
let direction = { x: 0, y: 1 };

// ================ APPLE LOCATION =====================
function randomAppleLocation() {
  let num1 = Math.floor(Math.random() * boardWidth + 1);
  let num2 = Math.floor(Math.random() * boardWidth + 1);
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
  for (let i = 1; i < snake.length; i++) {
    if (JSON.stringify(snake[i]) === JSON.stringify(location)) {
      result = true;
    }
  }
  return result;
}

// ================ SNAKE - APPLE COLLISION =====================
function snakeAppleCollision() {
  if (snakeCollision(apple)) {
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
// ================ ANIMATION =====================
randomAppleLocation(); // give apple a random location in the start
function animate() {
  if (
    snake[0].x <= boardWidth &&
    snake[0].x > 0 &&
    snake[0].y > 0 &&
    snake[0].y <= boardWidth &&
    !snakeCollision(snake[0])
  ) {
    board.innerHTML = "";
    update();
    snakeAppleCollision();
    drawSnake();
    drawApple();

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, frameRate);
  } else {
    gameOver.showModal();
  }
}
animate();
