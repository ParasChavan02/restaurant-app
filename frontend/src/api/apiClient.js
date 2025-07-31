// This file acts as a central point to import and re-export
// all API service functions, so other components can import
// them from a single 'api' object.

import {
  loginUser,
  registerUser,
  fetchMenus,
  submitReservation,
  fetchEvents,
  fetchReviews,
  submitReview,
  submitContactForm,
} from './apiService'; // Import from the new apiService.js

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
