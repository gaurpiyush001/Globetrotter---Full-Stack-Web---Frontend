import React, { useState } from "react";
import { createGame } from "../api/game.js";
// import InviteLink from "./InviteLink.js";
import { useNavigate } from "react-router-dom";
import "../styles/GameModal.css"; // Import CSS file

const GameModal = ({ onClose }) => {
  const [roomName, setRoomName] = useState("");
  const [mode, setMode] = useState("single");
  const [numQuestions, setNumQuestions] = useState(5);
  // const [inviteLinkProp, setInviteLink] = useState("");
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    const sessionId = localStorage.getItem("session_id");
    const response = await createGame({ roomName, mode, numQuestions, sessionId });

    if (response && response.game && response.game.game_id) {
      if (response.game.mode === "multiplayer") {
        // setInviteLink(`${window.location.origin}/game/${response.game.game_id}`);
      }
      navigate(`/game/${response.game.game_id}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create a Game</h2>

        <input 
          type="text" 
          placeholder="Room Name" 
          value={roomName} 
          onChange={(e) => setRoomName(e.target.value)} 
          className="modal-input"
        />

        <label className="modal-label">Mode:</label>
        <div className="radio-group">
          <label>
            <input type="radio" value="single" checked={mode === "single"} onChange={() => setMode("single")} />
            Single
          </label>
          <label>
            <input type="radio" value="multi" checked={mode === "multi"} onChange={() => setMode("multi")} />
            Multiplayer
          </label>
        </div>

        <label className="modal-label">Number of Questions:</label>
        <select value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))} className="modal-select">
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>

        <button onClick={handleCreateGame} className="modal-button primary">Create Game</button>

        {/* {inviteLinkProp && (
          <div className="invite-container">
            <p>Invite Link:</p>
            <InviteLink link={inviteLinkProp} />
          </div>
        )} */}

        <button onClick={onClose} className="modal-button secondary">Close</button>
      </div>
    </div>
  );
};

export default GameModal;
