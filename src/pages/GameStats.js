import React from "react";

const GameStats = ({ stats }) => {
  return (
    <div className="game-stats">
      <h3>Player Stats</h3>
      <ul>
        {stats.map((player) => (
          <li key={player.user_id}>
            <strong>User:</strong> {player.user_id} | ✅ {player.correct} | ❌{" "}
            {player.incorrect}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameStats;
