import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Star,
  MapPin,
  DollarSign,
} from "lucide-react";

function Modal({ lawyer, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState("");

  if (!lawyer) return null;

  const handlePayment = async () => {
  if (!selectedDate) {
    alert("Please select a date and time1.");
    console.log("User ID:", user?.user_id);
    console.log("Lawyer ID:", lawyer.user_id);
    return;
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/payments/create-checkout-session/", {
      lawyer_id: lawyer.user_id,
      client_id: user?.user_id, 
      date: selectedDate.toISOString(),
      message,
      amount: parseFloat(lawyer.consultation_fee) * 127,
    });

    window.location.href = response.data.checkout_url;
  } catch (error) {
    console.error("Payment error:", error);
    alert("Unable to proceed to payment.");
  }
};


  const formatDate = (dateString) => {
    // Add validation to ensure we have a valid date string
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) return "Invalid Date";
    
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">{lawyer.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg font-bold"
          >
            ×
          </button>
        </div>

        {/* Profile and Booking */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Lawyer Info */}
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>Biography:</strong> {lawyer.biography}</p>
            <p><strong>Practice Areas:</strong> {lawyer.practice_areas.join(", ")}</p>
            <p><strong>Languages Spoken:</strong> {lawyer.languages_spoken || "N/A"}</p>
            <p><strong>Years of Experience:</strong> {lawyer.years_of_experience}</p>
            <p><strong>Education:</strong> {lawyer.education}</p>
            {lawyer.certifications && (
              <p><strong>Certifications:</strong> {lawyer.certifications}</p>
            )}
            <p><strong>Bar Admission Date:</strong> {formatDate(lawyer.bar_admission_date)}</p>
            <p><strong>License Number:</strong> {lawyer.license_number || "N/A"}</p>
            <p><strong>Office Address:</strong> {lawyer.office_address}</p>

            <p className="text-gray-700 font-medium">
              Rating: {parseFloat(lawyer.average_rating).toFixed(1)} / 5.0
              <span className="text-sm text-gray-500 ml-2">
                ({lawyer.total_reviews} reviews)
              </span>
            </p>

            <p className="font-semibold text-green-700 text-lg mt-2">
              Consultation Fee: KES {(parseFloat(lawyer.consultation_fee) * 127).toLocaleString()}
            </p>
          </div>

          {/* Booking Form */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Select Appointment Date & Time
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholderText="Choose a time"
            />

            <label className="block text-sm font-medium mb-1 text-gray-700">
              Message for Lawyer
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Optional message..."
              className="w-full p-2 border border-gray-300 rounded resize-none"
            />

            <div className="mt-6 flex justify-end">
              <button
                onClick={handlePayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Lawyers() {
  const location = useLocation();
  const { selectedPractice, selectedBudget, currency } = location.state || {};
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState(() => selectedPractice?.name || "");
  const [priceRange, setPriceRange] = useState(() => {
    if (!selectedBudget) return "";
    if (selectedBudget <= 10000) return "0-10000";
    if (selectedBudget <= 20000) return "10000-20000";
    return "20000+";
  });
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/lawyers/")
      .then((res) => {
        setLawyers(res.data);
        setFilteredLawyers(res.data);
      })
      .catch((err) => console.error("Failed to fetch lawyers:", err));
  }, []);

  const allPracticeAreas = [...new Set(lawyers.flatMap((lawyer) => lawyer.practice_areas))];


    useEffect(() => {
  let filtered = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.practice_areas.some((area) =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesPracticeArea =
      selectedPracticeArea === "" ||
      lawyer.practice_areas.some((area) => area === selectedPracticeArea);

    const fee = Math.ceil(parseFloat(lawyer.consultation_fee) * 127);
    const matchesPriceRange =
      priceRange === "" ||
      (priceRange === "0-10000" && fee <= 10000) ||
      (priceRange === "10000-20000" && fee > 10000 && fee <= 20000) ||
      (priceRange === "20000+" && fee > 20000);

    return matchesSearch && matchesPracticeArea && matchesPriceRange;
  });

  // Apply sorting after filtering
  if (sortBy) {
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      if (sortBy === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else if (sortBy === "rating") {
        aValue = parseFloat(a.average_rating);
        bValue = parseFloat(b.average_rating);
      } else if (sortBy === "fee") {
        aValue = parseFloat(a.consultation_fee) * 127;
        bValue = parseFloat(b.consultation_fee) * 127;
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }

  // Set the filtered and sorted results
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

  const handleViewProfile = (lawyer) => {
    setSelectedLawyer(lawyer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLawyer(null);
  };

  const handleBooking = async () => {
  if (!selectedDate) {
    alert("Please select a date and time.");
    return;
  }

};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Find Your Legal Expert
          </h1>
          <p className="text-blue-600">
            Connect with qualified lawyers in your area
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
              <input
                type="text"
                placeholder="Search lawyers or practice areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
              <select
                value={selectedPracticeArea}
                onChange={(e) => setSelectedPracticeArea(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Practice Areas</option>
                {allPracticeAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Price Ranges</option>
                <option value="0-10000">KES 0 - 10,000</option>
                <option value="10000-20000">KES 10,000 - 20,000</option>
                <option value="20000+">KES 20,000+</option>
              </select>
            </div>

            <div className="flex gap-2">
              {["name", "rating", "fee"].map((field) => (
                <button
                  key={field}
                  onClick={() => toggleSort(field)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium ${
                    sortBy === field
                      ? "bg-blue-100 text-blue-700 shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {field[0].toUpperCase() + field.slice(1)}
                  {sortBy === field &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-blue-600 font-medium">
            {filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLawyers.map((lawyer) => {
            const fullName = lawyer.name;
            const practiceAreas = lawyer.practice_areas;
            const priceRange = `KES ${Number(
              lawyer.consultation_fee * 127 || 0
            ).toLocaleString()}/hr`;
            const rating = (Number(lawyer.average_rating) || 0).toFixed(1);

            return (
              <div
                key={lawyer.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl">
                      {fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-900 mb-1">
                        {fullName}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {practiceAreas.map((area, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4" />
                          {rating}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <MapPin className="h-4 w-4" />
                          {lawyer.office_address || "N/A"}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                        {lawyer.biography}
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-800 font-bold">{priceRange}</span>
                        <span className="text-gray-500">
                          {lawyer.years_of_experience || 0} years experience
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleViewProfile(lawyer)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
                    >
                      View Profile & Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredLawyers.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No lawyers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal lawyer={selectedLawyer} onClose={closeModal} />
      )}
    </div>
  );
}
