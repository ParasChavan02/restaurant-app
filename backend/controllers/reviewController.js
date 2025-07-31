const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({}).populate('user', 'name email'); // Populate user info
  res.json(reviews);
});

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private (only logged-in users can post reviews)
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    res.status(400);
    throw new Error('Please add a rating and comment');
  }

  const review = new Review({
    user: req.user._id, // User ID from protected middleware
    author: req.user.name, // Use user's name from protected middleware
    rating,
    comment,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
});

// @desc    Delete a review (Admin or Review Owner)
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (review) {
    // Check if user is admin or the owner of the review
    if (req.user.isAdmin || review.user.equals(req.user._id)) {
      await review.deleteOne();
      res.json({ message: 'Review removed' });
    } else {
      res.status(403); // Forbidden
      throw new Error('Not authorized to delete this review');
    }
  } else {
    res.status(404);
    throw new Error('Review not found');
  }
});

module.exports = {
  getReviews,
  createReview,
  deleteReview,
};
