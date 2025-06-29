// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // ✅ updated from accessToken to authToken
    if (token) {
      config.headers.Authorization = `Token ${token}`; // ✅ Token (not Bearer)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
