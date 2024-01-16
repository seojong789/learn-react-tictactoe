import React, { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

// helper function
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  // App의 currentPlayer의 값은 밑의 setGameTurns의 currentPlayer와 다르게 이전 prev state의 값에 의존하지 않는다.
  // 따라서 현재의 값(gameTurns)의 코드로 변경해줌.
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
};

const App = () => {
  // 아래 코드는 플레이어 2명에서 'X"와 'O'를 번갈아가면서 진행하기 때문에 이를 처리하기 위함.
  // 여러 컴포넌트에 prop으로 전달하기 용이하기 위해 App.js(부모)에서 처리하는 것.
  const [gameTurns, setGameTurns] = useState([]); // Log 컴포넌트에서 사용되는 동적배열. (각 플레이어의 동작을 보관함)
  // const [activePlayer, setActivePlayer] = useState('X'); // 해당 state도 간소화 가능 -> gameTurns state만 사용하자.
  const activePlayer = deriveActivePlayer(gameTurns);

  const handleSelectSquare = (rowIndex, colIndex) => {
    // rowIndex, colIndex : Log에 저장될 내용은 여러 개가 있는데 그중, 어떤 버튼에 눌렸는지 확인하기 위한 프로퍼티
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X')); // state 간소화를 위해 제거.
    setGameTurns((prevTurns) => {
      // let currentPlayer = 'X'; // activePlayer의 값은 믿지 못하기 때문에, 항상 최신 값으로 보장하기 위해 새로운 변수 생성.
      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   // prevTurns.length의 값이 0보다 커야하는 이유 : 초기에는 빈배열로 시작하기 때문.
      //   // prevTurns[0]의 값 = 가장 최신의 행동.
      //   currentPlayer = 'O'; // 이전 행동이 'X'라면, 현재 행동은 'O'라는 의미.
      // }

      // 위의 코드를 아래 코드로 대체함 : 이때! 주의사항으로 gameTurns가 아니라 이전 상태기반이므로 prevTurns를 프로퍼티로 보내야함.
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        // player: activePlayer, // activePlayer 상태가 존재하는데, 굳이 새로 변수를 만들어서 저장하는 이유 : 해당 위치의 코드는 gameTurns의 상태를 업데이트하면서 항상 최신상태를 보장하고 있는데, activePlayer의 경우에는 다른 상태이다. 이때, activePlayer의 값을 항상 최신 값이라고 보장할 수 없기 때문.
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]; // 가장 최신의 행동이 배열의 제일 앞에 위치하도록 함.

      return updatedTurns;
    }); // handleSelectSquare 함수는 GameBoard 컴포넌트에서 클릭할 때마다 실행되는 함수이므로 즉, 사용자의 동작을 의미함.
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* Player 1이 X로 먼저 시작하기 때문에, isActive로 activePlayer === 'X'를 보냄. 맨 처음 상태의 값이 'X'이므로 Player 1에 하이라이트 표시가 되어있다. */}
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          {/* Player 1의 차례가 끝나면, activePlayer의 값이 'O'로 변경되기 때문에, Player 2에 하이라이트 표시가 된다. */}
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>
        {/* onSelectSquare의 경우 GameBoard에서 각 버튼을 클릭할 때, 발생해야 함. 'X'와 'O'를 순서대로 표시해야 하므로.. */}
        {/* activePlayerSymbol의 경우, GameBoard에서 최종적으로 버튼을 클릭했을 때, 표시하는 'X' or 'O' 값이다. */}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
