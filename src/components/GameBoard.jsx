import React, { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({ onSelectSquare, activePlayerSymbol }) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameBoard((prevGameBoard) => {
      // prevGameBoard[rowIndex][colIndex] = 'X';
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol; // activePlayerSymbol의 값이 App에서 변경하는 'X' or 'O' 이다.
      return updatedBoard;
    });

    onSelectSquare();
  };

  return (
    // 위 코드는 너무 비효율적 - 아래 코드로 동적으로 처리
    // 3x3 격자를 출력하는 코드임 : 각 격자 안에 button을 둬서 symbol에 따라 button에 표시되는게 달라짐(O, X)
    // 이때, button의 값인 {col}은 initialGameBoard[0][0]처럼 각 격자의 값을 의미함.
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
