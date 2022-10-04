let gameContainer = document.querySelector(".game");

for (let i = 0; i < 100; i++) {
  let div = document.createElement("div");
  div.classList.add(`data-type="${i}"`);
  div.classList.add(`cell`);
  gameContainer.append(div);
}
