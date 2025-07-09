import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { selectedPractice, selectedBudget, currency } = location.state || {};

  const [selectedPracticeArea, setSelectedPracticeArea] = useState(selectedPractice?.name || "");
  const [priceRange, setPriceRange] = useState(() => {
    if (!selectedBudget) return "";
    const budget = parseInt(selectedBudget);
    if (budget <= 10000) return "0-10000";
    if (budget <= 20000) return "10000-20000";
    return "20000+";
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/lawyers/")
      .then((res) => {
        setLawyers(res.data);
        setFilteredLawyers(res.data);
      })
      .catch((err) => console.error("Failed to fetch lawyers:", err));
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
        client_id: null,
        date: selectedDate.toISOString(),
        message,
        amount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Your Legal Expert</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search lawyers or practice areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Practice Area Filter */}
            <select
              value={selectedPracticeArea}
              onChange={(e) => setSelectedPracticeArea(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Prices</option>
              <option value="0-10000">KSH 0 - 10,000</option>
              <option value="10000-20000">KSH 10,000 - 20,000</option>
              <option value="20000+">KSH 20,000+</option>
            </select>
          </div>
          
          {/* Sort Options */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => toggleSort("name")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                sortBy === "name" ? "bg-blue-100 border-blue-300" : "bg-white border-gray-300"
              }`}
            >
              Name
              {sortBy === "name" && (
                sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => toggleSort("rating")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                sortBy === "rating" ? "bg-blue-100 border-blue-300" : "bg-white border-gray-300"
              }`}
            >
              Rating
              {sortBy === "rating" && (
                sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => toggleSort("fee")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                sortBy === "fee" ? "bg-blue-100 border-blue-300" : "bg-white border-gray-300"
              }`}
            >
              Fee
              {sortBy === "fee" && (
                sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Lawyers Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLawyers.map((lawyer) => (
            <div key={lawyer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{lawyer.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {lawyer.average_rating || "No rating"} ({lawyer.total_reviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      KSH {Math.ceil(parseFloat(lawyer.consultation_fee) * 127).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">consultation fee</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{lawyer.location || "Location not specified"}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.practice_areas?.map((area, index) => (
                      <span
                        key={`${lawyer.id}-${area}-${index}`}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {lawyer.bio || "No bio available"}
                </p>
                
                <button
                  onClick={() => openModal(lawyer)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  View Profile & Book
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredLawyers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No lawyers found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedLawyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl overflow-y-auto max-h-[90vh] mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-3xl font-semibold text-gray-800">{selectedLawyer.name}</h2>
              <button 
                onClick={closeModal} 
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Profile Info */}
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-600">{selectedLawyer.bio || "No bio available"}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Practice Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLawyer.practice_areas?.map((area, index) => (
                      <span
                        key={`modal-${selectedLawyer.id}-${area}-${index}`}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{selectedLawyer.location || "Location not specified"}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Rating</h3>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-gray-600">
                      {selectedLawyer.average_rating || "No rating"} ({selectedLawyer.total_reviews || 0} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Consultation Fee</h3>
                  <div className="text-2xl font-bold text-green-600">
                    KSH {Math.ceil(parseFloat(selectedLawyer.consultation_fee) * 127).toLocaleString()}
                  </div>
                </div>
              </div>
              
              {/* Booking Form */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Book a Consultation</h3>
                
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-gray-700">Date & Time</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholderText="Select date and time"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2 font-medium text-gray-700">Message (Optional)</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your legal matter or questions..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                
                <button
                  onClick={proceedToPayment}
                  disabled={!selectedDate}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}