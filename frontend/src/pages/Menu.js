import React, { useState, useEffect } from 'react';
import api from '../api/apiClient'; // Import the real API client

// Menu Component
const Menu = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.fetchMenus()
      .then(data => {
        // Backend returns an array, apiService groups it into categories
        setMenu(data); // data will now be an object like { appetizers: [...], mainCourses: [...] }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load menu. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-text-secondary">Loading menu...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  // Check if menu is null or an empty object before trying to map
  if (!menu || Object.keys(menu).length === 0) {
    return <div className="text-center py-20 text-text-secondary">No menu items available.</div>;
  }

  const MenuItem = ({ item }) => (
    // Applying bg-gradient-card, shadow-custom, card-hover-effect, and hover transformations
    <div className="bg-gradient-card p-6 rounded-lg shadow-custom border border-card transform hover:scale-105 hover:shadow-custom-lg transition-all duration-300 ease-in-out card-hover-effect">
      <h3 className="text-xl font-semibold text-text-primary mb-2">{item.name}</h3>
      <p className="text-text-secondary text-sm mb-3">{item.description}</p>
      <p className="text-lg font-bold text-accent">₹{item.price}</p> {/* Ensure price is formatted */}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-20 mt-16">
      <h2 className="text-5xl font-extrabold text-center text-text-primary mb-12">Our Culinary Creations</h2>

      {/* Render categories dynamically */}
      {Object.entries(menu).map(([category, items]) => (
        <section key={category} className="mb-12">
          <h3 className="text-4xl font-bold text-text-secondary mb-8 capitalize border-b-2 border-accent pb-2 inline-block">
            {category.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => <MenuItem key={item._id} item={item} />)} {/* Use _id from MongoDB for key */}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Menu;
