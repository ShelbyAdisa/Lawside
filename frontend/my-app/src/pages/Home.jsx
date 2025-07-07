import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleFindLawyerClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLearnMoreClick = () => {
    navigate('/about');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get Expert Legal Advice
              <span className="block text-blue-200">When You Need It</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect with qualified lawyers for professional consultations. 
              Book appointments, get legal advice, and resolve your legal matters efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleFindLawyerClick}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find a Lawyer
              </button>
              <button
                onClick={handleLearnMoreClick}
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Lawside?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make legal consultations accessible, affordable, and convenient for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Features */}
            {[
              {
                title: 'Qualified Lawyers',
                desc: 'Connect with experienced, licensed lawyers who specialize in various areas of law.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                ),
              },
              {
                title: 'Flexible Scheduling',
                desc: 'Book consultations at your convenience with our easy-to-use scheduling system.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
              {
                title: 'Secure & Confidential',
                desc: 'Your consultations are protected by attorney-client privilege and secure technology.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Practice Areas
            </h2>
            <p className="text-xl text-gray-600">
              Our lawyers specialize in various areas of law to serve your needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Family Law',
              'Criminal Law',
              'Employment Law',
              'Personal Injury',
              'Real Estate',
              'Business Law',
              'Immigration',
              'Estate Planning'
            ].map((area, index) => (
              <div key={index} className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Legal Help?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of clients who have found the legal assistance they needed.
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Sign Up as Client
              </button>
              <button
                onClick={() => navigate('/register')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Join as Lawyer
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
