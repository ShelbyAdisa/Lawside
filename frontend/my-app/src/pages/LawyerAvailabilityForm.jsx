import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const LawyerAvailabilityForm = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/appointments/availability/', {
        date,
        start_time: startTime,
        end_time: endTime,
      });
      alert('Availability saved!');
      setDate('');
      setStartTime('');
      setEndTime('');
    } catch (err) {
      console.error(err);
      alert('Error saving availability');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Set Your Availability</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Save Availability
        </button>
      </form>
    </div>
  );
};

export default LawyerAvailabilityForm;
