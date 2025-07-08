import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  FileText,
  BookOpen,
  MessageCircle,
  UserCircle,
  DollarSign,
} from "lucide-react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

const initialAppointments = [
  {
    id: 1,
    client: "Jane Smith",
    date: "2025-07-02",
    time: "3:00 PM",
    status: "Confirmed",
  },
  {
    id: 2,
    client: "Alex Johnson",
    date: "2025-07-06",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    id: 3,
    client: "Linda Carter",
    date: "2025-07-08",
    time: "2:00 PM",
    status: "Payment Pending",
  },
];

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
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleDecision = (id, action) => {
    setAppointments(prev =>
      prev.map(appt =>
        appt.id === id && appt.status === "Pending"
          ? { ...appt, status: action === "confirm" ? "Payment Pending" : "Rejected" }
          : appt
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl shadow flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-purple-800">Welcome Back, Advocate Lee!</h2>
          <p className="text-gray-700 mt-1">Your dashboard gives an overview of your legal work and client activity.</p>
        </div>
        <UserCircle className="w-12 h-12 text-purple-700" />
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Clients</p>
            <AnimatedCounter value="18" className="text-xl font-bold text-purple-700" />
          </div>
          <UserCircle className="w-6 h-6 text-purple-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Upcoming Appointments</p>
            <AnimatedCounter value="6" className="text-xl font-bold text-blue-700" />
          </div>
          <CalendarCheck className="w-6 h-6 text-blue-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Documents Reviewed</p>
            <AnimatedCounter value="9" className="text-xl font-bold text-purple-600" />
          </div>
          <FileText className="w-6 h-6 text-purple-500" />
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => navigate("/appointments")}
          className="flex flex-col items-center justify-center bg-white border rounded-lg p-4 shadow hover:bg-gray-50 transition"
        >
          <CalendarCheck className="w-6 h-6 text-purple-600" />
          <span className="mt-2 text-sm font-medium text-gray-700">Appointments</span>
        </button>
        <button
          onClick={() => navigate("/chat")}
          className="flex flex-col items-center justify-center bg-white border rounded-lg p-4 shadow hover:bg-gray-50 transition"
        >
          <MessageCircle className="w-6 h-6 text-purple-600" />
          <span className="mt-2 text-sm font-medium text-gray-700">Messages</span>
        </button>
        <button
          onClick={() => navigate("/documents")}
          className="flex flex-col items-center justify-center bg-white border rounded-lg p-4 shadow hover:bg-gray-50 transition"
        >
          <FileText className="w-6 h-6 text-purple-600" />
          <span className="mt-2 text-sm font-medium text-gray-700">Client History</span>
        </button>
        <button
          onClick={() => navigate("/finances")}
          className="flex flex-col items-center justify-center bg-white border rounded-lg p-4 shadow hover:bg-gray-50 transition"
        >
          <DollarSign className="w-6 h-6 text-purple-600" />
          <span className="mt-2 text-sm font-medium text-gray-700">Track Finances</span>
        </button>
      </div>

      {/* Appointments section */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Client Appointments</h3>
        {appointments.length ? (
          <ul className="divide-y divide-gray-200">
            {appointments.map((appt) => (
              <li key={appt.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-800 font-medium">{appt.client}</p>
                  <p className="text-sm text-gray-600">{appt.date} at {appt.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    appt.status === "Confirmed"
                      ? "bg-purple-100 text-purple-700"
                      : appt.status === "Payment Pending"
                      ? "bg-red-100 text-red-700"
                      : appt.status === "Rejected"
                      ? "bg-gray-200 text-gray-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {appt.status}
                  </span>
                  {appt.status === "Pending" && (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleDecision(appt.id, "confirm")}
                        className="text-sm text-green-600 hover:underline"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleDecision(appt.id, "reject")}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">You have no upcoming appointments.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6">
        For assistance, contact admin at <span className="text-purple-700 font-medium">admin@lawfirm.com</span>
      </footer>
    </div>
  );
}

export default function LawyerDashboard() {
  return <LawyerDashboardContent />;
}
