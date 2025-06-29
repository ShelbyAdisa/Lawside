import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const BookingForm = () => {
  const [lawyers, setLawyers] = useState([]);
  const [formData, setFormData] = useState({
    lawyer: '',
    date: '',
    time: '',
    notes: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all lawyers for the dropdown
    axiosInstance.get('users/lawyers/') // assumes you have this endpoint
      .then(res => setLawyers(res.data))
      .catch(err => console.error('Error fetching lawyers:', err));
  }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const appointmentData = {
      lawyer: formData.lawyer,
      date_time: `${formData.date}T${formData.time}`,
      notes: formData.notes,
    };

    axiosInstance.post('appointments/create/', appointmentData)
      .then(() => setMessage('Appointment booked successfully!'))
      .catch(() => setMessage('Error booking appointment.'));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Book a Lawyer</h2>

      <label className="block mb-2">Select Lawyer:</label>
      <select
        name="lawyer"
        value={formData.lawyer}
        onChange={handleChange}
        required
        className="w-full mb-4 border p-2 rounded"
      >
        <option value="">-- Choose a Lawyer --</option>
        {lawyers.map(lawyer => (
          <option key={lawyer.id} value={lawyer.id}>
            {lawyer.full_name || lawyer.email}
          </option>
        ))}
      </select>

      <label className="block mb-2">Date:</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full mb-4 border p-2 rounded"
      />

      <label className="block mb-2">Time:</label>
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
        className="w-full mb-4 border p-2 rounded"
      />

      <label className="block mb-2">Notes (optional):</label>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full mb-4 border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Book Appointment
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
};

export default BookingForm;
