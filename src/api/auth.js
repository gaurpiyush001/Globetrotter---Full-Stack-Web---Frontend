// src/api/auth.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1";

export const loginUser = async (username) => {
  const response = await axios.post(`${API_URL}/users/login`, { username });
  return response.data;
};

export const registerUser = async (username) => {
  const response = await axios.post(`${API_URL}/users/register`, { username });
  console.log("svsdvsdvsdvsdvsdv", response);
  return response.data;
};
