import React from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({ onSelectSquare, turns }) => {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // const handleSelectSquare = (rowIndex, colIndex) => {
  //   setGameBoard((prevGameBoard) => {
  //     // prevGameBoard[rowIndex][colIndex] = 'X';
  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol; // activePlayerSymbol의 값이 App에서 변경하는 'X' or 'O' 이다.
  //     return updatedBoard;
  //   });

  //   onSelectSquare();
  // };

  // 위의 기존 GameBoard를 구성하는 코드도 제대로 동작하지만, App.jsx에서 전체적으로 관리하는 gameTurns 상태로 전체적으로 관리하기 위해 코드를 새로 짬.
  let gameBoard = initialGameBoard; // 초기 값은 아무런 값이 없는 빈 배열, 그러나 이후 값은 turns의 값으로 덮어씌울 것.

  for (const turn of turns) {
    // turns.length === 0 이라면 해당 for 반복문은 실행 x
    // 객체 구조 분해 할당을 2번 사용 => 파생 상태의 업데이트!!!!!!!!
    // 즉, App.jsx의 gameTurns 상태만을 사용하여 추가 상태를 굳이 만들지 않고 잘 동작하도록 제어함.
    const { square, player } = turn; // App.jsx의 updatedTurns의 각 행에 해당하는 값이 turn.
    const { row, col } = square;
    gameBoard[row][col] = player; // player의 경우 updatedTurns의 값으로 symbol에 해당함.
  }

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
                <button
                  onClick={() => {
                    onSelectSquare(rowIndex, colIndex);
                  }}
                >
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
