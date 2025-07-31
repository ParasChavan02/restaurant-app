import React from 'react';

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-stone-900 text-gray-300 p-8 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-amber-500 mb-4">The Gilded Spoon</h3>
          <p className="text-sm">Experience the pinnacle of fine dining. Where culinary artistry meets unparalleled service.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-amber-500 mb-4">Contact Us</h3>
          <p className="text-sm">123 Culinary Lane, Gastronomy City, 10001</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <p className="text-sm">Email: info@gildedspoon.com</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-amber-500 mb-4">Hours</h3>
          <p className="text-sm">Dinner: Tue - Sun: 6:00 PM - 11:00 PM</p>
          <p className="text-sm">Lunch: Sat - Sun: 12:00 PM - 3:00 PM</p>
          <p className="text-sm">Closed on Mondays</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} The Gilded Spoon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
