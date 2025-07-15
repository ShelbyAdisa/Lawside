import React, { useEffect, useState, useContext } from "react";
import {
  CalendarCheck,
  FileText,
  DollarSign,
  UserCircle,
  CheckCircle,
  Clock,
  MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE;

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

function LawyerDashboardContent() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { token } = useContext(AuthContext);

  const [appointments, setAppointments] = useState([]);
  const [lawyerAppointments, setLawyerAppointments] = useState([]);
  const [uniqueClients, setUniqueClients] = useState([]);
  const [mostBookedDay, setMostBookedDay] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/appointments/public/`, {
          headers: {
            Authorization: `Token ${token || localStorage.getItem("authToken")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        const allAppointments = data.results || [];

        const filtered = allAppointments.filter(
          (a) => a.lawyer_email === user?.email
        );
        setAppointments(allAppointments);
        setLawyerAppointments(filtered);

        const uniqueClientEmails = [...new Set(filtered.map((a) => a.client_email))];
        setUniqueClients(uniqueClientEmails);

        const dayCount = {};
        filtered.forEach((a) => {
          const date = new Date(a.date);
          const day = date.toLocaleDateString("en-US", { weekday: "long" });
          dayCount[day] = (dayCount[day] || 0) + 1;
        });

        const mostFrequentDay = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
        setMostBookedDay(mostFrequentDay);

      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    if (user?.email) fetchAppointments();
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-purple-50 min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium">Lawyer Portal</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Welcome Back,{" "}
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Advocate {user?.last_name}
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                Your dashboard gives an overview of your legal work and client activity.
              </p>
            </div>

            <div className="hidden md:block">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                <UserCircle className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Total Clients</p>
                <AnimatedCounter
                  value={uniqueClients.length.toString()}
                  className="text-3xl font-bold text-purple-600"
                />
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserCircle className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 hover:border-yellow-200 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Pending Appointments</p>
                <AnimatedCounter
                  value={lawyerAppointments.filter((a) => a.status === "pending").length.toString()}
                  className="text-3xl font-bold text-yellow-600"
                />
              </div>
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 hover:border-pink-200 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Most Booked Day</p>
                <h3 className="text-3xl font-bold text-pink-600">{mostBookedDay || "—"}</h3>
              </div>
              <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <button
            onClick={() => navigate("/appointments")}
            className="group text-center p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-purple-200 transition-transform transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Appointments</h3>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="group text-center p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-purple-200 transition-transform transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="w-20 h-20 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Client History</h3>
          </button>

          <button
            onClick={() => navigate("/finances")}
            className="group text-center p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-purple-200 transition-transform transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Track Finances</h3>
          </button>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8">
            <h3 className="text-2xl font-bold text-white mb-2">Upcoming Client Appointments</h3>
            <p className="text-purple-100">
              Review your scheduled client consultations
            </p>
          </div>

          <div className="p-8">
            {lawyerAppointments.length ? (
              <ul className="divide-y divide-gray-200">
                {lawyerAppointments.map((appt) => (
                  <li key={appt.id} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-medium">
                        {appt.client_name || appt.client_email}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appt.date} at {appt.time?.slice(0, 5)}
                      </p>
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      appt.status === "confirmed"
                        ? "bg-purple-100 text-purple-700"
                        : appt.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">You have no upcoming appointments.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-6">
          For assistance, contact admin at{" "}
          <span className="text-purple-700 font-medium">admin@lawfirm.com</span>
        </footer>
      </div>
    </div>
  );
}

export default function LawyerDashboard() {
  return <LawyerDashboardContent />;
}
