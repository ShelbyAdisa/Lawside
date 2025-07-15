import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Star,
  MapPin,
  DollarSign,
  Calendar,
  User,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  X,
  Clock,
  Award,
  Users,
  Briefcase
} from "lucide-react";

export default function Lawyers() {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { selectedPractice, selectedBudget, currency } = location.state || {};
  const { user } = useContext(UserContext);

  const [selectedPracticeArea, setSelectedPracticeArea] = useState(selectedPractice?.name || "");
  const [priceRange, setPriceRange] = useState(() => {
    if (!selectedBudget) return "";
    const budget = parseInt(selectedBudget);
    if (budget <= 10000) return "0-10000";
    if (budget <= 20000) return "10000-20000";
    return "20000+";
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/lawyers/")
      .then((res) => {
        setLawyers(res.data);
        setFilteredLawyers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch lawyers:", err);
        setIsLoading(false);
      });
  }, []);

  const allPracticeAreas = [...new Set(lawyers.flatMap((l) => l.practice_areas))];

  useEffect(() => {
    let filtered = lawyers.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.practice_areas.some((area) =>
          area.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const fee = Math.ceil(parseFloat(l.consultation_fee) * 127);
      const matchesPractice =
        !selectedPracticeArea ||
        l.practice_areas.includes(selectedPracticeArea);
      const matchesPrice =
        !priceRange ||
        (priceRange === "0-10000" && fee <= 10000) ||
        (priceRange === "10000-20000" && fee > 10000 && fee <= 20000) ||
        (priceRange === "20000+" && fee > 20000);
      return matchesSearch && matchesPractice && matchesPrice;
    });

    filtered.sort((a, b) => {
      let aVal, bVal;
      if (sortBy === "name") {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      } else if (sortBy === "rating") {
        aVal = parseFloat(a.average_rating);
        bVal = parseFloat(b.average_rating);
      } else {
        aVal = parseFloat(a.consultation_fee) * 127;
        bVal = parseFloat(b.consultation_fee) * 127;
      }
      if (sortOrder === "asc") return aVal < bVal ? -1 : 1;
      return aVal > bVal ? -1 : 1;
    });

    setFilteredLawyers(filtered);
  }, [lawyers, searchTerm, selectedPracticeArea, priceRange, sortBy, sortOrder]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const openModal = (lawyer) => {
    setSelectedLawyer(lawyer);
    setSelectedDate(null);
    setMessage("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLawyer(null);
  };

  const proceedToPayment = () => {
    if (!selectedDate) {
      alert("Please select a date and time.");
      return;
    }
    const amount = Math.ceil(parseFloat(selectedLawyer.consultation_fee) * 127);
    navigate("/checkout", {
      state: {
        lawyer_id: selectedLawyer.user_id,
        client_id: user?.pk,
        date: selectedDate.toISOString(),
        message,
        amount,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading lawyers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-teal-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Legal Experts</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Legal Expert
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with experienced attorneys who specialize in your legal needs
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lawyers or practice areas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-lg"
                />
              </div>
              
              {/* Practice Area Filter */}
              <select
                value={selectedPracticeArea}
                onChange={(e) => setSelectedPracticeArea(e.target.value)}
                className="px-6 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 shadow-lg"
              >
                <option value="">All Practice Areas</option>
                {allPracticeAreas.map((area, index) => (
                  <option key={area || index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              
              {/* Price Range Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-6 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 shadow-lg"
              >
                <option value="">All Prices</option>
                <option value="0-10000">KSH 0 - 10,000</option>
                <option value="10000-20000">KSH 10,000 - 20,000</option>
                <option value="20000+">KSH 20,000+</option>
              </select>
            </div>
            
            {/* Sort Options */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => toggleSort("name")}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 ${
                  sortBy === "name" 
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg" 
                    : "bg-white/90 backdrop-blur-sm border-white/20 text-gray-700 hover:bg-white shadow-lg"
                }`}
              >
                <User className="h-4 w-4" />
                Name
                {sortBy === "name" && (
                  sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => toggleSort("rating")}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 ${
                  sortBy === "rating" 
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg" 
                    : "bg-white/90 backdrop-blur-sm border-white/20 text-gray-700 hover:bg-white shadow-lg"
                }`}
              >
                <Star className="h-4 w-4" />
                Rating
                {sortBy === "rating" && (
                  sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => toggleSort("fee")}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 ${
                  sortBy === "fee" 
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg" 
                    : "bg-white/90 backdrop-blur-sm border-white/20 text-gray-700 hover:bg-white shadow-lg"
                }`}
              >
                <DollarSign className="h-4 w-4" />
                Fee
                {sortBy === "fee" && (
                  sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lawyers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredLawyers.map((lawyer) => (
            <div key={lawyer.id} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{lawyer.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {lawyer.average_rating || "No rating"}
                        </span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {lawyer.total_reviews || 0} reviews
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      KSH {Math.ceil(parseFloat(lawyer.consultation_fee) * 127).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">consultation fee</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{lawyer.office_address || "Location not specified"}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.practice_areas?.map((area, index) => (
                      <span
                        key={`${lawyer.id}-${area}-${index}`}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {lawyer.biography || "No bio available"}
                </p>
                
                <button
                  onClick={() => openModal(lawyer)}
                  className="w-full group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-5 h-5" />
                  View Profile & Book
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredLawyers.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No lawyers found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedLawyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedLawyer.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-medium text-gray-700">
                        {selectedLawyer.average_rating || "No rating"}
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">
                      {selectedLawyer.total_reviews || 0} reviews
                    </span>
                  </div>
                </div>
                <button 
                  onClick={closeModal} 
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Info */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      About
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{selectedLawyer.biography || "No bio available"}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-green-600" />
                      Practice Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLawyer.practice_areas?.map((area, index) => (
                        <span
                          key={`modal-${selectedLawyer.id}-${area}-${index}`}
                          className="px-3 py-1 bg-white/70 backdrop-blur-sm text-gray-700 rounded-full text-sm font-medium border border-white/50"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-purple-600" />
                        <h3 className="text-lg font-semibold">Location</h3>
                      </div>
                      <p className="text-gray-700">{selectedLawyer.office_address || "Not specified"}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-yellow-600" />
                        <h3 className="text-lg font-semibold">Fee</h3>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        KSH {Math.ceil(parseFloat(selectedLawyer.consultation_fee) * 127).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Booking Form */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Book a Consultation
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Date & Time</label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={setSelectedDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholderText="Select date and time"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Message (Optional)</label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your legal matter or questions..."
                        className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                      />
                    </div>
                    
                    <button
                      onClick={proceedToPayment}
                      disabled={!selectedDate}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}