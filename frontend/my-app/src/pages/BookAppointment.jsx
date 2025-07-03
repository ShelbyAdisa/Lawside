import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const practices = [
  { 
    name: "Family Law", 
    img: "/images/family.jpg", 
    description: "Comprehensive legal services for divorce, child custody, adoption, prenuptial agreements, and domestic relations matters with compassionate guidance." 
  },
  { 
    name: "Criminal Law", 
    img: "/images/criminal.jpg", 
    description: "Aggressive defense representation for criminal charges, DUI cases, white-collar crimes, and appeals with experienced trial advocacy." 
  },
  { 
    name: "Employment Law", 
    img: "/images/employment.jpg", 
    description: "Workplace discrimination claims, wrongful termination, labor disputes, employment contracts, and HR compliance for employers and employees." 
  },
  { 
    name: "Personal Injury", 
    img: "/images/personal-injury.jpg", 
    description: "Maximum compensation for accident victims, medical malpractice, slip and fall cases, and wrongful death claims with no fee unless we win." 
  },
  { 
    name: "Real Estate", 
    img: "/images/real-estate.jpg", 
    description: "Property transactions, real estate disputes, zoning issues, landlord-tenant matters, and title examinations handled with precision and care." 
  },
  { 
    name: "Business Law", 
    img: "/images/business.jpg", 
    description: "Business formation, mergers and acquisitions, contract negotiations, compliance matters, and corporate governance for companies of all sizes." 
  },
  { 
    name: "Immigration", 
    img: "/images/immigration.jpg", 
    description: "Visa applications, citizenship proceedings, deportation defense, family reunification, and employment-based immigration solutions." 
  },
  { 
    name: "Estate Planning", 
    img: "/images/estate-planning.jpg", 
    description: "Wills, trusts, probate administration, estate tax planning, and asset protection strategies to secure your family's future." 
  },
];

function BookAppointmentContent() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [range, setRange] = useState(5000);
  const [currency, setCurrency] = useState("KES");
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef(null);

  useEffect(() => {
    const userLang = navigator.language;
    if (userLang.includes("en-US")) setCurrency("KES");
    else if (userLang.includes("en-GB")) setCurrency("GBP");
    else if (userLang.includes("en-IN")) setCurrency("INR");
    else setCurrency("USD");
  }, []);

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
    <div className="w-full min-h-screen bg-blue-50 text-gray-800 relative overflow-hidden">
      {step === 1 && (
        <div className="relative h-screen">
          {/* Scroll Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition-all"
            >
              &#8592;
            </button>
          )}
          {currentIndex < practices.length - 1 && (
            <button
              onClick={scrollRight}
              className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition-all"
            >
              &#8594;
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="overflow-x-auto snap-x snap-mandatory flex h-full scroll-smooth"
          >
            {practices.map((p, index) => (
              <div
                key={index}
                className="w-full min-w-full h-full flex items-center justify-center snap-center p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-96 object-cover" />
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-700 mb-4">{p.name}</h2>
                      <p className="text-gray-700 leading-relaxed">{p.description}</p>
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                      Find a Lawyer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
            {practices.map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-4 h-4 bg-blue-600 scale-110"
                    : "w-3 h-3 bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="flex flex-col items-center justify-center h-screen p-6">
          <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Set Your Budget</h2>
            <label className="block mb-4 text-gray-700">Select your preferred hourly rate:</label>
            <input
              type="range"
              min="5000"
              max="50000"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full mb-4"
            />
            <div className="text-center text-xl font-semibold text-blue-800 mb-6">
              {currency} {parseInt(range).toLocaleString()}/hr
            </div>
            <button
              onClick={() => navigate("/lawyers")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Continue to Lawyers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookAppointment() {
  return <BookAppointmentContent />;
}