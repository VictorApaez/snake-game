let board = document.querySelector(".board");
let boardWidth = 15;
let frameRate = 500;
board.style.gridTemplateColumns = `repeat(${boardWidth}, 1fr)`;
board.style.gridTemplateRows = `repeat(${boardWidth}, 1fr)`;
let midBoard = Math.ceil(boardWidth / 2);

let snake = [{ x: midBoard, y: 1 }];
let apple = { x: 1, y: 1 };
let direction = { x: 0, y: 1 };

// ================ APPLE LOCATION =====================
function randomAppleLocation() {
  let num1 = Math.floor(Math.random() * boardWidth + 1);
  let num2 = Math.floor(Math.random() * boardWidth + 1);
  apple.x = num1;
  apple.y = num2;
  let approved = false;
  for (let i = 0; i < snake.length; i++) {
    if (apple.x === snake[i].x) {
      for (let j = 0; j < snake.length; j++) {
        if (apple.y === snake[j].y) {
          approved = false;
        } else approved = true;
      }
    } else approved = true;
  }
  if (approved) {
    return apple;
  } else {
    randomAppleLocation();
  }
}
randomAppleLocation();

// ================ ANIMATION =====================
function animate() {
  if (
    snake[0].x < boardWidth + 1 &&
    snake[0].x > 0 &&
    snake[0].y > 0 &&
    snake[0].y < boardWidth + 1
  ) {
    board.innerHTML = "";
    drawSnake();
    drawApple();
    update();
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, frameRate);
  } else {
    console.log("You lost my guy");
  }
}
animate();

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
  snake.forEach((section) => {
    let snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");
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
      if (direction.y === 0) {
        direction.y = -1;
        direction.x = 0;
      }
      break;
    case "ArrowDown":
      direction.y = 1;
      direction.x = 0;
      break;
    case "ArrowLeft":
      direction.y = 0;
      direction.x = -1;
      break;
    case "ArrowRight":
      direction.y = 0;
      direction.x = 1;
      break;
  }
});
