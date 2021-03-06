document.addEventListener('DOMContentLoaded', () => {

  //  ========= Global Scope ===========================================
  const grid = document.querySelector('.grid')
  const point = document.querySelector('.point span')
  const livesboard = document.querySelector('.lives span')
  const startButton = document.querySelector('.button')
  const overlay = document.querySelector('.overlay')
  const hidden = document.querySelector('.hidden')
  const resetButton = document.querySelector('.reset')
  const missileAudio = document.querySelector('.laser_audio')
  const invaderExplosion = document.querySelector('.invader_killed')
  const userHit = document.querySelector('.player_hit')
  const lifeLost = document.querySelector('.life_lost')
  const message = document.querySelector('.para')
  const squares = []
  const width = 11
  let userIndex = 115
  let invaders = [
    0,
    1,
    3,
    5,
    7,
    9,
    11,
    13,
    15,
    17,
    19,
    21,
    23,
    25
  ]
  let intervalId = null
  let direction = 'forward'
  let points = 0
  let lives = 3
  let invadersBombInterval = null
  let collisionInterval = null
  let currentPlayer = null
  let gameInPlay = false
  let player = null

  //  =========== Create Board ===========================================
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      squares.push(square)
      grid.appendChild(square)
    }
    squares[userIndex].classList.add('player')
  }
  createBoard()

  // ============== FUNCTIONS =======================================

  function startGame() {
    //call all functions to start the game eg. move()
    overlay.style.display = 'none'
    hidden.style.display = 'none'
    gameInPlay = true
    userIndex = 115
    lives = 3
    points = 0
    invaders = [
      0,
      2,
      4,
      6,
      8,
      10,
      12,
      14,
      16,
      18,
      20,
      22,
      24,
      26
    ]
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
          lifeLost.play
          lives--
          livesboard.textContent = lives
        }
        if (lives === 0) {
          userHit.play()
          gameOver()
          message.textContent = 'You had just one job man!!! Earth has fallen!'
        }
      }
    }, 100)

    invadersBombInterval = setInterval(() => {
      // ============ New Set Interval for invader Bombs ====================
      const bombIndex = invaders[Math.floor(Math.random() * (invaders.length - 1))]
      dropBomb(bombIndex)
    }, 700)
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

  function pause() {
    clearInterval(invadersBombInterval)
    clearInterval(collisionInterval)
    clearInterval(intervalId)
  }

  function reset() {
    startGame()
  }

  //============== PLAYER FUNCTIONS =====================================
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
        // play explosion sound
        invaderExplosion.play()
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
        if (lasersIndex - width < 0)
          clearInterval(lasersInterval)
        else {
          lasersIndex -= width
          // Get the new DOM element of the next square
          lasers = squares[lasersIndex]
          // Add missiles class to the next square up
          lasers.classList.add('laser')
        }
      }
      if (invaders.length === 0) {
        gameOver()
        message.textContent = `Well done! you saved Earth, with a highscore of ${points}`
      }

      point.innerText = points
      //...repeat every 100ms
    }, 100)
  }

  //============== ALIEN FUNCTIONS =====================================
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

  // ============ Alien Movement ======================================
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

      if (invaders.some(alien => alien >= 109)) {
        clearInterval(intervalId)
        gameOver()
        message.textContent = 'The Aliens reached Earth'
      }
    }, 200)
  }

  // ============ Event Listeners ========================================
  document.addEventListener('keyup', (e) => {
    if (!gameInPlay)
      return false
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
        e.preventDefault()
        missileAudio.pause()
        missileAudio.currentTime = 0
        missileAudio.play()
        shootLasers()
        break

      case 80:
        pause()
        break
    }
  })

  startButton.addEventListener('click', startGame)
  resetButton.addEventListener('click', reset)

})
