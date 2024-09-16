import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';  // Updated to match your current server port

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};