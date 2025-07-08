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
    client: "Michael Thompson",
    date: "2025-07-03",
    time: "10:30 AM",
    status: "Confirmed",
    fee: "$180",
    description: "Family law consultation",
  },
  {
    id: 3,
    client: "Sophia Rodriguez",
    date: "2025-07-04",
    time: "1:00 PM",
    status: "Confirmed",
    fee: "$220",
    description: "Divorce case strategy session",
  },
  {
    id: 4,
    client: "David Kim",
    date: "2025-07-05",
    time: "9:00 AM",
    status: "Confirmed",
    fee: "$250",
    description: "Intellectual property rights consultation",
  },
  {
    id: 5,
    client: "Emily Nguyen",
    date: "2025-07-06",
    time: "4:00 PM",
    status: "Confirmed",
    fee: "$190",
    description: "Employment contract review",
  },
  {
    id: 6,
    client: "Brian Lee",
    date: "2025-07-07",
    time: "2:30 PM",
    status: "Confirmed",
    fee: "$210",
    description: "Mediation session",
  },
  {
    id: 7,
    client: "Natalie Perez",
    date: "2025-07-08",
    time: "11:00 AM",
    status: "Confirmed",
    fee: "$175",
    description: "Real estate closing consultation",
  },
  {
    id: 8,
    client: "Jason Clark",
    date: "2025-07-09",
    time: "5:00 PM",
    status: "Confirmed",
    fee: "$230",
    description: "Criminal defense strategy meeting",
  },
  {
    id: 9,
    client: "Ava Mitchell",
    date: "2025-07-10",
    time: "12:00 PM",
    status: "Confirmed",
    fee: "$160",
    description: "Immigration paperwork assistance",
  },
  {
    id: 10,
    client: "Christopher Allen",
    date: "2025-07-11",
    time: "3:30 PM",
    status: "Confirmed",
    fee: "$200",
    description: "Tax law consultation",
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
      <h1 className="text-2xl font-bold">History</h1>

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
            No clients found.
          </p>
        )}
      </div>
    </div>
  );
}