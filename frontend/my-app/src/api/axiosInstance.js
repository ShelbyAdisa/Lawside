// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://lawside.onrender.com',
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
