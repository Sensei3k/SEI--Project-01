# SEI-Project-01: JavaScript Game
---

### Timeframe

7 days

## Technologies used
---

-   JavaScript (ES6)
-   HTML5 + HTML5 Audio
-   CSS
-   GitHub

## Installation
---

1.  Clone or download the repo
2.  Open the `index.html` in your browser of choice

## Space Invaders: Game Overview
---

### Introduction

![fea769f7.png](:storage/898b9b2b-10d8-430f-9953-73fc44e22109/fea769f7.png)

I decided to remake the original Japanese arcade game as best as I could called, [Space Invaders](https://en.wikipedia.org/wiki/Space_Invaders) which was released in 1978. 

The aim of the game is to defend Earth from an Alien Invasion by shooting all the invaders, the invaders also try to shoot you out of space as they progress towards earth. 


Link to my hosted version -----> [Sensei's Space Invaders](https://sensei3k.github.io/SEI-Project-01/)


### Spaceship Controls

![a297e9e4.png](:storage/898b9b2b-10d8-430f-9953-73fc44e22109/a297e9e4.png)
-   Movement: :arrow_left: :arrow_right: keys
-   Laser: Space
-   Cheat: There is a special key that the user can use to beat the game easily

### Game Instructions

1. The game begins with an overlay welcome screen which introduces the game as well as providing instructions. The game is only started by clicking on the "Start Game" button, beneath the guide on user controls.

![5f523baa.png](:storage/898b9b2b-10d8-430f-9953-73fc44e22109/5f523baa.png)

2. The game begins as soon as the user clicks the start button, before the start button is clicked all user controls are disabled and only the user spaceship is visible in the background.
 
![53d71e98.png](:storage/898b9b2b-10d8-430f-9953-73fc44e22109/53d71e98.png)

3. Points are won by shooting the Space Invaders. For each Space Invader destroyed the user is awarded 10points.

![5f710eeb.png](:storage/898b9b2b-10d8-430f-9953-73fc44e22109/5f710eeb.png)
4. At the beginning of the  game the user has 3 lives and lives are lost every time a Space Invaders laser hits the user.

![Space Lives.gif](:storage/898b9b2b-10d8-430f-9953-73fc44e22109/aac04ba9.gif)

5. There are 3 conditions that ends the game.
The first condition is to shoot all the Space Invaders. This is a win condition.

![c707aab8.png](:storage/898b9b2b-10d8-430f-9953-73fc44e22109/c707aab8.png)

 Also there are 2 lose conditions;
 -  If all players 3 lives are lost.

![726a63f0.png](:storage/898b9b2b-10d8-430f-9953-73fc44e22109/726a63f0.png)

 - If the Space Invader gets to Earth (this means the bottom of the screen).

![0122411d.png](:storage/898b9b2b-10d8-430f-9953-73fc44e22109/0122411d.png)

## Process

The starting point for this game was to create my game board and its grid. I initially began by using a grid 9 x 9, which I later increased to 11 x 11, the game board was given a class of grid and the boxes where created by adding the 'div' tag. This was all done by JavaScript, CSS and HTML. 

``````js
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      squares.push(square)
      grid.appendChild(square)
    }
    squares[userIndex].classList.add('player')
  }
  
  createBoard()
``````
``````css
.grid div {
  flex-grow: 1;
  height: calc(100% / 11);
  width: calc(100% / 11);
}
``````

After this I created the User Spaceship and add event listeners to enable movement across the board, while limiting it to only the lower row, similar to the original game.

The next step was for me to create my Space Invaders. I did this by using the `.forEach()` method to loop over each invader and giving it the class of `alien` to populate the board.

Movement of the user was set by add `event listeners` on `keyup`, which in turn gives the user horizontal movement at the bottom of th board.

### Challenges


A big challenge for me while creating the game was, to get the _invaders_ to move across and downwards towards the user spaceship whithout running off the board.
Secondly getting the invaders to drop bombs that will maintain a vertical trajectory initially proved difficult, but I enjoyed the extra level on complexity this posed to me at the time.
``````js
  function dropBomb(bombIndex) {
    let missilesIndex = bombIndex + width
    let missile = squares[missilesIndex]
    const missilesInterval = setInterval(() => {
      if (missile)
        missile.classList.remove('bomb')
      if (missilesIndex + width >= width ** 2)
        clearInterval(missilesInterval)
      else if (missile) {
        missilesIndex += width
        missile = squares[missilesIndex]
        squares[missilesIndex].classList.add('bomb')
      }
    }, 50)
  }
``````
### Wins

One of the wins I got from building this game was in implemnting audio features to simulate when a laser has been fired as well as the explosion sound on impact.
Above all this was the great sense of accomplishment and fun I had while making this game.

## Future features

A few features that I will love to include in the future are;

-   More levels
-   New Space Invaders
-   Difficulty settings e.g Play the game in Easy, Hard or Very Hard mode
-   Animation
