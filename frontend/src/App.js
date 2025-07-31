import React, { useState, useEffect } from 'react';

// Import components from their new paths
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Events from './pages/Events';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Auth from './pages/Auth';

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null); // To store user data if logged in
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Effect to apply theme data attribute to body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    // Check for existing token/user on app load
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      setAuthUser(JSON.parse(user)); // 'authUser' is assigned here
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthUser(null); // Clear authUser on logout
    localStorage.removeItem('token'); // Clear token on logout
    localStorage.removeItem('user'); // Clear user info on logout
    setCurrentPage('home'); // Redirect to home after logout
  };

  const renderPage = () => {
    return (
      <div className="fade-in"> {/* Apply fade-in animation to page content */}
        {(() => {
          switch (currentPage) {
            case 'home':
              return <Home setCurrentPage={setCurrentPage} />;
            case 'menu':
              return <Menu />;
            case 'reservations':
              return <Reservations />;
            case 'events':
              return <Events />;
            case 'reviews':
              return <Reviews />;
            case 'contact':
              return <Contact />;
            case 'auth':
              return <Auth setIsLoggedIn={setIsLoggedIn} setAuthUser={setAuthUser} />;
            default:
              return <Home setCurrentPage={setCurrentPage} />;
          }
        })()}
      </div>
    );
  };

  return (
    // Apply theme-dependent classes to the main container
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500">
      <Navbar
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        authUser={authUser} // <--- authUser is now passed as a prop
      />
      <main className="main-content-area"> {/* Applied main-content-area for consistent padding */}
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
