// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import AuthForm from "./components/AuthForm.js";
import GamePage from "./pages/GamePage.js";
import "./App.css";
import "./styles/AuthForm.css";
import "./styles/Home.css";
import "./styles/GameModal.css";
import "./styles/GameOverModal.css";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/game/:gameId" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
