import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS} from "./constants.js"
import { checkWinnerFrom } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"   
import { checkEndGame } from "./logic/board.js" 
import {Board} from "./components/Board.jsx"  


function App() {

  const [board , setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)  
  })
  
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X  
  })

  const [winner, setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board') 
    window.localStorage.removeItem('turn')  
  }
  
  const updateBoard = (index) =>{
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn  
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X  
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard)) 
    window.localStorage.setItem('turn', JSON.stringify(newTurn))

    const newWinner = checkWinnerFrom(newBoard)  
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    } 


  }

  return(
    <main className="board">
       <h1>tic tac toe</h1>
       <button onClick={resetGame}>Reset del juego</button>
       <section className="game">
        <Board board={board} updateBoard={updateBoard}></Board> 
       </section>

       <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>  
       </section>
       <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  )
}   
export default App
