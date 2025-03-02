// src/components/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameModal from "./GameModal.js";
import "../styles/Home.css"; // Import CSS file for styling

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleStartGame = () => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      navigate("/auth"); // Redirect to login if not authenticated
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1 className="title">🌍 Welcome to <span>Globetrotter</span> Game!</h1>
        <p className="subtitle">
          Test your knowledge about different places around the world.
        </p>
        <button className="start-btn" onClick={handleStartGame}>
          Start a Game
        </button>
      </div>
      {showModal && <GameModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Home;
