import React, { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

// 게임 승리 관련 -> 매번 버튼 클릭 시, 조건 확인해야 함. 따라서 handleSelectSquare 함수 내부에서 동작
// 그러나, 버튼 클릭마다 해당(App) 컴포넌트는 업데이트되고 있기 때문에 굳이 handleSelectSquare에서 동작할 필요 x
import { WINNING_COMBINATIONS } from './winning-combinations';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

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

// helper function
const deriveWinner = (gameBoard, players) => {
  let winner;

  // const [hasWinner, setHasWinner] = useState(false); // handleSelectSquare에서 우승 조건을 만족하면 true로 값을 변경 -> 그러나, gameTurns에서 파생될 수 있으므로 추가 state 필요 x
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    // js에서 null은 false와 같다.
    // firstSquareSymbol이 null이란 말은 선택된 버튼이 없다는 의미. (게임시작 전이라는 뜻.)
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      // winner = firstSquareSymbol; // first, second, third 모두 같은 symbol이므로 아무거나 symbol 값을 가져오면 돼.
      winner = players[firstSquareSymbol]; // players의 속성에는 X, O가 있는데 firstSquaresSymbol의 경우 이긴 사람의 심볼이므로 해당 속성에 부합함.
    }
  }

  return winner;
};

// helper function
const deriveGameBoard = (gameTurns) => {
  // let gameBoard = INITIAL_GAME_BOARD; // 초기 값은 아무런 값이 없는 빈 배열, 그러나 이후 값은 gameTurns의 값으로 덮어씌울 것.
  // 위의 코드처럼 INITIAL_GAME_BOARD의 값을 받게되면 큰 오류가 발생함.
  // 아래 코드는 깊은 복사 : 위의 코드처럼 배열을 얕은 복사로 받게 되면, gameBoard의 값을 변경하더라도 INITIAL_GAME_BOARD의 값도 같이 변경된다.
  // 즉, Rematch 버튼을 눌러서 초기화를 시키더라도 정상 동작을 할 수 없음.
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    // gameTurns.length === 0 이라면 해당 for 반복문은 실행 x
    // 객체 구조 분해 할당을 2번 사용 => 파생 상태의 업데이트!!!!!!!!
    // 즉, App.jsx의 gameTurns 상태만을 사용하여 추가 상태를 굳이 만들지 않고 잘 동작하도록 제어함.
    const { square, player } = turn; // App.jsx의 updatedTurns의 각 행에 해당하는 값이 turn.
    const { row, col } = square;
    gameBoard[row][col] = player; // player의 경우 updatedTurns의 값으로 symbol에 해당함.
  }

  return gameBoard;
};

const App = () => {
  // 아래 코드는 플레이어 2명에서 'X"와 'O'를 번갈아가면서 진행하기 때문에 이를 처리하기 위함.
  // 여러 컴포넌트에 prop으로 전달하기 용이하기 위해 App.js(부모)에서 처리하는 것.
  const [gameTurns, setGameTurns] = useState([]); // Log 컴포넌트에서 사용되는 동적배열. (각 플레이어의 동작을 보관함)

  // GameBoard Component에 Player Component의 Player 이름을 넘겨줘야 해.
  // save 버튼을 누를 때, 해당 플레이어의 이름을 players state에 저장하도록 함.
  const [players, setPlayers] = useState(PLAYERS);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  // gameTurns의 보드에 X or O가 총 9개 표시 가능 -> 즉, 길이가 9 이상 and 우승자(winner)가 없으면 무승부
  const hasDraw = gameTurns.length === 9 && !winner;

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

  const handleRestart = () => {
    setGameTurns([]); // tictactoe의 모든 값은 gameTurns 상태에서 파생되기 때문에, 해당 값만 초기화 시키면 Rematch 가능!
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* Player 1이 X로 먼저 시작하기 때문에, isActive로 activePlayer === 'X'를 보냄. 맨 처음 상태의 값이 'X'이므로 Player 1에 하이라이트 표시가 되어있다. */}
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          {/* Player 1의 차례가 끝나면, activePlayer의 값이 'O'로 변경되기 때문에, Player 2에 하이라이트 표시가 된다. */}
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* 우승자 존재 or 무승부일 경우에 GameOver 컴포넌트 보여줌 */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {/* onSelectSquare의 경우 GameBoard에서 각 버튼을 클릭할 때, 발생해야 함. 'X'와 'O'를 순서대로 표시해야 하므로.. */}
        {/* activePlayerSymbol의 경우, GameBoard에서 최종적으로 버튼을 클릭했을 때, 표시하는 'X' or 'O' 값이다. */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
