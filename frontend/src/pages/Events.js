import React, { useState, useEffect } from 'react';
import api from '../api/apiClient'; // Import the real API client

// Events Component
const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.fetchEvents()
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load events. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-text-secondary">Loading events...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (events.length === 0) return <div className="text-center py-20 text-text-secondary">No upcoming events.</div>;

  return (
    <div className="container mx-auto px-4 py-20 mt-16">
      <h2 className="text-5xl font-extrabold text-center text-text-primary mb-12">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <div key={event._id} className="card-modern p-6">
            <h3 className="text-2xl font-semibold text-text-primary mb-2">{event.title}</h3>
            {/* Format date for better display */}
            <p className="text-accent text-sm mb-2 font-medium">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} &bull; {event.time}</p>
            <p className="text-text-secondary text-base">{event.description}</p>
            {/* Optional: Add a "Learn More" button if there's a detailed event page */}
            {/* <button className="mt-4 bg-stone-700 hover:bg-stone-800 text-white py-2 px-4 rounded-md text-sm transition-colors duration-200">Learn More</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
