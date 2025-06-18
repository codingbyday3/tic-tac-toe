function generatePlayers(){

  const player = {
    score: 0,
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
  const restartBtn = document.querySelector(".restart-btn")
  const warrningText = document.querySelector(".warrning")

  const player1 = generatePlayers().player
  const player2 = generatePlayers().player
  let move = "X"
  let gameBoard = makegameboard(size)().gameBoard
  const winningPositions = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [7, 8, 9], [3, 5, 7], [3, 6, 9], [4, 5, 6], [2, 5, 8]]
  let round = 1


  fieldContainer.addEventListener("click", (e)=>{
    renderMove(e)
    findField(e)
    decideWinner()


  })

  restartBtn.addEventListener("click", ()=>{
    player1.score = []
    player2.score = []
    for(let i = 1; i <= 5; i++ ){
      document.querySelector(`#table-left-${i}`).textContent = ""
      document.querySelector(`#table-right-${i}`).textContent = ""
    }
    document.querySelector("#table-left-result").textContent = ""
    document.querySelector("#table-right-result").textContent = ""

    fieldContainer.classList.remove("disable-click")
    warrningText.style.visibility = "hidden"
    round = 1
    player1.score = 0
    player2.score = 0
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
        player1.score++
        displayResultTable("player1")

        break
      }else if(isOWin){
        reset()
        player2.score++
        displayResultTable("player2")

        break
      }
    }
    if(player1.score === 3 || player2.score === 3){
      const tableFooter = document.querySelector("tfoot")
      const tableLeftResult = document.querySelector("#table-left-result")
      const tableRightResult = document.querySelector("#table-right-result")

      
      warrningText.style.visibility = "visible"
      fieldContainer.classList.add("disable-click")
      tableFooter.style.display = "table-footer-group"
      if(player1.score === 3){
        tableLeftResult.textContent = "Winner"
        tableRightResult.textContent = "Loser"
      }else{
        tableLeftResult.textContent = "Loser"
        tableRightResult.textContent = "winner"
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

  function displayResultTable(winner){
    const leftSideTable = document.querySelector(`#table-left-${round}`)
    const rightSideTable = document.querySelector(`#table-right-${round}`)

    if(winner === "player1"){
      leftSideTable.textContent = "Winner"
      rightSideTable.textContent = "Loser"
    }else{
      leftSideTable.textContent = "Loser"
      rightSideTable.textContent = "Winner"  
    }
    round++
  }



} 



playGame(3)




