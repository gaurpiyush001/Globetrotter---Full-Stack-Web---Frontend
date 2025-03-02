// src/api/game.js
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1";

export const createGame = async (gameData) => {
  const sessionId = localStorage.getItem("session_id");

  try {
    const response = await axios.post(`${API_URL}/game/start`, gameData, {
      headers: {
        "x-session-id": sessionId, // Send session ID in headers
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating game:", error);
    return { error: error.response?.data?.message || "Failed to create game" };
  }
};
