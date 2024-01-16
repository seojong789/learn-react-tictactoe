import React from 'react';

const Log = ({ turns }) => {
  // Log의 경우에는 각 플레이어의 동작을 담는다. -> 동적 배열이 필요함
  // 즉, 게임이 진행할수록 배열의 크기가 계속 변경됨.
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
};

export default Log;
