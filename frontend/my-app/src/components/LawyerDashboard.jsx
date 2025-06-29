// import React from "react";

// const LawyerDashboard = () => {
//   return (
//     <div className="space-y-4">
//       <h3 className="text-xl font-semibold">Your Lawyer Dashboard</h3>
//       <div className="bg-white shadow p-4 rounded">
//         <p className="text-gray-700">Manage your availability.</p>
//         <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
//           Set Availability
//         </button>
//       </div>
//       <div className="bg-white shadow p-4 rounded">
//         <p className="text-gray-700">View and manage client appointments.</p>
//         <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
//           View Appointments
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LawyerDashboard;
import React from "react";

const upcomingAppointments = [
  {
    id: 1,
    client: "Jane Smith",
    date: "2025-07-02",
    time: "11:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    client: "Alex Mwangi",
    date: "2025-07-06",
    time: "3:30 PM",
    status: "Pending",
  },
];

export default function LawyerDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">⚖️ Lawyer Dashboard</h2>
      <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
      <div className="space-y-4">
        {upcomingAppointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white shadow-md p-4 rounded-lg border"
          >
            <p><strong>Client:</strong> {appt.client}</p>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Time:</strong> {appt.time}</p>
            <p><strong>Status:</strong> <span className={`font-semibold ${appt.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>{appt.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
