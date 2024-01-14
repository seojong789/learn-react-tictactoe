import React, { useState } from 'react';

const Player = ({ initialName, symbol, isActive }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = 'Edit';

  const handleEditClick = () => {
    // 이전 상태를 기반하여 상태의 값을 변경할 경우, 함수의 형태로 사용해야 함.
    // setIsEditing(!isEditing);
    setIsEditing((prevIsEditing) => !prevIsEditing); // 항상 상태의 최신 값을 보장함.
  };

  const handleChange = (event) => {
    console.log(event);
    setPlayerName(event.target.value);
  };

  if (isEditing) {
    editablePlayerName = (
      <input type="text" value={playerName} required onChange={handleChange} />
    );
    btnCaption = 'Save';
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
};

export default Player;
