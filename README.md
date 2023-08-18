# Snake Game

This is an implementation of the classic Snake game. The game includes the snake, apples for the snake to consume, and mechanics for the snake's movement and growth. The goal is to consume as many apples as possible without the snake colliding with itself or the boundaries of the board.

You can find a live demo at the following link: https://victorapaez.github.io/snake-game/

![SNAKE_GAME_FINAL](https://github.com/VictorApaez/snake-game/assets/56009643/49b3996e-966f-497e-8fb8-5659bce17902)

## Key Features:

1. **Movement Controls:** Arrow keys control the direction of the snake.
2. **Scoring System:** Players earn points for every apple consumed.
3. **Dynamic Board:** The game board adjusts its grid based on the given `boardWidth` and `boardHeight` values.
4. **High Score:** The game keeps track of the highest score achieved.
5. **Game Over Screen:** A screen displays when the game is over, showing the current and high scores.

## How to Play:

1. Use the arrow keys to control the direction of the snake.
2. Try to eat the apple by guiding the snake towards it. Consuming the apple increases the snake's length and your score.
3. Avoid running into the board's boundaries or colliding with the snake's own body.
4. If the game ends, press 'Enter' to start a new game.
## Code Breakdown:

### 1. Initial Variables:
- Elements like the board, score display, game over display, etc. are selected from the DOM.
- Essential game parameters like `boardWidth`, `boardHeight`, and `frameRate` are set.
- The snake's initial position is set in the middle of the board.

### 2. Game Functions:

### clearBoard():
- Empties the board of all elements.

#### randomAppleLocation():
- Places the apple in a random location on the board, ensuring that it doesn't overlap with the snake.

#### snakeCollision(location):
- Checks if a given location collides with the snake's body.

#### snakeAppleCollision():
- Detects collision between the snake and the apple, increasing the score and length of the snake if they collide.

#### update():
- Updates the position of the snake based on the current direction of movement.

#### drawSnake():
- Renders the snake on the board.

#### drawApple():
- Renders the apple on the board.

#### Event Listeners:
- Listens for arrow key presses to change the direction of the snake. Also listens for the 'Enter' key to start or restart the game.

#### resetGame():
- Resets the game to its initial state.

#### displayGameOver():
- Displays the game over screen with the current and high scores.

#### snakeInsideBoundary():
- Checks if the snake is within the board's boundaries and if it has collided with itself.

#### animate():
- The main game loop updates the game state, checks for collisions, and renders game elements.

### 3. Game Execution:
- The apple is given an initial random position and the `animate()` function is called to start the game.

## Resources

Image of arcade background:
Alex Dixon - https://dribbble.com/shots/3045074-Asteroids-Retro-Arcade-Machine
