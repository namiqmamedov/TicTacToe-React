import React, { useState } from 'react'
import { Board } from './Board'
import './tic-tac-toe.sass'


type BoardArray = Array<Array<string | null>>

export const TicTacToe = () => {
  const [board,setBoard] = useState<BoardArray>(
    Array.from(
      {
      length:3
      },
      () => Array.from({length:3}, () =>  null)) // 3 rows & 3 columns
  );

  const [player,setPlayer] = useState<string>('X')
  const[winner,setWinner] = useState<string | null>(null)

      const handleOnClick = (row: number, col: number) => {
          if(board[row][col] || winner) {
              return;
          }

          const updatePlayerBoard = board.map((newRow,rowIndex) => newRow.map((cell,cellIndex) =>
           rowIndex === row && cellIndex === col ? player : cell))
      }

  return (
    <div className='game'>
        <h1>Tic-Tac-Toe</h1>
        <Board board={board} handleClick={() => handleOnClick}/>
    </div>
  )
}
