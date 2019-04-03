document.addEventListener('DOMContentLoaded', () => {


  //  ========= Global Scope ====================
  const grid = document.querySelector('.grid')
  const point = document.querySelector('.point')
  const livesboard = document.querySelector('.lives')
  const width = 9
  const squares = []
  let userIndex = 76
  let invaders = [0, 2, 3, 4, 5, 6, 8, 10, 11, 13, 14, 15, 16, 17]
  let intervalId = null
  let direction = 'forward'
  let points = 0
  let lives = 3

  //  =========== Create Board ====================
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }

  squares[userIndex].classList.add('player')

  // ============== FUNCTIONS ====================
  function move() {

    const player = squares.find(square => square.classList.contains('player'))

    player.classList.remove('player')

    squares[userIndex].classList.add('player')
    squares[userIndex].setAttribute('data-direction', direction)

  }

  function shootLasers() {
    // Get the index of the square above the player
    let lasersIndex = userIndex - width
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
  // ============ New Set Interval for invader Bombs ========
  const invadersBombInterval = setInterval(() => {
    const bombIndex = invaders[Math.floor(Math.random() * (invaders.length))]
    dropBomb(bombIndex)
  }, 1000)
  //User and Bomb collision
  function collision() {
    const collisionInterval = setInterval(() => {
      const currentPlayer = squares[userIndex]
      if (currentPlayer.classList.contains('bomb')) {
        currentPlayer.classList.remove('bomb')

        if (lives > 0) {
          lives--
          livesboard.textContent = lives
        }
        if (lives === 0) {
          console.log('Game Over!')
          clearInterval(collisionInterval)
          // stop EVERYTHING...
          currentPlayer.classList.remove('player')
          alert('You have failed Earth will be anahilated!!')
        }
      }
    }, 100)
  }

  collision()
  invadersBombInterval

  // ============ Event Listeners =======================
  document.addEventListener('keyup', (e) => {
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

  // ============ Alien Movement ============
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

})
