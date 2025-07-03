import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState("");
  const [priceRange, setPriceRange] = useState("");

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

    const fee = parseFloat(lawyer.consultation_fee) * 127;
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

  const handleViewProfile = (lawyerId) => {
    console.log("View profile of:", lawyerId);
    // You can navigate to a detailed profile page here
  };

  const handleBookAppointment = (lawyerId) => {
    console.log("Book appointment with:", lawyerId);
    // You can navigate to booking flow here
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
              {["name", "rating", "price"].map((field) => (
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
                          {lawyer.location || "N/A"}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                        {lawyer.biography}
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-800 font-bold">{priceRange}</span>
                        <span className="text-gray-500">
                          {lawyer.years_experience || 0} years experience
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleViewProfile(lawyer.id)}
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
    </div>
  );
}
