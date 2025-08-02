// Define your backend API base URL
// For development, use localhost. For production, use the deployed URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://gilded-spoon-api.onrender.com/api'
  : 'http://localhost:5000/api';

// Helper function for making authenticated requests
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token'); // Get token from local storage

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Something went wrong with the API request.');
    }

    return response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// --- User/Auth API Calls ---
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed.');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token); // Store token
    localStorage.setItem('user', JSON.stringify(data.user)); // Store user info
    return { success: true, message: 'Login successful!', user: data };
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed.');
    }
    const data = await response.json();
    return { success: true, message: 'Registration successful! Please log in.', user: data };
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};

// --- Menu API Calls ---
export const fetchMenus = async () => {
  try {
    console.log('Fetching menu from:', `${API_BASE_URL}/menu`);
    const data = await fetchWithAuth(`${API_BASE_URL}/menu`);
    
    // Ensure data is an array before reducing. If not, or empty, return empty object.
    if (!Array.isArray(data) || data.length === 0) {
      console.log('No menu items received, returning empty object');
      return {}; // Return an empty object if no menu items or data is not an array
    }

    const groupedMenu = data.reduce((acc, item) => {
      // Ensure item.category exists before calling replace
      const categoryKey = item.category ? item.category.replace(/\s+/g, '').toLowerCase() : 'uncategorized';
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push(item);
      return acc;
    }, {});
    
    console.log('Menu data processed successfully:', groupedMenu);
    return groupedMenu;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw new Error('Failed to fetch menu data. Please try again later.');
  }
};

// --- Reservation API Calls ---
export const submitReservation = async (reservationData) => {
  try {
    const data = await fetchWithAuth(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      body: JSON.stringify(reservationData),
    });
    return { success: true, message: 'Reservation confirmed!', data };
  } catch (error) {
    console.error('Reservation Error:', error);
    throw error;
  }
};

// --- Event API Calls ---
export const fetchEvents = async () => {
  try {
    const data = await fetchWithAuth(`${API_BASE_URL}/events`);
    return data;
  } catch (error) {
    console.error('Events Error:', error);
    throw error;
  }
};

// --- Review API Calls ---
export const fetchReviews = async () => {
  try {
    const data = await fetchWithAuth(`${API_BASE_URL}/reviews`);
    return data;
  } catch (error) {
    console.error('Reviews Error:', error);
    throw error;
  }
};

export const submitReview = async (reviewData) => {
  try {
    const data = await fetchWithAuth(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
    return { success: true, message: 'Review submitted successfully!', data };
  } catch (error) {
    console.error('Review Submission Error:', error);
    throw error;
  }
};

// --- Contact Form (Frontend only simulation, or you'd add a backend endpoint) ---
export const submitContactForm = async (formData) => {
  // In a real app, this would be a POST request to your backend's contact endpoint
  // For now, it's a client-side simulation.
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      resolve({ success: true, message: 'Your message has been sent successfully!' });
    }, 1000);
  });
};
