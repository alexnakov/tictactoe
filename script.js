const CIRCLE_CLASS = 'circle'
const X_CLASS = 'x'
let circleTurn = true;
const cellElements = document.querySelectorAll('[data-cell]')
const grid = document.getElementsByClassName('grid')[0]
const winningTextElement = document.querySelector('[data-winning-meesage-text]')
const endGameDisplay = document.getElementsByClassName('winning-message')[0]
const restartButton = document.getElementById('restratButton')
const WINNING_COMBINATION = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = !circleTurn
  endGameDisplay.classList.remove('show')
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)   
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true})
  })
  MarkHover()
}

function handleClick(e) {
  const cell = e.target
  const currentMark = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentMark)
  if (checkWin(currentMark)) {
    endGame(false)
  } else if (isDraw()) {
    console.log('d')
    endGame(true)
  } else {
    swapTurn()
    MarkHover()
  }
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) ||
    cell.classList.contains(CIRCLE_CLASS)
  })
}

function endGame(draw) {
  if (draw) {
    winningTextElement.innerHTML = `Draw`
  } else {
    winningTextElement.innerHTML = `${circleTurn ? "O's" : "X's"}`
  }
  endGameDisplay.classList.add('show')
}

function placeMark(cell, currentMark) {
  cell.classList.add(currentMark)
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

function checkWin(currentMark) {
  return WINNING_COMBINATION.some(combination => { 
    return combination.every(index => {
      return cellElements[index].classList.contains(currentMark)
    })
  })
}
/*
HandleClick should check:
- check for win
- check for draw
- switch turns 
- check for a mark already in place
*/