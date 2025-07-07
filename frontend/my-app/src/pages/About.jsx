import React from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseIcon, UsersIcon, ShieldCheckIcon } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Lawside
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between legal professionals and the people who need them. We provide
            quick, secure, and trusted legal services across Kenya.
          </p>
        </div>
      </section>

      {/* Core Values / Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-center mb-4">
                <ShieldCheckIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Trust & Confidentiality</h3>
              <p className="text-gray-600">
                Your privacy is our priority. All consultations and data are handled with
                confidentiality and security.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-center mb-4">
                <UsersIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Diverse Legal Experts</h3>
              <p className="text-gray-600">
                Our platform brings together experienced lawyers across various fields – from family
                law to corporate litigation.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-center mb-4">
                <BriefcaseIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Accessible Justice</h3>
              <p className="text-gray-600">
                We make legal help more affordable and accessible to every Kenyan, regardless of
                location or background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600">
            At LawConnect, we believe that everyone deserves access to justice. Whether you're
            drafting a will, facing a legal dispute, or simply need guidance — we’re here to help
            you find the right legal support, fast.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with a qualified lawyer today and get the legal advice you need.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
