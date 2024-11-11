import axios from 'axios';

const API_URL = 'http://localhost:3000/api/'; // Adjust if your backend runs on a different port

// Register a new user
const register = async (username, password) => {
  return await axios.post(`${API_URL}register`, { username, password });
};

// Log in a user
const login = async (username, password) => {
  return await axios.post(`${API_URL}login`, { username, password });
};

export default {
  register,
  login
};
