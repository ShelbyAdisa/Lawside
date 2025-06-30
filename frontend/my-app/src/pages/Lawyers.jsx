import React from "react";

const lawyers = [
  {
    name: "Jane Muthoni",
    img: "/images/jane.jpg",
    rating: 4.8,
    types: ["Family Law", "Property Law"],
    priceRange: "KES 5,000 - 10,000/hr",
    bio: "Jane has over 10 years of experience handling family and property cases across Nairobi. Her empathetic approach and strategic litigation skills have helped countless clients resolve disputes peacefully."
  },
  {
    name: "Brian Otieno",
    img: "/images/brian.jpg",
    rating: 4.5,
    types: ["Criminal Law", "Tax Law"],
    priceRange: "KES 4,000 - 8,000/hr",
    bio: "A former prosecutor turned defense attorney, Brian specializes in criminal litigation and tax compliance. His assertive courtroom presence and attention to detail make him a strong advocate."
  },
  {
    name: "Linet Wambui",
    img: "/images/linet.jpg",
    rating: 4.9,
    types: ["Corporate Law", "Employment Law"],
    priceRange: "KES 6,000 - 12,000/hr",
    bio: "Linet works with both startups and established companies, providing legal counsel on contracts, mergers, and employment regulations. She's known for her pragmatic advice and quick turnaround."
  },
  {
    name: "David Mwangi",
    img: "/images/david.jpg",
    rating: 4.7,
    types: ["Immigration Law", "Environmental Law"],
    priceRange: "KES 3,500 - 7,500/hr",
    bio: "David helps clients navigate complex immigration processes and is an advocate for sustainable development. He blends legal precision with a passion for justice and environmental rights."
  }
];

export default function Lawyers() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Available Lawyers</h1>
      <div className="flex flex-col gap-6">
        {lawyers.map((lawyer, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={lawyer.img}
                alt={lawyer.name}
                className="w-full md:w-48 h-48 object-cover rounded-md"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-2">{lawyer.name}</h2>
                  <p className="text-gray-600 text-sm mb-1">{lawyer.types.join(", ")}</p>
                  <p className="text-yellow-500 font-semibold mb-2">⭐ {lawyer.rating.toFixed(1)}</p>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{lawyer.bio}</p>
                </div>
                <p className="text-blue-800 font-bold">{lawyer.priceRange}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
