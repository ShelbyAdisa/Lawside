import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download } from "lucide-react";
import saveAs from "file-saver";

const API_BASE = import.meta.env.VITE_API_BASE;

const COLORS = ["#a78bfa", "#f87171", "#34d399"];

const previewData = [
  { name: "Jan", clients: 12, revenue: 7000, expenses: 3000 },
  { name: "Feb", clients: 18, revenue: 9500, expenses: 4200 },
  { name: "Mar", clients: 14, revenue: 8500, expenses: 3900 },
  { name: "Apr", clients: 20, revenue: 11000, expenses: 4800 },
  { name: "May", clients: 16, revenue: 10200, expenses: 4100 },
  { name: "Jun", clients: 19, revenue: 12000, expenses: 5300 },
];

export default function TrackFinances() {
  const [data, setData] = useState(previewData);
  const [form, setForm] = useState({ month: "", clients: "", revenue: "", expenses: "" });
  const [isUserData, setIsUserData] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addData = () => {
    if (!form.month || !form.clients || !form.revenue || !form.expenses) return;
    const newEntry = {
      name: form.month,
      clients: parseInt(form.clients),
      revenue: parseInt(form.revenue),
      expenses: parseInt(form.expenses),
    };
    const updatedData = isUserData ? [...data, newEntry] : [newEntry];
    setData(updatedData);
    setForm({ month: "", clients: "", revenue: "", expenses: "" });
    setIsUserData(true);
  };

  const exportCSV = () => {
    const headers = "Month,Clients,Revenue,Expenses\n";
    const rows = data.map(d => `${d.name},${d.clients},${d.revenue},${d.expenses}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "financial_data.csv");
  };

  const averageRevenue = (data.reduce((acc, curr) => acc + curr.revenue, 0) / data.length).toFixed(2);
  const totalProfit = data.reduce((acc, curr) => acc + (curr.revenue - curr.expenses), 0);
  const maxClientsMonth = data.reduce((max, item) => item.clients > max.clients ? item : max, data[0]);

  const revenueBreakdown = data.reduce(
    (acc, entry) => {
      acc.consultations += entry.revenue * 0.45;
      acc.caseWins += entry.revenue * 0.35;
      acc.retainers += entry.revenue * 0.20;
      return acc;
    },
    { consultations: 0, caseWins: 0, retainers: 0 }
  );

  const breakdownData = [
    { name: "Consultations", value: Math.round(revenueBreakdown.consultations) },
    { name: "Case Wins", value: Math.round(revenueBreakdown.caseWins) },
    { name: "Retainers", value: Math.round(revenueBreakdown.retainers) },
  ];

  return (
    <div className="space-y-10 p-6">
      <h2 className="text-2xl font-bold text-purple-800">Finance & Client Insights</h2>

      {!isUserData && (
        <p className="text-gray-600 italic mb-4">
          Below is a preview using example data. You can input your own data to generate personalized financial insights.
        </p>
      )}

      {/* Smart KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h4 className="text-sm text-gray-500">Avg Monthly Revenue</h4>
          <p className="text-lg font-semibold text-purple-700">${averageRevenue}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h4 className="text-sm text-gray-500">Total Net Profit</h4>
          <p className="text-lg font-semibold text-green-600">{totalProfit} USD</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h4 className="text-sm text-gray-500">Peak Client Month</h4>
          <p className="text-lg font-semibold text-blue-600">{maxClientsMonth.name} ({maxClientsMonth.clients})</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Add Monthly Data</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="month"
            placeholder="Month (e.g., Jul)"
            value={form.month}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            name="clients"
            placeholder="Clients"
            value={form.clients}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            name="revenue"
            placeholder="Revenue"
            value={form.revenue}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            name="expenses"
            placeholder="Expenses"
            value={form.expenses}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
        </div>
        <button
          onClick={addData}
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Add Data
        </button>
        <button
          onClick={exportCSV}
          className="ml-4 inline-flex items-center gap-2 bg-gray-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Revenue vs Expenses Line Chart */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue & Expenses Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Clients Bar Chart */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Client Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barCategoryGap={20}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clients" fill="#34d399" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Breakdown Pie Chart */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={breakdownData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Budget Overview */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Overview</h3>
        <ul className="space-y-2">
          {data.map((d, i) => {
            const balance = d.revenue - d.expenses;
            return (
              <li
                key={i}
                className="flex justify-between items-center text-sm border-b py-2"
              >
                <span className="text-gray-700">{d.name}</span>
                <span className={`font-semibold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {balance >= 0 ? `+${balance}` : `-${Math.abs(balance)}`} USD
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
