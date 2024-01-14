import React, { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';

function App() {
  // 아래 코드는 플레이어 2명에서 'X"와 'O'를 번갈아가면서 진행하기 때문에 이를 처리하기 위함.
  // 여러 컴포넌트에 prop으로 전달하기 용이하기 위해 App.js(부모)에서 처리하는 것.
  const [activePlayer, setActivePlayer] = useState('X');
  const handleSelectSquare = () => {
    setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
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
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
      LOG
    </main>
  );
}

export default App;
