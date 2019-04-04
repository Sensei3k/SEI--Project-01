document.addEventListener('DOMContentLoaded', () => {


  //  ========= Global Scope ====================
  const grid = document.querySelector('.grid')
  const point = document.querySelector('.point span')
  const livesboard = document.querySelector('.lives span')
  const width = 9
  const startButton = document.querySelector('.button')
  const overlay = document.querySelector('.overlay')
  const hidden = document.querySelector('.hidden')
  const resetButton = document.querySelector('.reset')
  const squares = []
  let userIndex = 76
  let invaders = [0, 2, 3, 4, 5, 6, 8, 10, 11, 13, 14, 15, 16, 17]
  let intervalId = null
  let direction = 'forward'
  let points = 0
  let lives = 1
  let invadersBombInterval = null
  let collisionInterval = null
  let currentPlayer = null
  let gameInPlay = false
  let player = null


  //  =========== Create Board ====================
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      squares.push(square)
      grid.appendChild(square)
    }
    squares[userIndex].classList.add('player')
  }
  createBoard()

  // ============== FUNCTIONS ====================

  function startGame() {
    //call all functions to start the game eg. move()
    overlay.style.display = 'none'
    hidden.style.display = 'none'
    gameInPlay = true
    userIndex = 76
    lives = 1
    points = 0
    invaders = [0, 2, 3, 4, 5, 6, 8, 10, 11, 13, 14, 15, 16, 17]
    livesboard.textContent = lives
    point.textContent = points
    squares.forEach(square => square.classList.remove('alien'))
    moveAliens()
    squares[userIndex].classList.add('player')
    move()
    collisionInterval = setInterval(() => {
      currentPlayer = squares[userIndex]
      if (currentPlayer.classList.contains('bomb')) {
        currentPlayer.classList.remove('bomb')
        if (lives > 0) {
          lives--
          livesboard.textContent = lives
        }
        if (lives === 0) {
          gameOver()
        }
      }
    }, 100)

    invadersBombInterval = setInterval(() => {
      // ============ New Set Interval for invader Bombs ========
      const bombIndex = invaders[Math.floor(Math.random() * (invaders.length))]
      dropBomb(bombIndex)
    }, 1000)
  }

  function gameOver() {
    console.log('Game Over!')
    hidden.style.display = 'flex'
    gameInPlay = false
    currentPlayer.classList.remove('player')
    squares.forEach(square => square.classList.remove('alien'))
    clearInterval(invadersBombInterval)
    clearInterval(collisionInterval)
    clearInterval(intervalId)
  }

  function reset() {
    startGame()
  }

  //============== PLAYER FUNCTIONS ====================
  function move() {
    player = squares.find(square => square.classList.contains('player'))

    player.classList.remove('player')

    squares[userIndex].classList.add('player')
    squares[userIndex].setAttribute('data-direction', direction)
  }

  function shootLasers() {
    // Get the index of the square above the player
    let lasersIndex = userIndex
    // Get the DOM element of the square above the player
    let lasers = squares[lasersIndex]
    // Move missiles up
    const lasersInterval = setInterval(() => {
      // Remove missiles class from the current square
      lasers.classList.remove('laser')
      // if laser hits an alien
      if (lasers.classList.contains('alien')) {
        // stop the interval
        clearInterval(lasersInterval)
        // remove class of alien
        lasers.classList.remove('alien')
        // increment the score
        points += 10
        //   find the index to remove using .indexOf
        const index = invaders.indexOf(lasersIndex)
        //   remove the index using .splice
        invaders.splice(index, 1)
        console.log(points)
      } else { // Set the new index for the missiles square
        // if laser goes off the top of the board
        if (lasersIndex - width < 0) clearInterval(lasersInterval)
        else {
          lasersIndex -= width
          // Get the new DOM element of the next square
          lasers = squares[lasersIndex]
          // Add missiles class to the next square up
          lasers.classList.add('laser')
        }
      }
      point.innerText = points
      //...repeat every 100ms
    }, 100)
  }

  //============== ALIEN FUNCTIONS ====================
  function dropBomb(bombIndex) {
    let missilesIndex = bombIndex + width
    let missile = squares[missilesIndex]
    const missilesInterval = setInterval(() => {
      if (missile) missile.classList.remove('bomb')
      if (missilesIndex + width >= width ** 2) clearInterval(missilesInterval)
      else if (missile) {
        missilesIndex += width
        missile = squares[missilesIndex]
        squares[missilesIndex].classList.add('bomb')
      }
    }, 100)
  }

  // ============ Alien Movement ============
  function moveAliens() {
    invaders.forEach(alien => {
      squares[alien].classList.add('alien')
    })

    intervalId = setInterval(() => {
      squares.forEach(square => square.classList.remove('alien'))
      invaders = invaders.map(alien => alien + 1)

      invaders.forEach(alien => {
        squares[alien].classList.add('alien')
      })

      if (invaders.some(alien => alien >= 80)) clearInterval(intervalId)

    }, 1000)
  }

  // ============ Event Listeners =======================
  document.addEventListener('keyup', (e) => {
    if (!gameInPlay) return false
    switch (e.keyCode) {
      case 37:
        // left
        if (userIndex % width > 0) {
          userIndex--
          direction = 'backward'
          move()
        }
        break

      case 39:
        // right
        if (userIndex % width < width - 1) {
          userIndex++
          direction = 'forward'
          move()
        }
        break

      case 32:
        // spacebar
        shootLasers()
        break
    }
  })

  startButton.addEventListener('click', startGame)
  resetButton.addEventListener('click', reset)


})

// gameInPlay = true
