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
import { useState, useEffect } from 'react';
import TrackFinances from './pages/TrackFinances';
import AppointmentsPage from './pages/Appointments';
import PaymentForm from './components/PaymentForm';
import PaymentSuccess from './components/PaymentSuccess';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Single Navbar - only render here */}
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

            {/* Payment Routes */}
            <Route path="/payment" element={<PaymentForm />} />
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