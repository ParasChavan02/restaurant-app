import React, { useState, useEffect, useRef } from 'react';

// Navbar Component
const Navbar = ({ setCurrentPage, isLoggedIn, handleLogout, theme, toggleTheme, authUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  return (
    <nav className="bg-navbar text-navbar py-4 shadow-lg fixed w-full z-50 transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-16">
        {/* Logo/Brand */}
        <div className="text-xl md:text-2xl font-bold text-accent cursor-pointer transform hover:scale-105 transition-transform duration-300" onClick={() => setCurrentPage('home')}>
          The Gilded Spoon
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => setCurrentPage('home')} className="text-navbar hover:text-accent navbar-link-hover">Home</button>
          <button onClick={() => setCurrentPage('menu')} className="text-navbar hover:text-accent navbar-link-hover">Menu</button>
          <button onClick={() => setCurrentPage('reservations')} className="text-navbar hover:text-accent navbar-link-hover">Reservations</button>
          <button onClick={() => setCurrentPage('events')} className="text-navbar hover:text-accent navbar-link-hover">Events</button>
          <button onClick={() => setCurrentPage('reviews')} className="text-navbar hover:text-accent navbar-link-hover">Reviews</button>
          <button onClick={() => setCurrentPage('contact')} className="text-navbar hover:text-accent navbar-link-hover">Contact</button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-navbar hover:text-accent navbar-link-hover">Logout</button>
          ) : (
            <button onClick={() => setCurrentPage('auth')} className="text-navbar hover:text-accent navbar-link-hover">Login/Signup</button>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Theme Toggle Button - Always visible */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-stone-700 hover:bg-stone-600 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 z-10"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.06l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.803 18.997a.75.75 0 001.06-1.06l-1.59-1.59a.75.75 0 10-1.06 1.06l1.59 1.59zM12 18.75a.75.75 0 01-.75.75v2.25a.75.75 0 011.5 0v-2.25a.75.75 0 01-.75-.75zM4.293 17.707a.75.75 0 001.06-1.06l-1.59-1.59a.75.75 0 00-1.06 1.06l1.59 1.59zM4.5 12a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM6.106 5.106a.75.75 0 00-1.06 1.06l1.59 1.59a.75.75 0 001.06-1.06l-1.59-1.59z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.599 3.268a.75.75 0 01.353 1.09A12.748 12.748 0 009.25 12c0 2.895 1.187 5.503 3.109 7.343a.75.75 0 01-1.06 1.06A14.25 14.25 0 119.599 3.268z"></path>
              </svg>
            )}
          </button>

          {/* Display user name if logged in and authUser is available */}
          {isLoggedIn && authUser && (
            <span className="text-navbar text-sm md:text-base hidden lg:inline-block font-medium">
              Welcome, {authUser.name}!
            </span>
          )}

          {/* Hamburger menu icon for mobile */}
          <div className="md:hidden">
            <button 
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white focus:outline-none p-1 rounded-md hover:bg-stone-700 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - improved positioning and styling */}
      <div 
        ref={menuRef}
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 w-full bg-navbar shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="container mx-auto px-4 py-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => { setCurrentPage('home'); setIsOpen(false); }} 
                className="block w-full text-left px-4 py-3 text-navbar hover:text-accent hover:bg-stone-700 rounded-md transition-all duration-200"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('menu'); setIsOpen(false); }} 
                className="block w-full text-left px-4 py-3 text-navbar hover:text-accent hover:bg-stone-700 rounded-md transition-all duration-200"
              >
                Menu
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('reservations'); setIsOpen(false); }} 
                className="block w-full text-left px-4 py-3 text-navbar hover:text-accent hover:bg-stone-700 rounded-md transition-all duration-200"
              >
                Reservations
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('events'); setIsOpen(false); }} 
                className="block w-full text-left px-4 py-3 text-navbar hover:text-accent hover:bg-stone-700 rounded-md transition-all duration-200"
              >
                Events
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('reviews'); setIsOpen(false); }} 
                className="block w-full text-left px-4 py-3 text-navbar hover:text-accent hover:bg-stone-700 rounded-md transition-all duration-200"
              >
                Reviews
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('contact'); setIsOpen(false); }} 
                className="block w-full text-left px-4 py-3 text-navbar hover:text-accent hover:bg-stone-700 rounded-md transition-all duration-200"
              >
                Contact
              </button>
            </li>
            {isLoggedIn ? (
              <li>
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }} 
                  className="block w-full text-left px-4 py-3 text-navbar hover:text-accent hover:bg-stone-700 rounded-md transition-all duration-200"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button 
                  onClick={() => { setCurrentPage('auth'); setIsOpen(false); }} 
                  className="block w-full text-left px-4 py-3 text-navbar hover:text-accent hover:bg-stone-700 rounded-md transition-all duration-200"
                >
                  Login/Signup
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
