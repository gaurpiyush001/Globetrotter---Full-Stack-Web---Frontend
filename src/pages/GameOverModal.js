import React from "react";
import "../styles/GameOverModal.css"; // Import the CSS file

const GameOverModal = ({ totalScore }) => {
  console.log("GameOverModal=====", totalScore)
  return (
    <div className="game-over-container">
      <div className="game-over-box">
        <h2 className="game-over-title">🎉 Game Over! 🎉</h2>
        <p className="game-over-text">Thanks for playing!</p>
        <p className="score-label">Your Total Score:</p>
        <p className="total-score">{totalScore}</p>
        <br></br>
        <button onClick={() => window.location.href = "/"} className="home-btn">
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
