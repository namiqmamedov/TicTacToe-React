import React, { useState } from 'react'
import { Board } from './Board'

export const TicTacToe = () => {
  const [board,setBoard] = useState<any>(
    Array.from(
      {
      length:3
      },
      () => Array.from({length:3}, () =>  null)) // 3 rows & 3 columns
  );
  return (
    <div className='game'>
        <h1>Tic-Tac-Toe</h1>
        <Board board={board} handleClick={() => ""}/>
    </div>
  )
}
