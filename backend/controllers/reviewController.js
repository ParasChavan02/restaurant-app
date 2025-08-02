const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');

// Fallback review data when database is not available
const fallbackReviews = [
  {
    _id: '1',
    author: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely incredible dining experience! The Wagyu beef was perfectly cooked and the service was impeccable. Highly recommend!',
    createdAt: new Date('2024-12-15')
  },
  {
    _id: '2',
    author: 'Michael Chen',
    rating: 5,
    comment: 'The ambiance is elegant and the food is outstanding. The truffle arancini was a revelation. Will definitely return!',
    createdAt: new Date('2024-12-10')
  },
  {
    _id: '3',
    author: 'Emily Rodriguez',
    rating: 4,
    comment: 'Beautiful restaurant with amazing food. The sea bass was perfectly seasoned and the wine pairing was excellent.',
    createdAt: new Date('2024-12-08')
  }
];

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  try {
    // Try to get reviews from database
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    
    if (reviews && reviews.length > 0) {
      res.json(reviews);
    } else {
      // If no reviews in database, return fallback data
      console.log('No reviews found in database, using fallback data');
      res.json(fallbackReviews);
    }
  } catch (error) {
    console.error('Database error, using fallback review data:', error.message);
    // Return fallback data if database is not available
    res.json(fallbackReviews);
  }
});

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { author, rating, comment } = req.body;

  const review = new Review({
    author,
    rating,
    comment,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
});

module.exports = {
  getReviews,
  createReview,
};
