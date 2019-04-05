# SEI-Project-01: JavaScript Game

### Timeframe

7 days

## Technologies used

-   JavaScript (ES6)
-   HTML5 + HTML5 Audio
-   CSS
-   GitHub

## Installation

1.  Clone or download the repo
2.  Open the `index.html` in your browser of choice

## Overview

Space Invaders is a Japanese shooting video game released in 1978 by Taito. It was developed by Tomohiro Nishikado. This is my remake of a game dubbed 'The highest-grossing game' of all time.
_Screen shot_

![Beyoncé](https://media.giphy.com/media/RX7N03MEUafW8/giphy.gif)

_Link to live site_

### Introduction

_Description of the game_

### Controls

_User controls_

#### Spaceship Controls

-   Movement: :arrow_left: :arrow_right: keys
-   Laser: Space
-   Cheat: There is a special key that the user can use to beat the game easily

### Game Instructions

1.The game begins with an overlay welcome screen which introduces the game as well as providing instructions. The game is only started by clicking on the "Start Game" button, beneath the guide on user controls.

2.The game begins as soon as the user clicks the start button, before the start button is clicked all user controls are disabled and only the user spaceship is visible in the background.

3.Points are won by shooting the Space Invaders. For each Space Invader destroyed the user is awarded 10points.

4. At the beginning of the  game the user has 3 lives and lives are lost every time a Space Invaders laser hits the user.

5.There are 3 conditions to end the game.
The first condition is to shoot all the Space Invaders. This is a win condition.

Also there are 2 lose conditions
If all players lives are lost.
If the Space Invader gets to Earth (this means the bottom of the screen).
## Process

_Describe the process of building the game. How did you get started? How did you manage your time? How would you do things next time?_
The starting point for this game was to create my game board and its grid. I initially began by using a grid 9 x 9, which I later increased to 11 x 11, the game board was given a class of grid and the boxes where created by adding the 'div' tag. This was all done by JavaScript and CSS.  

After this I created the User Spaceship and add event listeners to enable movement across the board, while limiting it to only the lower row, similar to the original game.

The next step was for me to create my Space Invaders. I did this by 

### Challenges

_Describe the biggest challenges. How did you overcome them? Did you decide to pivot because of time constraints? What did you learn from these problems?_
A big challenge for me while creating the game was,

### Wins

_Describe the wins. What are you most proud of? What did this project help you to understand the most?_
One

## Future features

A few features will be added in the future such as;

-   More levels
-   New Space Invaders
-   Difficulty settings
-   Animation
