import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [sessionInfo, setSessionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      verifySession(sessionId);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  const verifySession = async (sessionId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE}/api/payments/verify-session/${sessionId}/`, {
        headers: {
          Authorization: `Token ${token}`, // Change to Bearer if needed
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSessionInfo(data);
      } else {
        setError('Unable to verify payment session');
      }
    } catch (err) {
      setError('Error verifying payment');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="text-gray-600">Verifying payment...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded bg-white shadow-md">
      <div className="text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>

        {sessionInfo && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded text-left">
            <p className="text-sm text-green-800"><strong>Amount:</strong> ${(sessionInfo.amount / 100).toFixed(2)}</p>
            <p className="text-sm text-green-800"><strong>Appointment ID:</strong> {sessionInfo.appointment_id}</p>
            <p className="text-sm text-green-800"><strong>Date:</strong> {formatDate(sessionInfo.date)}</p>
            <p className="text-sm text-green-800"><strong>Time:</strong> {formatTime(sessionInfo.time)}</p>
            <p className="text-sm text-green-800"><strong>Lawyer:</strong> {sessionInfo.lawyer.name}</p>
            <p className="text-sm text-green-800"><strong>Lawyer Email:</strong> {sessionInfo.lawyer.email}</p>
            <p className="text-sm text-green-800"><strong>Session ID:</strong> {sessionId}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">{error}</p>
          </div>
        )}

        <p className="text-gray-600 mb-6">
          Thank you for your payment! You will receive a confirmation email shortly.
        </p>

        <div className="space-y-3">
          <Link 
            to="/appointments" 
            className="block w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            View My Appointments
          </Link>
          <Link 
            to="/dashboard" 
            className="block w-full py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
