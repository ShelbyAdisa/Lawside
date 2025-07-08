// src/App.jsx
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
import Lawyers from "./pages/Lawyers";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";
import './App.css';
import LegalResources from './pages/LegalResources';
import { useState, useEffect } from 'react';
import TrackFinances from './pages/TrackFinances';

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
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Routes>
          {/* Public Routes with Navbar */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar />
                <Signup />
              </>
            }
          />

          <Route
            path="/book"
            element={
              <>
                <Navbar />
                <BookAppointment />
                <Footer />
              </>
            }
          />

          <Route
            path="/finances"
            element={
              <>
                <Navbar />
                <TrackFinances />
                <Footer />
              </>
            }
          />

          <Route
            path="/lawyers"
            element={
              <>
                <Navbar />
                <Lawyers />
                <Footer />
              </>
            }
          />

          <Route
            path="/documents"
            element={
              <>
                <Navbar />
                <Documents />
                <Footer />
              </>
            }
          />

          <Route
            path="/chat"
            element={
              <>
                <Navbar />
                <Chat />
              </>
            }
          />

          <Route
            path="/resources"
            element={
              <>
                <Navbar />
                <LegalResources/>
                <Footer />
              </>
            }
          />

          {/* Protected Routes (Navbar handled in DashboardLayout) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
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
      </div>
    </Router>
  );
}

export default App;
