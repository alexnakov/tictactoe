const CIRCLE_CLASS = 'circle'
const X_CLASS = 'x'
let circleTurn = true;
const cellElements = document.querySelectorAll('[data-cell]')
const grid = document.getElementsByClassName('grid')[0]

startGame()

function startGame() {
  cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})
  })

  MarkHover()
}


function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  swapTurn()
  MarkHover()
  
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurn() {
  circleTurn = !circleTurn
}

function MarkHover() {
  grid.classList.remove(X_CLASS)
  grid.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    grid.classList.add(CIRCLE_CLASS)
  } else {
    grid.classList.add(X_CLASS)
  }
}

/*
HandleClick should check:
- check for win
- check for draw
- switch turns 
- check for a mark already in place
*/