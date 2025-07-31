const express = require('express');
const router = express.Router();
const { getReviews, createReview, deleteReview } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getReviews) // Publicly accessible
  .post(protect, createReview); // Only logged-in users can create

router.route('/:id')
  .delete(protect, deleteReview); // Only owner or admin can delete

module.exports = router;
