import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import React from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const handleSignIn = () => navigate('/login');
  const handleSignUp = () => navigate('/signup');
  const handleDashboard = () => navigate('/dashboard');

  const AnimatedLink = ({ to, children, index, className = "" }) => (
    <Link 
      to={to}
      className={`group relative text-gray-300 hover:text-white transition-all duration-300 ${className} ${
        hoveredLink === index ? 'text-blue-400' : ''
      }`}
      onMouseEnter={() => setHoveredLink(index)}
      onMouseLeave={() => setHoveredLink(null)}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </Link>
  );

  return (
    <nav className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl sticky top-0 z-50 border-b border-gray-700/50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              <h1 className="relative text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-500">
                Lawside
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <AnimatedLink to="/" index="home" className="text-sm font-medium">
              Home
            </AnimatedLink>
            <AnimatedLink to="/about" index="about" className="text-sm font-medium">
              About
            </AnimatedLink>
            <AnimatedLink to="/contact" index="contact" className="text-sm font-medium">
              Contact
            </AnimatedLink>

            {token && (
              <>
                <AnimatedLink to="/dashboard" index="dashboard" className="text-sm font-medium">
                  Dashboard
                </AnimatedLink>
                {user?.user_type === 'lawyer' && (
                  <AnimatedLink to="/lawyer-availability" index="availability" className="text-sm font-medium">
                    My Availability
                  </AnimatedLink>
                )}
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <span className="relative text-sm text-gray-300 bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm border border-gray-600/50 rounded-lg px-3 py-1 group-hover:text-white transition-colors duration-300">
                      Welcome, <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{user?.first_name} {user?.last_name}</span>
                    </span>
                  </div>
                </div>
              </>
            )}

            {!token ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleSignIn} 
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <span className="relative">Sign In</span>
                </button>
                <button 
                  onClick={handleSignUp} 
                  className="group relative bg-transparent border-2 border-gray-600 text-gray-300 hover:text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">Sign Up</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={logout} 
                className="group relative text-red-400 hover:text-red-300 text-sm font-medium transition-all duration-300 hover:bg-red-500/10 px-4 py-2 rounded-lg"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="group relative text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300 hover:bg-gray-700/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <svg className="relative h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-lg"></div>
            <div className="relative mt-2 space-y-2 border-t border-gray-600/50 pt-4 pb-4">
              <Link 
                to="/" 
                className="group block text-sm px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">Home</span>
              </Link>
              <Link 
                to="/about" 
                className="group block text-sm px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">About</span>
              </Link>
              <Link 
                to="/contact" 
                className="group block text-sm px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">Contact</span>
              </Link>

              {token && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="group block text-sm px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">Dashboard</span>
                  </Link>
                  {user?.user_type === 'lawyer' && (
                    <Link 
                      to="/lawyer-availability" 
                      className="group block text-sm px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative">My Availability</span>
                    </Link>
                  )}
                  <div className="px-4 py-3">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      <div className="relative text-sm text-gray-300 bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm border border-gray-600/50 rounded-lg px-3 py-2">
                        Welcome, <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{user?.email}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="group block w-full text-left text-red-400 hover:text-red-300 text-sm px-4 py-3 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">Logout</span>
                  </button>
                </>
              )}

              {!token && (
                <div className="space-y-2 px-4 pt-2">
                  <button 
                    onClick={handleSignIn} 
                    className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    <span className="relative">Sign In</span>
                  </button>
                  <button 
                    onClick={handleSignUp} 
                    className="group relative w-full bg-transparent border-2 border-gray-600 text-gray-300 hover:text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:border-blue-400"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Subtle floating elements */}
      <div className="absolute top-2 right-20 w-8 h-8 bg-blue-500/5 rounded-full animate-pulse" />
      <div className="absolute bottom-2 left-20 w-6 h-6 bg-purple-500/5 rounded-full animate-pulse delay-1000" />
    </nav>
  );
};

export default Navbar;