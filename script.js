let gameContainer = document.querySelector(".game");

for (let i = 0; i < 100; i++) {
  let div = document.createElement("div");
  div.dataset.index = i;
  div.classList.add(`cell`);
  gameContainer.append(div);
}

let index = 35;
let direction = 10;
let running = true;
let snake = [index, 34, 33, 32, 31, 30];
let snakeLength = snake.length;

function animate() {
  let prevIndex = snake[snake.length - 1];

  // draw
  for (let i = 0; i < snake.length; i++) {
    let startingDiv = document.querySelector(`[data-index = "${snake[i]}"]`);
    startingDiv.style.backgroundColor = "green";
  }
  // update
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = snake[i - 1];
  }
  snake[0] += direction;
  // delete last div
  let lastDiv = document.querySelector(`[data-index = "${prevIndex}"]`);
  lastDiv.style.backgroundColor = "";
  // draw updated div
  startingDiv = document.querySelector(`[data-index = "${snake[0]}"]`);
  if (startingDiv === null) console.log("lost");
  startingDiv.style.backgroundColor = "green";

  setTimeout(function () {
    window.requestAnimationFrame(animate);
  }, 500);
}
animate();

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowDown":
      direction = 10;
      break;
    case "ArrowUp":
      direction = -10;
      break;
    case "ArrowRight":
      direction = 1;
      break;
    case "ArrowLeft":
      direction = -1;
      break;
  }
});
