function generatePlayers(){

  const player = {
    score: [],
    move: []
  }


  return { player }
}


function makegameboard(size){
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


function playGame(size){
  const fieldContainer = document.querySelector(".field-container")
  const player1 = generatePlayers().player
  const player2 = generatePlayers().player
  let move = "X"
  let gameBoard = makegameboard(size)().gameBoard
  const winningPositions = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [7, 8, 9], [3, 5, 7], [3, 6, 9], [4, 5, 6], [2, 5, 8]]


  fieldContainer.addEventListener("click", (e)=>{
    renderMove(e)
    findField(e)
    decideWinner()
    console.log(gameBoard)

  })

  function findField(e){
    field = 0
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        field++
        if(Number(e.target.dataset.id) === field && gameBoard[i][j] === ""){
         gameBoard[i][j] = move
          changeMove(field)
          
        }
      }
    }
  }
  

  function changeMove(field){
    if(move === "X"){
      move = "O"
      player1.move.push(field)
    }else{
      move = "X"
      player2.move.push(field)
    }
  }

  function renderMove(e){
    const div = document.querySelector(`div[data-id="${e.target.dataset.id}"]`)
    console.log()
    if(div.textContent === ""){
      div.textContent = move
    }
  }

  function decideWinner(){
    for(let winningPosition of winningPositions){
      let isXWin = winningPosition.every(field => player1.move.includes(field))
      let isOWin = winningPosition.every(field => player2.move.includes(field))

      if(isXWin){
        reset()
        player1.score.push("win")
        break
      }else if(isOWin){
        reset()
        player2.score.push("win")
        break
      }
    }
  }

  function reset(){
    player1.move = []
    player2.move = []
    move = "X"
    let field = 1
    gameBoard = makegameboard(size)().gameBoard
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        const div = document.querySelector(`div[data-id="${field}"]`);
        if (div) {
          div.textContent = ""; 
        }
        field++;
      }
    }
  }

} 



playGame(3)




