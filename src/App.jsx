import { useState } from 'react'
import confetti from 'canvas-confetti'
import {Square} from './components/Square'
import {TURNS} from "./constants.js"
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'


function App() {
  
  //const board = Array(9).fill(null)
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null) // null no hay ganador y el false un empate


  const ResetGame =() =>{
      setBoard (Array(9).fill(null))
      setTurn(TURNS.X)
      setWinner(null)
  }

 
  const checkEndGame = (newBoard )=> {
   //si no hay mas espacio vacios 
    return newBoard.every((square) => square !== null)
  }


  const updateBoard = (index) =>{

      //no actualizar la posicion ya marcada o tenemos un ganador
      if(board[index]  || winner ) return

      //actualizr el tablero
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      
      //cambiar el turno
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)

      //revisar si hay un ganador
      const newWinner =  checkWinnerFrom(newBoard)

      if(newWinner){
        setWinner(newWinner)
        confetti()
      }else if (checkEndGame(newBoard)){
        setWinner(false)  // empate
      }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
     <button onClick={ResetGame}> Reset del juego </button>
      <section className='game'>
          {
              board.map(( square,index) =>{

                return(
                   <Square
                     key={index}
                     index={index}
                     updateBoard={updateBoard}
                     >
                    { square }
                  </Square>
                )
              })
          }
      </section>

      <section className="turn">
        <Square isSelected={turn ===TURNS.X} >
              {TURNS.X}
        </Square>
        <Square isSelected={turn ===TURNS.O} > 
              {TURNS.O}
        </Square>
      </section>

       <WinnerModal Winner = {winner} ResetGame ={ResetGame}  Square = {Square} />

    </main>
  )
}

export default App
