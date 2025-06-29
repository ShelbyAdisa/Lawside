// 

import React from "react";

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

export default function ClientDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📣 Client Dashboard</h2>
      <h3 className="text-xl font-semibold mb-4">Your Appointments</h3>
      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white shadow-md p-4 rounded-lg border"
          >
            <p><strong>Lawyer:</strong> {appt.lawyer}</p>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Time:</strong> {appt.time}</p>
            <p><strong>Status:</strong> <span className={`font-semibold ${appt.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>{appt.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
