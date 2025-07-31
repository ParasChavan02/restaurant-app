import React, { useState } from 'react';

// Navbar Component
const Navbar = ({ setCurrentPage, isLoggedIn, handleLogout, theme, toggleTheme, authUser }) => { // Receive authUser prop
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-navbar text-navbar py-4 shadow-lg fixed w-full z-50 transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-16"> {/* Adjusted horizontal padding */}
        <div className="text-2xl font-bold text-accent cursor-pointer transform hover:scale-105 transition-transform duration-300" onClick={() => setCurrentPage('home')}>
          The Gilded Spoon
        </div>
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-stone-700 hover:bg-stone-600 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.06l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.803 18.997a.75.75 0 001.06-1.06l-1.59-1.59a.75.75 0 10-1.06 1.06l1.59 1.59zM12 18.75a.75.75 0 01-.75.75v2.25a.75.75 0 011.5 0v-2.25a.75.75 0 01-.75-.75zM4.293 17.707a.75.75 0 001.06-1.06l-1.59-1.59a.75.75 0 00-1.06 1.06l1.59 1.59zM4.5 12a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM6.106 5.106a.75.75 0 00-1.06 1.06l1.59 1.59a.75.75 0 001.06-1.06l-1.59-1.59z"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.599 3.268a.75.75 0 01.353 1.09A12.748 12.748 0 009.25 12c0 2.895 1.187 5.503 3.109 7.343a.75.75 0 01-1.06 1.06A14.25 14.25 0 119.599 3.268z"></path>
              </svg>
            )}
          </button>

          {/* Display user name if logged in and authUser is available */}
          {isLoggedIn && authUser && (
            <span className="text-navbar text-sm md:text-base hidden md:inline-block font-medium">
              Welcome, {authUser.name}!
            </span>
          )}

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        <ul className={`md:flex md:space-x-8 absolute md:static bg-navbar md:bg-transparent w-full left-0 py-4 md:py-0 transition-all duration-300 ease-in-out ${isOpen ? 'top-full opacity-100' : '-top-full opacity-0 md:opacity-100'}`}>
          <li><button onClick={() => { setCurrentPage('home'); setIsOpen(false); }} className="block px-4 py-2 md:p-0 text-navbar hover:text-accent navbar-link-hover rounded-md">Home</button></li>
          <li><button onClick={() => { setCurrentPage('menu'); setIsOpen(false); }} className="block px-4 py-2 md:p-0 text-navbar hover:text-accent navbar-link-hover rounded-md">Menu</button></li>
          <li><button onClick={() => { setCurrentPage('reservations'); setIsOpen(false); }} className="block px-4 py-2 md:p-0 text-navbar hover:text-accent navbar-link-hover rounded-md">Reservations</button></li>
          <li><button onClick={() => { setCurrentPage('events'); setIsOpen(false); }} className="block px-4 py-2 md:p-0 text-navbar hover:text-accent navbar-link-hover rounded-md">Events</button></li>
          <li><button onClick={() => { setCurrentPage('reviews'); setIsOpen(false); }} className="block px-4 py-2 md:p-0 text-navbar hover:text-accent navbar-link-hover rounded-md">Reviews</button></li>
          <li><button onClick={() => { setCurrentPage('contact'); setIsOpen(false); }} className="block px-4 py-2 md:p-0 text-navbar hover:text-accent navbar-link-hover rounded-md">Contact</button></li>
          {isLoggedIn ? (
            <li><button onClick={() => { handleLogout(); setIsOpen(false); }} className="block px-4 py-2 md:p-0 text-navbar hover:text-accent navbar-link-hover rounded-md">Logout</button></li>
          ) : (
            <li><button onClick={() => { setCurrentPage('auth'); setIsOpen(false); }} className="block px-4 py-2 md:p-0 text-navbar hover:text-accent navbar-link-hover rounded-md">Login/Signup</button></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
