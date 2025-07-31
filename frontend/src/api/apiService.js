// Define your backend API base URL
// IMPORTANT: Change this to your deployed backend URL when deploying to Render!
const API_BASE_URL = 'https://gilded-spoon-api.onrender.com/api';

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

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong with the API request.');
  }

  return response.json();
};

// --- User/Auth API Calls ---
export const loginUser = async (credentials) => {
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
};

export const registerUser = async (userData) => {
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
};

// --- Menu API Calls ---
export const fetchMenus = async () => {
  const data = await fetchWithAuth(`${API_BASE_URL}/menu`);
  // Ensure data is an array before reducing. If not, or empty, return empty object.
  if (!Array.isArray(data) || data.length === 0) {
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
  return groupedMenu;
};

// --- Reservation API Calls ---
export const submitReservation = async (reservationData) => {
  const data = await fetchWithAuth(`${API_BASE_URL}/reservations`, {
    method: 'POST',
    body: JSON.stringify(reservationData),
  });
  return { success: true, message: 'Reservation confirmed!', data };
};

// --- Event API Calls ---
export const fetchEvents = async () => {
  const data = await fetchWithAuth(`${API_BASE_URL}/events`);
  return data;
};

// --- Review API Calls ---
export const fetchReviews = async () => {
  const data = await fetchWithAuth(`${API_BASE_URL}/reviews`);
  return data;
};

export const submitReview = async (reviewData) => {
  const data = await fetchWithAuth(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
  return { success: true, message: 'Review submitted successfully!', data };
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
