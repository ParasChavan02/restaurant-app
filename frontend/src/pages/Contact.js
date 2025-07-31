import React, { useState } from 'react';
import api from '../api/apiClient'; // Import the real API client

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
      // Use the actual API call for contact form if you set up a backend endpoint for it
      // For now, it's still using the simulated one in apiService.js
      const response = await api.submitContactForm(formData);
      setMessage(response.message);
      setMessageType('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      setMessage(error.message || 'Failed to send message. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 mt-16">
      <h2 className="text-5xl font-extrabold text-center text-text-primary mb-12">Get in Touch</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="card-modern p-8">
          <h3 className="text-3xl font-bold text-text-primary mb-6">Send Us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="contact-name" className="block text-text-primary text-sm font-bold mb-2">Your Name</label>
              <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} required
                className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
            </div>
            <div className="mb-4">
              <label htmlFor="contact-email" className="block text-text-primary text-sm font-bold mb-2">Your Email</label>
              <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} required
                className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
            </div>
            <div className="mb-4">
              <label htmlFor="contact-subject" className="block text-text-primary text-sm font-bold mb-2">Subject</label>
              <input type="text" id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} required
                className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
            </div>
            <div className="mb-6">
              <label htmlFor="contact-message" className="block text-text-primary text-sm font-bold mb-2">Message</label>
              <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} rows="6" required
                className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" disabled={loading} className="btn-modern disabled:opacity-50 disabled:cursor-not-allowed">
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
          {message && (
            <div className={`mt-6 p-4 rounded-md text-center ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="card-modern p-8">
          <h3 className="text-3xl font-bold text-text-primary mb-6">Our Details</h3>
          <div className="space-y-4 text-text-secondary">
            <p className="flex items-center">
              <svg className="w-6 h-6 text-accent mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"></path></svg>
              123 Culinary Lane, Gastronomy City, 10001
            </p>
            <p className="flex items-center">
              <svg className="w-6 h-6 text-accent mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C12.95 21 3 11.05 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z"></path></svg>
              +91 98765 43210
            </p>
            <p className="flex items-center">
              <svg className="w-6 h-6 text-accent mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
              info@gildedspoon.com
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Find Us</h3>
            {/* Placeholder for Google Map */}
            <div className="bg-primary h-64 w-full rounded-md flex items-center justify-center text-text-placeholder">
              Map Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
