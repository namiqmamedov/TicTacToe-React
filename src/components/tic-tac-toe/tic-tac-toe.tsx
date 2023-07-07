import React, { useState } from 'react'
import { Board } from './Board'
import './tic-tac-toe.sass'


type BoardArray = Array<Array<string | null>>

const makeComputerMove = (board: BoardArray) : [number,number]    => { // number number is a row and column
    const emptyCells: [number,number][] = [];
    board.forEach((row,rowIndex) => {
      row.forEach((cell,cellIndex) => {
        if(!cell){
          emptyCells.push([rowIndex,cellIndex])
        }  
      })
    })

    const randomIndex = Math.floor(Math.random() * emptyCells.length)

    return emptyCells[randomIndex]
};

export const TicTacToe = () => {
  const initialBoard = Array.from(
    {
    length:3
    },
    () => Array.from({length:3}, () =>  null)) // 3 rows & 3 columns
  const [board,setBoard] = useState<BoardArray>(
    initialBoard
  );

  const [player,setPlayer] = useState<string>('X');
  const[winner,setWinner] = useState<string | null>(null);
  const [isNoWinner,setIsNoWinner] = useState<boolean>(false);


  const checkWinner = (board : BoardArray) : string | null => {
    const lines = [

        //Rows
        [board[0][0],board[0][1], board[0][2]],
        [board[1][0],board[1][1], board[1][2]],
        [board[2][0],board[2][1], board[2][2]],
        //Columns
        [board[0][0],board[1][0], board[2][0]],
        [board[0][1],board[1][1], board[2][1]],
        [board[0][2],board[1][2], board[2][2]],
      
        [board[0][0],board[1][1], board[2][2]],
        [board[0][2],board[1][1], board[2][0 ]],
    ]

    for(const line of lines) {
      if(line[0] &&  line[0] === line[1] && line[1] == line[2]){
        return line[0] ;
      }
    }
    return null;
  }

      const handleOnClick = (row: number, col: number) => {
          if(board[row][col] || winner) {
              return;
          }

          const updatePlayerBoard = board.map((newRow,rowIndex) => newRow.map((cell,cellIndex) =>
           rowIndex === row && cellIndex === col ? player : cell
           )
          );

          setBoard(updatePlayerBoard); 

          // check winner

          const newWinner = checkWinner(updatePlayerBoard)

          setWinner(newWinner);
          setPlayer("X");


          // No Winner

          const hasNullValue = updatePlayerBoard.some((row) => row.some((cell => cell === null)))

          if(!winner && !hasNullValue){
            setIsNoWinner(true)
            return;
          }

          // Computer's move

          if(!newWinner){
            const [computerRow,computerCol] = makeComputerMove(updatePlayerBoard)

            const updatedComputerBoard = updatePlayerBoard.map((newRow,rowIndex) => newRow.map((cell,cellindex) =>
             rowIndex === computerRow && cellindex === computerCol ? "O" : cell))

             setTimeout(() => {
              setBoard(updatedComputerBoard)
              setWinner(checkWinner(updatedComputerBoard))
             }, 200)
          }
      }

      const restartGame = () => {
        setBoard(initialBoard);
        setPlayer('X')
        setWinner(null)
        setIsNoWinner(false)
      }

  return (
    <div className='game'>
        <h1>Tic-Tac-Toe</h1>
        <Board board={board} handleClick={handleOnClick}/>
        {winner && `${winner === "X" ? "You win" : "AI Wins"}`}
        {isNoWinner && <p>No one wins</p>}
        <button className='reset' type='button' onClick={() => restartGame()}>Reset</button>
    </div>
  )
}
