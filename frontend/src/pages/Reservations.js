import React, { useState } from 'react';
import api from '../api/apiClient'; // Import the real API client

// Reservations Component
const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    requests: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await api.submitReservation(formData);
      setMessage(response.message);
      setMessageType('success');
      setFormData({
        name: '', email: '', phone: '', date: '', time: '', guests: 1, requests: ''
      }); // Clear form
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 mt-16">
      <h2 className="text-5xl font-extrabold text-center text-text-primary mb-12">Book Your Table</h2>
      <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-custom border border-card">
        <p className="text-center text-text-secondary mb-8">
          Please fill out the form below to request a reservation. We will confirm your booking via email.
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-text-primary text-sm font-bold mb-2">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
          </div>
          <div>
            <label htmlFor="email" className="block text-text-primary text-sm font-bold mb-2">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-text-primary text-sm font-bold mb-2">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
          </div>
          <div>
            <label htmlFor="date" className="block text-text-primary text-sm font-bold mb-2">Date</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
          </div>
          <div>
            <label htmlFor="time" className="block text-text-primary text-sm font-bold mb-2">Time</label>
            <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
          </div>
          <div>
            <label htmlFor="guests" className="block text-text-primary text-sm font-bold mb-2">Number of Guests</label>
            <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} min="1" required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="requests" className="block text-text-primary text-sm font-bold mb-2">Special Requests (Optional)</label>
            <textarea id="requests" name="requests" value={formData.requests} onChange={handleChange} rows="4"
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight"></textarea>
          </div>
          <div className="md:col-span-2 text-center">
            <button type="submit" disabled={loading}
              className="btn-primary"> {/* Using the global btn-primary class */}
              {loading ? 'Submitting...' : 'Confirm Reservation'}
            </button>
          </div>
        </form>
        {message && (
          <div className={`mt-6 p-4 rounded-md text-center ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
