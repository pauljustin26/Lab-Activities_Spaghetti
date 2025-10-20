// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // backend
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // use the same key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
