import React from 'react';

// Home Component
const Home = ({ setCurrentPage }) => {
  return (
    <div className="relative h-screen flex items-center justify-center text-primary overflow-hidden">
      {/* Background Image with Overlay */}
      {/* Using a placeholder image for now. You can replace this with your actual image from assets/images */}
      <div className="absolute inset-0 bg-cover bg-center animate-zoom-in" style={{ backgroundImage: "url('https://placehold.co/1920x1080/4A4A4A/FFFFFF?text=Fine+Dining+Restaurant')" }}>
        <div className="absolute inset-0 bg-overlay transition-colors duration-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center p-6 bg-hero-content rounded-xl shadow-2xl max-w-2xl mx-auto transform translate-y-0 opacity-100 transition-all duration-700 ease-out animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-accent tracking-wide leading-tight drop-shadow-lg">
          The Gilded Spoon
        </h1>
        <p className="text-lg md:text-xl mb-8 font-light text-gray-200">
          Where every dish is a masterpiece, and every moment, an experience.
          Savor the art of fine dining.
        </p>
        <button
          onClick={() => setCurrentPage('reservations')}
          className="btn-primary" /* Using the global btn-primary class */
        >
          Make a Reservation
        </button>
      </div>
    </div>
  );
};

export default Home;
