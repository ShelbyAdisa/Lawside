import axios from 'axios';

const API_BASE_URL = 'https://lawside.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Home API
  getHomeData: () => api.get('/home/'),
  
  // About API
  getAboutData: () => api.get('/about/'),
  
  // Contact API
  submitContact: (contactData) => api.post('/contact/', contactData),
};

export default api;