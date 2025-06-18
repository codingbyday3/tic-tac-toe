function generatePlayers(){

  const player1 = {
    score: 0,
    move: "X"
  }

  const player2 = {
    score: 0,
    move: "O"
  }

  return { player1, player2 }
}


function makeGameboard(size){
  let gameBoard = []

  const gameBoardFields = function(){
    gameBoardRow = []
    for(let i = 0; i < size; i++){
      gameBoardRow.push("")
    }
    return gameBoardRow
  }

  return function(){
    for(let i = 0; i < size; i++){
      gameBoard.push(gameBoardFields())
    }
    return { gameBoard }
  }
}

function renderMove(size, gameBoard){
  field = 0
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
      field++

      if(gameBoard[i][j] != ""){

        let div = document.querySelector(`div[data-id="${field}"]`)
        div.textContent = gameBoard[i][j]
      }
    }
  }
}

function playGame(size){
  const fieldContainer = document.querySelector(".field-container")
  let move = generatePlayers().player1.move
  let generatedGameBoard = makeGameboard(size)().gameBoard
  const winningPositions = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [7, 8, 9], [3, 5, 7], [3, 6, 9], [4, 5, 6], [2, 5, 8]]
  let XMoves = []
  let OMoves = []

  fieldContainer.addEventListener("click", (e)=>{
    findField(e)
    renderMove(size, generatedGameBoard)
    decideWinner()
  })

  function findField(e){
    field = 0
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        field++
        if(Number(e.target.dataset.id) === field){
          generatedGameBoard[i][j] = move
          changeMove(field)
          console.log(generatedGameBoard)
          
        }
      }
    }
  }
  

  function changeMove(field){
    if(move === "X"){
      move = "O"
      XMoves.push(field)
    }else{
      move = "X"
      OMoves.push(field)
    }
  }

  function decideWinner(){
    for(let winningPosition of winningPositions){
      let isXWin = winningPosition.every(field => XMoves.includes(field))
      let isOWin = winningPosition.every(field => OMoves.includes(field))

      if(isXWin){
        console.log("X win")
        reset()
        break
      }else if(isOWin){
        console.log("O win")
        reset()
        break
      }
    }
  }

  function reset(){
    XMoves = []
    OMoves = []
    generatedGameBoard = makeGameboard(size)().gameBoard
    move = generatePlayers().player1.move
  }

}



playGame(3)




