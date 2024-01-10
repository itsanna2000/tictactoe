const gameBoard = document.querySelector('#board')
const comment = document.querySelector('#comment')
const btn = document.querySelector('#refresh')
const gameSquares = [
    "", "", "", "", "", "", "", "", ""
]

let start = "circle"
comment.textContent = "Circle goes first"
let cell

// CREATE THE BOARD

function createBoard() {
    gameSquares.forEach((cell, index) => {
       const squareBox = document.createElement('div')
        squareBox.classList.add('square')
        squareBox.id = index
        squareBox.addEventListener('click', addCircle)
        gameBoard.append(squareBox)
    })
}

createBoard()

// ADD CIRCLE (+ CROSS)

function addCircle(e) {
    const showCircle = document.createElement('div')
    showCircle.classList.add(start)
    e.target.append(showCircle)
    start = start === "circle" ? "cross" : "circle"
    comment.textContent = "it's " + start + "'s turn"
    e.target.removeEventListener('click', addCircle)
    checkScore()
}

// CHECK ALL THE POSSIBLE WINNING COMBOS

function checkScore() {
    const allSquares = document.querySelectorAll('.square')
    const winningCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    winningCombo.forEach(array => {
      const circleWins =  array.every(square => allSquares[square].firstChild?.classList.contains('circle'))
      
      if (circleWins) {
        comment.textContent = "Circle wins!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        return
      }  

    })

    winningCombo.forEach(array => {
        const crossWins =  array.every(square => allSquares[square].firstChild?.classList.contains('cross'))
        
        if (crossWins) {
          comment.textContent = "Cross wins!"
          allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
          return
        }  
  
      })   
      
}

// REFRESH BUTTON

  btn.addEventListener('click', () => {
    location.reload(true)
  })