import React, { useEffect, useState } from "react";
import { CalendarDays, MessageCircle, UserCircle, FileText, BookOpen, CalendarCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Sample data for appointments
const appointments = [
  {
    id: 1,
    lawyer: "John Doe",
    date: "2025-07-01",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    lawyer: "Sarah Kim",
    date: "2025-07-05",
    time: "2:00 PM",
    status: "Pending",
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

export default function ClientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl shadow flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-800">Welcome Back, Melba!</h2>
          <p className="text-gray-700 mt-1">Here’s how you’re working with your legal team and managing client services.</p>
        </div>
        <UserCircle className="w-12 h-12 text-blue-700" />
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Appointments</p>
            <AnimatedCounter value="12" className="text-xl font-bold text-blue-700" />
          </div>
          <CalendarCheck className="w-6 h-6 text-blue-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending Consults</p>
            <AnimatedCounter value="3" className="text-xl font-bold text-yellow-600" />
          </div>
          <MessageCircle className="w-6 h-6 text-yellow-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Documents Uploaded</p>
            <AnimatedCounter value="5" className="text-xl font-bold text-blue-600" />
          </div>
          <FileText className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => navigate('/book')}
          className="flex flex-col items-center justify-center bg-white border rounded-lg p-4 shadow hover:bg-gray-50 transition"
        >
          <CalendarDays className="w-6 h-6 text-blue-600" />
          <span className="mt-2 text-sm font-medium text-gray-700">Book Appointment</span>
        </button>
        <button 
        onClick={() => navigate('/chat')}
        className="flex flex-col items-center justify-center bg-white border rounded-lg p-4 shadow hover:bg-gray-50 transition">
          <MessageCircle className="w-6 h-6 text-blue-600" />
          <span className="mt-2 text-sm font-medium text-gray-700">Messages</span>
        </button>
        <button 
        onClick={() => navigate('/documents')}
        className="flex flex-col items-center justify-center bg-white border rounded-lg p-4 shadow hover:bg-gray-50 transition">
          <FileText className="w-6 h-6 text-blue-600" />
          <span className="mt-2 text-sm font-medium text-gray-700">Documents</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-white border rounded-lg p-4 shadow hover:bg-gray-50 transition">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <span className="mt-2 text-sm font-medium text-gray-700">Legal Resources</span>
        </button>
      </div>

      {/* Upcoming Appointments */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Upcoming Appointments</h3>
        {appointments.length ? (
          <ul className="divide-y divide-gray-200">
            {appointments.map((appt) => (
              <li key={appt.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-800 font-medium">{appt.lawyer}</p>
                  <p className="text-sm text-gray-600">{appt.date} at {appt.time}</p>
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  appt.status === "Confirmed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {appt.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">You have no upcoming appointments.</p>
        )}
      </section>

      {/* Footer/Info */}
      <footer className="text-center text-sm text-gray-500 py-6">
        Need help? Contact our support team at <span className="text-blue-700 font-medium">support@lawfirm.com</span>
      </footer>
    </div>
  );
}
