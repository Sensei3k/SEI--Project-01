document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  const width = 9
  const squares = []
  let userIndex = 76
  let invaders = [0, 2, 4, 5, 6, 8, 10, 11, 12, 14]
  // let direction = 'forward'


  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }

  squares[userIndex].classList.add('player')

  function move() {

    const player = squares.find(square => square.classList.contains('player'))

    player.classList.remove('player')

    squares[userIndex].classList.add('player')
    // squares[userIndex].setAttribute('data-direction', direction)

  }

  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 37:
        // left
        if (userIndex % width > 0) {
          userIndex--
          // direction = 'backward'
          move()
        }
        break

      case 39:
        // right
        if (userIndex % width < width - 1) {
          userIndex++
          // direction = 'forward'
          move()
        }
        break
    }
  })


  invaders.forEach(alien => {
    squares[alien].classList.add('alien')
  })

  setInterval(() => {

    invaders.forEach(alien => {
      squares[alien].classList.remove('alien')
    })
    invaders = invaders.map(alien => alien + 1)

    invaders.forEach(alien => {
      squares[alien].classList.add('alien')
    })

  }, 1000)

  // // createAliens()
  // let moveIndex = 0
  // let invaders = [1, 13, -1, -13]
  //
  //
  // function moveAliens(movement) {
  //   invaders.forEach(aliens => {
  //     squares[aliens].classList.remove('aliens')
  //   })
  //   invaders = invaders.map(aliens => aliens + movement)
  //   invaders.forEach(aliens => {
  //     squares[aliens].classList.add('aliens')
  //   })
  // }
  //
  // setInterval(() => {
  //   moveIndex = moveIndex === 3 ? 0 : moveIndex + 1
  //   moveAliens(moves[[moveIndex]])
  // }, 800)
  //


})
