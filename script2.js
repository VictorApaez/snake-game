let board = document.querySelector(".board");
let boardWidth = 25 + 1;
board.style.gridTemplateColumns = `repeat(${boardWidth - 1}, 1fr)`;
board.style.gridTemplateRows = `repeat(${boardWidth - 1}, 1fr)`;
let midBoard = Math.ceil(boardWidth / 2);

let snake = [
  { x: midBoard, y: 4 },
  { x: midBoard, y: 3 },
  { x: midBoard, y: 2 },
  { x: midBoard, y: 1 },
];
let apple = [{ x: 3, y: 3 }];

let direction = { x: 0, y: 1 };
function animate() {
  if (
    snake[0].x < boardWidth &&
    snake[0].x > 0 &&
    snake[0].y > 0 &&
    snake[0].y < boardWidth
  ) {
    board.innerHTML = "";
    drawSnake();
    drawApple();
    update();
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 200);
  } else {
    console.log("You lost my guy");
  }
}
animate();

function update() {
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }
  snake[0].y += direction.y;
  snake[0].x += direction.x;
}

function drawSnake() {
  snake.forEach((section) => {
    let snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");
    snakeElement.style.gridColumnStart = section.x;
    snakeElement.style.gridRowStart = section.y;
    board.appendChild(snakeElement);
  });
}

function drawApple() {
  let appleElement = document.createElement("div");
  appleElement.classList.add("apple");
  appleElement.style.gridColumnStart = apple[0].x;
  appleElement.style.gridRowStart = apple[0].y;
  board.append(appleElement);
}

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
