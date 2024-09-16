How to run the game

- Open the game in Cocos creator 2.2. We are using Cocos creator 2.2
- Go to the start scene and press the play button
- Enjoy the game and have fun!

Complete Game Process

- The entire game process is complete, including a win scene, game over scene, and
  scene transition scene that moves appropriately
- You can also select levels in the game

Collision

- There is proper collision with objects
- Camera move according to players
- There is two different world maps

Level Design

- There is a static wall where the wall don't move past the start if player move left
- There is two questions blocks:
  - A coin block where you earn a coin if you hit it
  - A music box where you have 50/50 chance of a 1up extra life or an extra coin

Basic Rules (Player)

- Player have correct physics properties
- Player can be control using A to move left, D to move right, and W to jump
- When player get touched by enemies, it either dies, or has its life decrease
- When a player go out of bound he will die
- When a player die, the player will be reborn in original position with his score reduces to 0
-

Basic Rules (enemies)

- enemies have correct properties
- there is two type of enemies:
  - Regular goomba that just move around
  - Turtle that shoots shells every interval
- Both enemies can be killed by jumping on their heads

Question Blocks

- There is two questions blocks:
  - A coin block where you earn a coin if you hit it
  - A music box where you have 50/50 chance of a 1up extra life or an extra coin

Animations

- There is animation for the player when they run and jump
- There is animation for goomba when they get stomped
- There is animation for turtle when they throw shells

Sound Effects (10%)

- There is 3 bgm, for start scene and both levels
- There is player jump and die effect
- There is sound effect for hitting the special blocks, as well as killing the enemies
- Sound effects doesn't stop BGM

UI (10%)

- There is player life, player score, and timer that shows above the player character

Appearance (5%)

- I try my best to replicate the look of the original game without copying it entirely

Advanced

- I try my best to replicate the physics of the original game
- so I made it such that the player accelerate when moving
- In addition, if the player hits the goomba or the turtle, they get an extra bounce which is meant to replicate the original game
