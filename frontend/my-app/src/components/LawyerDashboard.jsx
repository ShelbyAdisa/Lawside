import React, { useEffect, useState, useContext } from "react";
import {
  CalendarCheck,
  FileText,
  DollarSign,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
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
        const res = await fetch("http://localhost:8000/api/appointments/public/", {
          headers: {
            Authorization: `Token ${token || localStorage.getItem("authToken")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        const allAppointments = data.results || [];

        // Filter for this lawyer
        const filtered = allAppointments.filter(
          (a) => a.lawyer_email === user?.email
        );
        setAppointments(allAppointments);
        setLawyerAppointments(filtered);

        // Unique client emails
        const uniqueClientEmails = [...new Set(filtered.map((a) => a.client_email))];
        setUniqueClients(uniqueClientEmails);

        // Most booked weekday
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl shadow flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-purple-800">
            Welcome Back, Advocate {user?.last_name || ""}
          </h2>
          <p className="text-gray-700 mt-1">
            Your dashboard gives an overview of your legal work and client activity.
          </p>
        </div>
        <UserCircle className="w-12 h-12 text-purple-700" />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Clients</p>
            <AnimatedCounter
              value={uniqueClients.length.toString()}
              className="text-xl font-bold text-purple-700"
            />
          </div>
          <UserCircle className="w-6 h-6 text-purple-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending Appointments</p>
            <AnimatedCounter
              value={lawyerAppointments.filter((a) => a.status === "pending").length.toString()}
              className="text-xl font-bold text-yellow-600"
            />
          </div>
          <CalendarCheck className="w-6 h-6 text-yellow-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Most Booked Day</p>
            <h3 className="text-xl font-bold text-purple-600">{mostBookedDay || "—"}</h3>
          </div>
          <FileText className="w-6 h-6 text-purple-500" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/appointments")}
          className="flex flex-col items-center justify-center bg-white border rounded-lg p-4 shadow hover:bg-gray-50 transition"
        >
          <CalendarCheck className="w-6 h-6 text-purple-600" />
          <span className="mt-2 text-sm font-medium text-gray-700">Appointments</span>
        </button>
        <button
          onClick={() => navigate("/history")}
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

      {/* Appointments Section */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Upcoming Client Appointments
        </h3>
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
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6">
        For assistance, contact admin at{" "}
        <span className="text-purple-700 font-medium">admin@lawfirm.com</span>
      </footer>
    </div>
  );
}

export default function LawyerDashboard() {
  return <LawyerDashboardContent />;
}
