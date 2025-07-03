import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const login = (newToken) => {
    setToken(newToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Token ${newToken}`;
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
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};