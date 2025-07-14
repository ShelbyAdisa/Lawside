import React, { useEffect, useState, useContext } from "react";
import {
  CalendarDays,
  MessageCircle,
  UserCircle,
  FileText,
  BookOpen,
  CalendarCheck,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AnimatedCounter({ value, className }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    const duration = 800;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <h3 className={className}>{count}</h3>;
}

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [clientAppointments, setClientAppointments] = useState([]);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/appointments/public/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        const allAppointments = data.results || [];

        // Filter appointments for the current logged-in user
        const filtered = allAppointments.filter(
          (appt) => appt.client_email === user?.email
        );

        setAppointments(allAppointments);
        setClientAppointments(filtered);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, [user]);

  useEffect(() => {
    // Animation observer
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

  const quickActions = [
    {
      icon: <CalendarDays className="w-8 h-8" />,
      title: "Book Appointment",
      desc: "Schedule a consultation with a lawyer",
      onClick: () => navigate("/book"),
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Documents",
      desc: "Manage your legal documents",
      onClick: () => navigate("/documents"),
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Legal Resources",
      desc: "Access helpful legal information",
      onClick: () => navigate("/resources"),
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Hero Welcome Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-teal-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium">Client Portal</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Welcome Back,
                <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  {user?.first_name}!
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                Here's how you're working with your legal team and managing client services.
              </p>
            </div>
            
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <UserCircle className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Stats Section */}
        <section 
          id="stats-section"
          data-animate
          className={`transition-all duration-1000 ${
            isVisible['stats-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Legal <span className="text-blue-600">Dashboard</span>
            </h2>
            <p className="text-xl text-gray-600">
              Track your appointments, documents, and legal progress at a glance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Total Appointments</p>
                  <AnimatedCounter
                    value={(appointments?.length || 0).toString()}
                    className="text-3xl font-bold text-blue-600"
                  />
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CalendarCheck className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 transform hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Pending Consults</p>
                  <AnimatedCounter
                    value={Array.isArray(appointments) ? appointments.filter((a) => a.status === "pending").length.toString() : "0"}
                    className="text-3xl font-bold text-yellow-600"
                  />
                </div>
                <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Documents Uploaded</p>
                  <AnimatedCounter value="4" className="text-3xl font-bold text-green-600" />
                </div>
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section 
          id="actions-section"
          data-animate
          className={`transition-all duration-1000 ${
            isVisible['actions-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick <span className="text-blue-600">Actions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your legal matters efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="group text-center p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 hover:scale-105"
              >
                <div className={`w-20 h-20 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{action.desc}</p>
                <div className="flex items-center justify-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section 
          id="appointments-section"
          data-animate
          className={`transition-all duration-1000 ${
            isVisible['appointments-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Your Upcoming Appointments
              </h3>
              <p className="text-blue-100">
                Stay on top of your scheduled consultations and meetings
              </p>
            </div>
            
            <div className="p-8">
              {clientAppointments.length ? (
                <div className="space-y-6">
                  {clientAppointments.map((appt) => (
                    <div key={appt.id} className="group flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <UserCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {appt.lawyer_name || "Lawyer"}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            {appt.date} at {appt.time?.slice(0, 5)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                            appt.status === "confirmed"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : appt.status === "pending"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {appt.status === "confirmed" && <CheckCircle className="w-4 h-4 mr-1" />}
                          {appt.status === "pending" && <Clock className="w-4 h-4 mr-1" />}
                          {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CalendarDays className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">No upcoming appointments</h4>
                  <p className="text-gray-600 mb-6">
                    Ready to schedule your next consultation?
                  </p>
                  <button
                    onClick={() => navigate("/book")}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Appointment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl p-12 text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need Help or Have Questions?
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Our support team is here to assist you with any questions about your legal matters or using our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@lawfirm.com"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Support
              </a>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                View FAQ
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}