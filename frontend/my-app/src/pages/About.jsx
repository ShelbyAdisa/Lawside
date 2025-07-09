import React, { useEffect, useState } from "react";
import { 
  Briefcase, 
  Users as UsersIcon, 
  ShieldCheck, 
  ArrowRight,
  Target,
  Heart,
  Award,
  Globe,
  CheckCircle,
  Users,
  Calendar,
  Scale
} from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
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

  const handleContactClick = () => {
    console.log('Navigate to contact page');
  };

  const handleGetStartedClick = () => {
    console.log('Navigate to registration');
  };

  const coreValues = [
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: "Trust & Confidentiality",
      description: "Your privacy is our priority. All consultations and data are handled with the highest levels of confidentiality and security.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <UsersIcon className="w-12 h-12" />,
      title: "Diverse Legal Experts",
      description: "Our platform brings together experienced lawyers across various fields – from family law to corporate litigation and beyond.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Accessible Justice",
      description: "We make legal help more affordable and accessible to every Kenyan, regardless of location or background.",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Clients Served", icon: <Users className="w-8 h-8" /> },
    { number: "500+", label: "Expert Lawyers", icon: <Scale className="w-8 h-8" /> },
    { number: "50,000+", label: "Consultations", icon: <Calendar className="w-8 h-8" /> },
    { number: "98%", label: "Success Rate", icon: <Award className="w-8 h-8" /> }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Vision",
      description: "Lawside was founded with a simple mission: make legal services accessible to everyone in Kenya."
    },
    {
      year: "2021",
      title: "Platform Launch",
      description: "We launched our digital platform, connecting the first 100 lawyers with clients across major cities."
    },
    {
      year: "2022",
      title: "Nationwide Expansion",
      description: "Expanded to all 47 counties in Kenya, serving rural and urban communities alike."
    },
    {
      year: "2023",
      title: "Innovation & Growth",
      description: "Introduced AI-powered lawyer matching and 24/7 legal support services."
    },
    {
      year: "2024",
      title: "Leading the Future",
      description: "Now the largest legal platform in East Africa, continuing to innovate and serve our community."
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-teal-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Trusted Legal Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            About
            <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Lawside
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Bridging the gap between legal professionals and the people who need them. We provide
            quick, secure, and trusted legal services across Kenya with innovation at our core.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                id={`stat-${index}`}
                data-animate
                className={`text-center group transition-all duration-1000 ${
                  isVisible[`stat-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="values-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible['values-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we serve our clients and legal professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                id={`value-${index}`}
                data-animate
                className={`group p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 ${
                  isVisible[`value-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-20 h-20 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              id="mission-content"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible['mission-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                At Lawside, we believe that everyone deserves access to justice. Whether you're
                drafting a will, facing a legal dispute, or simply need guidance — we're here to help
                you find the right legal support, fast.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStartedClick}
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <div
              id="mission-visual"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible['mission-visual'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 text-center">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Serving Kenya</h3>
                    <p className="text-gray-600">
                      From Nairobi to Mombasa, from rural villages to urban centers, we're committed 
                      to making legal services accessible to every Kenyan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="timeline-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible['timeline-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to Kenya's leading legal platform - here's how we've grown.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full hidden md:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  id={`timeline-${index}`}
                  data-animate
                  className={`relative flex items-center transition-all duration-1000 ${
                    isVisible[`timeline-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {item.year.slice(-2)}
                        </div>
                        <div>
                          <div className="text-sm text-blue-600 font-semibold">{item.year}</div>
                          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            id="cta-content"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['cta-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Globe className="w-16 h-16 mx-auto mb-8 text-blue-200" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Connect with a qualified lawyer today and get the legal advice you need. Join thousands of satisfied clients who trust Lawside.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleGetStartedClick}
                className="group bg-white text-blue-600 px-10 py-5 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/30 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Find a Lawyer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleContactClick}
                className="border-2 border-white/30 text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/50"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;