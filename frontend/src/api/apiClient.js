// This file acts as a central point to import and re-export
// all API service functions, so other components can import
// them from a single 'api' object.

// Import from mock API service instead of real API
import {
  loginUser,
  registerUser,
  fetchMenus,
  submitReservation,
  fetchEvents,
  fetchReviews,
  submitReview,
  submitContactForm,
} from './mockApiService'; // Import from mock API service

const api = {
  loginUser,
  registerUser,
  fetchMenus,
  submitReservation,
  fetchEvents,
  fetchReviews,
  submitReview,
  submitContactForm,
};

export default api;
