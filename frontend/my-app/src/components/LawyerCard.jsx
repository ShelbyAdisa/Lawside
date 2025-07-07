import React from "react";
import { Star, MapPin } from "lucide-react";

const LawyerCard = ({ lawyer, onViewProfile }) => {
  const fullName = lawyer.name;
  const practiceAreas = lawyer.practice_areas;
  const priceRange = `KES ${Number(lawyer.consultation_fee * 127 || 0).toLocaleString()}/hr`;
  const rating = (Number(lawyer.average_rating) || 0).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="p-6">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl">
            {fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-900 mb-1">{fullName}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {practiceAreas.map((area, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
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
            <p className="text-gray-600 text-sm mb-2 line-clamp-3">{lawyer.biography}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-800 font-bold">{priceRange}</span>
              <span className="text-gray-500">{lawyer.years_of_experience || 0} years experience</span>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => onViewProfile(lawyer)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            View Profile & Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
