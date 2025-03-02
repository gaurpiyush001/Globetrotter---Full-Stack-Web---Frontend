import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth.js";
import "../styles/AuthForm.css"; // Import CSS for styling

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = isLogin ? await loginUser(username) : await registerUser(username);
      console.log("svsDvsDVSDVSDVSDVSDVSDv====0, ", response)
      if (response?.session_id) {
        console.log("============succesfulllll==========")
        localStorage.setItem("session_id", response.session_id);
        navigate("/");
      } else {
        setError(response.message || "An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.log("dzfbdfb")
      console.log(err)
      setError(err ? err?.response?.data?.message ? err?.response?.data?.message : err.message  : "Network error. Please check your connection.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
          disabled={loading}
        />

        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "New user? Register" : "Already registered? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
