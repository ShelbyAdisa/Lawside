import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [userType, setUserType] = useState('client');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/dj-rest-auth/registration/', {
        email,
        password1,
        password2,
        user_type: userType,
      });

      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.email?.[0] ||
        errData?.non_field_errors?.[0] ||
        errData?.detail ||
        'Signup failed. Check inputs.';
      alert(message);
      console.error('Signup error:', errData || error.message);
    } 
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full mb-2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <select
          className="border p-2 w-full mb-2"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="client">Client</option>
          <option value="lawyer">Lawyer</option>
        </select>
        <button className="bg-black text-white py-2 px-4 w-full" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}
