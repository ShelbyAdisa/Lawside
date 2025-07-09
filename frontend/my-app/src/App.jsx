// File: src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LawyerAvailabilityForm from './pages/LawyerAvailabilityForm';
import BookAppointment from './pages/BookAppointment';
import Lawyers from './pages/Lawyers';
import Documents from './pages/Documents';
import Chat from './pages/Chat';
import LegalResources from './pages/LegalResources';
import TrackFinances from './pages/TrackFinances';
import AppointmentsPage from './components/Appointments';
import PaymentSuccess from './components/PaymentSuccess';
import CheckoutForm from './components/CheckoutForm';
import History from './pages/History';
import PaymentPage from './components/PaymentPage';
import './App.css';

// Stripe imports
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RiX3qBHnuH9MYZ3No97OApwAUet1MWXQMZgAlNJu64k2bf0fCKXOk8IaxGR8JQ4MZi8pvr3CjkN8YAwPP0VUtSn002LapSlr4');

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const appearance = { theme: 'stripe' };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />

        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/resources" element={<LegalResources />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/finances" element={<TrackFinances />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/payment" element={<PaymentPage />} />

            {/* Payment Routes */}
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutForm amount={2000} appointmentId={1} user={user} />
                </Elements>
              }
            />
            
            {/* You can add more checkout routes with different amounts */}
            <Route
              path="/checkout/:appointmentId"
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutForm user={user} />
                </Elements>
              }
            />
            
            <Route path="/payment-success" element={<PaymentSuccess />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lawyer-availability"
              element={
                <ProtectedRoute>
                  <LawyerAvailabilityForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;