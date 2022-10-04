let gameContainer = document.querySelector(".game");

for (let i = 0; i < 100; i++) {
  let div = document.createElement("div");
  div.dataset.index = i;
  div.classList.add(`cell`);
  gameContainer.append(div);
}

let startingDiv = document.querySelector(`[data-index="35"]`);
startingDiv.style.backgroundColor = "green";
