import { useEffect, useState, useContext } from "react";
import {
  CalendarDays,
  User,
  Clock,
  BadgeDollarSign,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function AppointmentsPage() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/appointments/public/`);
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        const filteredByUser = data.results.filter(
          (appt) =>
            appt.client_email === user?.email ||
            appt.lawyer_email === user?.email
        );
        setAppointments(filteredByUser);
      } catch (err) {
        console.error("Error loading appointments:", err);
      }
    };

    fetchAppointments();
  }, [user]);

  const filteredAppointments = appointments.filter((appt) => {
    return (
      (search === "" ||
        appt.client_name?.toLowerCase().includes(search.toLowerCase()) ||
        appt.status.toLowerCase().includes(search.toLowerCase()) ||
        appt.notes?.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "all" || appt.status === statusFilter.toLowerCase())
    );
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Appointments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search by client, status, or notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredAppointments.map((appt) => (
          <div
            key={appt.id}
            className="border rounded-lg p-4 shadow-sm bg-white space-y-4"
          >
            <div className="flex items-center gap-2">
              <User className="text-purple-600 w-4 h-4" />
              <h2 className="text-lg font-semibold">
                {appt.client_name || "Client"}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="w-4 h-4 text-purple-600" />
              <span>{appt.date}</span>
              <Clock className="w-4 h-4 text-purple-600 ml-4" />
              <span>{appt.time?.slice(0, 5)}</span>
            </div>
            {appt.fee && (
              <div className="flex items-center gap-2 text-sm">
                <BadgeDollarSign className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700 font-medium">
                  ${appt.fee}
                </span>
              </div>
            )}
            <div className="text-sm text-gray-600 italic">
              {appt.notes || "No additional notes."}
            </div>
            <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
            </div>
          </div>
        ))}
        {filteredAppointments.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
}
