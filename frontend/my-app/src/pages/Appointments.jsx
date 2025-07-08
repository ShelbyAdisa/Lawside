import { useState } from "react";
import { CalendarDays, User, Clock, BadgeDollarSign } from "lucide-react";

const initialAppointments = [
  {
    id: 1,
    client: "Jane Smith",
    date: "2025-07-02",
    time: "3:00 PM",
    status: "Confirmed",
    fee: "$200",
    description: "Contract review and consultation",
  },
  {
    id: 2,
    client: "Alex Johnson",
    date: "2025-07-06",
    time: "11:00 AM",
    status: "Pending",
    fee: "$150",
    description: "Business formation advice",
  },
  {
    id: 3,
    client: "Linda Carter",
    date: "2025-07-08",
    time: "2:00 PM",
    status: "Payment Pending",
    fee: "$175",
    description: "Real estate transaction guidance",
  },
];

export default function AppointmentsPage() {
  const [appointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAppointments = appointments.filter((appt) => {
    return (
      (search === "" ||
        appt.client.toLowerCase().includes(search.toLowerCase()) ||
        appt.status.toLowerCase().includes(search.toLowerCase()) ||
        appt.description.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "all" || appt.status === statusFilter)
    );
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Appointments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search by client, status, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Payment Pending">Payment Pending</option>
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
              <h2 className="text-lg font-semibold">{appt.client}</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="w-4 h-4 text-purple-600" />
              <span>{appt.date}</span>
              <Clock className="w-4 h-4 text-purple-600 ml-4" />
              <span>{appt.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BadgeDollarSign className="w-4 h-4 text-purple-600" />
              <span className="text-gray-700 font-medium">{appt.fee}</span>
            </div>
            <div className="text-sm text-gray-600 italic">{appt.description}</div>
            <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {appt.status}
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
