import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/dj-rest-auth/login/', {
        email,
        password,
      });

      const token = response.data.key;

      if (token) {
        // Store token in localStorage
        localStorage.setItem('authToken', token);

        // Set Authorization header for future requests
        axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;

        // Set token in global context
        login(token);

        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Login failed. Token not received.');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      const message =
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail ||
        'Login failed. Check your credentials.';
      alert(message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 w-full rounded font-medium"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
