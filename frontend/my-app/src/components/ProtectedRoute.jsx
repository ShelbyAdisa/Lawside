import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  // If token exists, allow access to the protected component
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
