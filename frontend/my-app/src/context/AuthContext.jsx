import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);
  

  const login = async (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Token ${newToken}`;

    try {
    const response = await axiosInstance.get('/dj-rest-auth/user/'); 
    console.log("✅ User data fetched:", response.data);
    setUser(response.data);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};