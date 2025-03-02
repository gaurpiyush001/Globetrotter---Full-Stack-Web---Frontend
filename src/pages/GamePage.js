import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import GameStats from "./GameStats.js";
import GameOverModal from "./GameOverModal.js";

const API_URL = "http://localhost:3000/api/v1";

const GamePage = () => {
  const { gameId } = useParams(); 
  const sessionId = localStorage.getItem("session_id");
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [totalScore, setTotalScore] = useState(null);
  const apiCalled = useRef(false); // Prevent double API calls

  useEffect(() => {
    if (!apiCalled.current) {
      apiCalled.current = true;
      fetchNextQuestion();
    }
  }, []);

  const fetchNextQuestion = async () => {
    try {
      const response = await fetch(`${API_URL}/game/${gameId}/next-question`, {
        headers: { "x-session-id": sessionId },
      });
      const data = await response.json();
      console.log("dataa====== ques", data);

      if (!data || !data?.question || !data.question?.question) {
        console.log("game over===============", data);
        setTotalScore(data.question.total_score);
        setGameOver(true);
      } else {
        console.log("not game over.>>>>>>>>>>>>");
        setQuestionData(data.question);
        setFeedback(null);
        setSelectedOption(null);
      }
    } catch (error) {
      console.error("Error fetching next question:", error);
    }
  };

  const handleAnswerSubmit = async (option) => {
    if (selectedOption) return; // Prevent multiple clicks

    setSelectedOption(option);

    try {
      const response = await fetch(`${API_URL}/user-responses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
        body: JSON.stringify({
          gameId,
          questionId: questionData._id,
          selectedOption: option,
        }),
      });

      const data = await response.json();
      console.log("response data", data);

      setFeedback(data);
      setPlayerStats(data.player_stats); // Update player stats
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (gameOver) {
    return <GameOverModal totalScore={totalScore} />;
  }

  return (
    <div className="game-container">
      {questionData ? (
        <>
          <h2>{questionData.question}</h2>
          <div className="options-container">
            {questionData.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedOption === option
                    ? feedback?.isCorrect
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                onClick={() => handleAnswerSubmit(option)}
                disabled={!!selectedOption}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div className="feedback">
              {feedback.isCorrect ? (
                <p className="success">✅ Correct! {feedback.fun_facts}</p>
              ) : (
                <p className="error">
                  ❌ Oops! Wrong Answer. The correct answer was{" "}
                  <strong>{feedback.correctAnswer}</strong>.
                </p>
              )}
              <button onClick={fetchNextQuestion} className="next-btn">
                Next Question
              </button>
            </div>
          )}

          {playerStats && <GameStats stats={playerStats} />}
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default GamePage;
