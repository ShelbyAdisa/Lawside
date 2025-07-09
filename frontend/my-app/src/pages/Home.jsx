import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Scale, Users, Clock, Shield, ArrowRight, CheckCircle, Star } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Qualified Lawyers',
      desc: 'Connect with experienced, licensed lawyers who specialize in various areas of law.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Flexible Scheduling',
      desc: 'Book consultations at your convenience with our easy-to-use scheduling system.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Confidential',
      desc: 'Your consultations are protected by attorney-client privilege and secure technology.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const practiceAreas = [
    'Family Law',
    'Criminal Law',
    'Employment Law',
    'Personal Injury',
    'Real Estate',
    'Business Law',
    'Immigration',
    'Estate Planning'
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "Lawside helped me navigate complex business regulations with ease. The lawyer was knowledgeable and responsive.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Homeowner",
      content: "Excellent real estate legal support. The consultation was thorough and saved me from potential issues.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Family Client",
      content: "Professional and compassionate service during a difficult time. Highly recommend their family law expertise.",
      rating: 5
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-teal-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium">Trusted by 10,000+ clients</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Get Expert
              <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Legal Advice
              </span>
              <span className="block text-4xl md:text-6xl text-gray-300">When You Need It</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Connect with qualified lawyers for professional consultations. 
              Book appointments, get legal advice, and resolve your legal matters efficiently with our modern platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleFindLawyerClick}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Find a Lawyer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleLearnMoreClick}
                className="border-2 border-white/30 text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/50"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="features-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible['features-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-600">Lawside?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make legal consultations accessible, affordable, and convenient for everyone through innovative technology and expert lawyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                data-animate
                className={`group text-center p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="practice-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible['practice-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Practice Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced lawyers specialize in various areas of law to serve all your legal needs with expertise and dedication.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {practiceAreas.map((area, index) => (
              <div 
                key={index}
                id={`area-${index}`}
                data-animate
                className={`group text-center p-8 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-b from-white to-gray-50 hover:from-blue-50 hover:to-white transform hover:scale-105 ${
                  isVisible[`area-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Scale className="w-8 h-8 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="testimonials-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible['testimonials-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                id={`testimonial-${index}`}
                data-animate
                className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 ${
                  isVisible[`testimonial-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-blue-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            id="cta-content"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['cta-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Get Legal Help?
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of clients who have found the legal assistance they needed. Start your journey to legal peace of mind today.
            </p>

            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => navigate('/register')}
                  className="group bg-white text-blue-600 px-10 py-5 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/30 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Sign Up as Client
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="border-2 border-white/30 text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/50"
                >
                  Join as Lawyer
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;