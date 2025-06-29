import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const handleSignIn = () => navigate('/login');
  const handleSignUp = () => navigate('/signup');
  const handleDashboard = () => navigate('/dashboard');

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">LegalConsult</Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-sm font-medium hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-blue-600">Contact</Link>

            {token && (
              <>
                <Link to="/dashboard" className="text-sm font-medium hover:text-blue-600">Dashboard</Link>
                {user?.user_type === 'lawyer' && (
                  <Link to="/lawyer-availability" className="text-sm font-medium hover:text-blue-600">My Availability</Link>
                )}
                <span className="text-sm text-gray-700">
                  Welcome, <b>{user?.email}</b>
                </span>
              </>
            )}

            {!token ? (
              <>
                <button onClick={handleSignIn} className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                  Sign In
                </button>
                <button onClick={handleSignUp} className="border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-50">
                  Sign Up
                </button>
              </>
            ) : (
              <button onClick={logout} className="text-red-600 text-sm hover:underline">Logout</button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="md:hidden mt-2 space-y-2 border-t pt-2">
            <Link to="/" className="block text-sm px-4 py-2 hover:text-blue-600">Home</Link>
            <Link to="/about" className="block text-sm px-4 py-2 hover:text-blue-600">About</Link>
            <Link to="/contact" className="block text-sm px-4 py-2 hover:text-blue-600">Contact</Link>

            {token && (
              <>
                <Link to="/dashboard" className="block text-sm px-4 py-2 hover:text-blue-600">Dashboard</Link>
                {user?.user_type === 'lawyer' && (
                  <Link to="/lawyer-availability" className="block text-sm px-4 py-2 hover:text-blue-600">My Availability</Link>
                )}
                <div className="text-sm px-4 py-2 text-gray-700">
                  Welcome, <b>{user?.email}</b>
                </div>
                <button onClick={logout} className="block w-full text-left text-red-600 text-sm px-4 py-2 hover:bg-red-50">
                  Logout
                </button>
              </>
            )}

            {!token && (
              <>
                <button onClick={handleSignIn} className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50">
                  Sign In
                </button>
                <button onClick={handleSignUp} className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50">
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
