import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const practices = [
  { 
    name: "Family Law", 
    img: "https://thumbs.dreamstime.com/b/family-law-books-judges-gavel-desk-library-education-books-concept-88312956.jpg?w=768", 
    description: "Comprehensive legal services for divorce, child custody, adoption, prenuptial agreements, and domestic relations matters with compassionate guidance." 
  },
  { 
    name: "Criminal Law", 
    img: "https://thumbs.dreamstime.com/b/gavel-name-plate-engraving-criminal-law-63046488.jpg?w=768", 
    description: "Aggressive defense representation for criminal charges, DUI cases, white-collar crimes, and appeals with experienced trial advocacy." 
  },
  { 
    name: "Employment Law", 
    img: "https://t4.ftcdn.net/jpg/01/99/88/95/240_F_199889529_PmlcupXxdB4SuGFBTQYH6lbaWxNQK3ma.jpg", 
    description: "Workplace discrimination claims, wrongful termination, labor disputes, employment contracts, and HR compliance for employers and employees." 
  },
  { 
    name: "Personal Injury", 
    img: "https://media.istockphoto.com/id/1070418448/photo/personal-injury-law-book-and-a-black-desk.jpg?s=612x612&w=0&k=20&c=7JJ2mMV3MT4gz6onur4R6ELvsVYTcULc3Q9oIb0f7WM=", 
    description: "Maximum compensation for accident victims, medical malpractice, slip and fall cases, and wrongful death claims with no fee unless we win." 
  },
  { 
    name: "Real Estate", 
    img: "https://kamoinglaw.co.ke/wp-content/uploads/elementor/thumbs/Real-estate-law-kamoing-law-q1o7k0givj2hfpibp8rjfjwdawxvqxbo7nf9o257zk.jpg", 
    description: "Property transactions, real estate disputes, zoning issues, landlord-tenant matters, and title examinations handled with precision and care." 
  },
  { 
    name: "Business Law", 
    img: "https://law.ukzn.ac.za/wp-content/uploads/2022/08/LLM-Business-Law.jpg", 
    description: "Business formation, mergers and acquisitions, contract negotiations, compliance matters, and corporate governance for companies of all sizes." 
  },
  { 
    name: "Immigration", 
    img: "https://hkmlegal.co.ke/wp-content/uploads/2021/03/Immigration-Law-1.jpg?id=11100", 
    description: "Visa applications, citizenship proceedings, deportation defense, family reunification, and employment-based immigration solutions." 
  },
  { 
    name: "Estate Planning", 
    img: "https://www.gudemanlaw.com/wp-content/uploads/2023/12/Estate-planning-lawyer-Troy-MI.jpg", 
    description: "Wills, trusts, probate administration, estate tax planning, and asset protection strategies to secure your family's future." 
  },
];

function BookAppointmentContent() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [range, setRange] = useState(5000);
  const [currency, setCurrency] = useState("KES");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const scrollRef = useRef(null);

  // Mock navigation function for demo

  useEffect(() => {
    const userLang = navigator.language;
    if (userLang.includes("en-US")) setCurrency("KES");
    else if (userLang.includes("en-GB")) setCurrency("GBP");
    else if (userLang.includes("en-IN")) setCurrency("INR");
    else setCurrency("USD");
  }, []);

  useEffect(() => {
    // Animation trigger
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [step]);

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: index * width,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  };

  const scrollRight = () => {
    if (currentIndex < practices.length - 1) scrollToIndex(currentIndex + 1);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentIndex(index);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {step === 1 && (
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-teal-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-6 inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">Book Appointment</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Choose Your
                <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Legal Practice
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Select from our comprehensive range of legal services to find the perfect attorney for your needs
              </p>
            </div>
          </section>

          {/* Practice Areas Section */}
          <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our <span className="text-blue-600">Practice Areas</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Expert legal representation across multiple practice areas
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            {currentIndex > 0 && (
              <button
                onClick={scrollLeft}
                className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-blue-50 hover:shadow-2xl transition-all duration-300 group border border-gray-100"
              >
                <ArrowLeft className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
              </button>
            )}
            {currentIndex < practices.length - 1 && (
              <button
                onClick={scrollRight}
                className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-blue-50 hover:shadow-2xl transition-all duration-300 group border border-gray-100"
              >
                <ArrowRight className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
              </button>
            )}

            {/* Scrollable Cards */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="overflow-x-auto snap-x snap-mandatory flex px-8 pb-8 scroll-smooth"
            >
              {practices.map((practice, index) => (
                <div
                  key={index}
                  className="min-w-full snap-center flex items-center justify-center px-4"
                >
                  <div className="max-w-5xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative overflow-hidden">
                        <img 
                          src={practice.img} 
                          alt={practice.name} 
                          className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                          <div className="mb-4 inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Available</span>
                          </div>
                          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            {practice.name}
                          </h3>
                          <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {practice.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setStep(2)}
                          className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          Find a Lawyer
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-12 gap-3">
              {practices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-3 bg-blue-600 shadow-lg"
                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Step 2 - Budget Selection */}
      {step === 2 && (
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-purple-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-6 inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium">Budget Selection</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Set Your
                <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Budget Range
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Choose your preferred consultation rate to find lawyers that match your budget
              </p>
            </div>
          </section>

          {/* Budget Selection Section */}
          <section className="py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div 
                className={`bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Choose Your <span className="text-blue-600">Hourly Rate</span>
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Select the hourly rate that fits your budget for legal services
                  </p>
                </div>

                {/* Selected Practice Display */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Selected Practice</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {practices[currentIndex].name}
                  </h3>
                </div>

                {/* Budget Slider */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-700 mb-6">
                    Preferred hourly rate:
                  </label>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min="5000"
                      max="50000"
                      step="1000"
                      value={range}
                      onChange={(e) => setRange(e.target.value)}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mb-6"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((range - 5000) / (50000 - 5000)) * 100}%, #e5e7eb ${((range - 5000) / (50000 - 5000)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    
                    <div className="flex justify-between text-sm text-gray-500 mb-8">
                      <span>{currency} 5,000</span>
                      <span>{currency} 50,000</span>
                    </div>
                  </div>

                  {/* Budget Display */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg">
                      {/* <DollarSign className="w-6 h-6" /> */}
                      <span className="text-3xl font-bold">
                        {currency} {parseInt(range).toLocaleString()}
                      </span>
                      <span className="text-blue-100">/consultation</span>
                    </div>
                  </div>

                  {/* Budget Description */}
                  <div className="text-center mb-8">
                    <p className="text-gray-600">
                      {range < 15000 && "Budget-friendly options with experienced lawyers"}
                      {range >= 15000 && range < 30000 && "Mid-range pricing with specialized expertise"}
                      {range >= 30000 && "Premium lawyers with extensive experience"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Practices
                  </button>
                  
                  <button
                    onClick={() =>
                      navigate("/lawyers", {
                        state: {
                          selectedPractice: practices[currentIndex],
                          selectedBudget: range,
                          currency,
                        },
                      })
                    }
                    className="flex-1 group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Continue to Lawyers
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
}

export default function BookAppointment() {
  return <BookAppointmentContent />;
}