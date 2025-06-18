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


function displayMove(size){
  let move = generatePlayers().player1.move
  const generatedGameBoard = makeGameboard(size)().gameBoard
  document.addEventListener("click", (e)=>{
    field = 0
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        field++
        if(Number(e.target.dataset.id) === field){
          generatedGameBoard[i][j] = move
          if(move === "X"){
            move = "O"
          }else{
            move = "X"
          }
          console.log(generatedGameBoard)
        }
      }
    }
  })

}


displayMove(3)
