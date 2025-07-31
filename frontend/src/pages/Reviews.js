import React, { useState, useEffect } from 'react';
import api from '../api/apiClient'; // Import the real API client

// Reviews Component
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({ author: '', rating: 0, comment: '' });
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageType, setSubmitMessageType] = useState(''); // 'success' or 'error'
  const [submitting, setSubmitting] = useState(false);

  // Get logged-in user's name for review submission
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setNewReview(prev => ({ ...prev, author: JSON.parse(user).name || '' }));
    }
  }, []);

  useEffect(() => {
    fetchAndSetReviews();
  }, []);

  const fetchAndSetReviews = () => {
    setLoading(true);
    api.fetchReviews()
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load reviews. Please try again later.');
        setLoading(false);
      });
  };

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');
    setSubmitMessageType('');

    // Check if user is logged in before submitting review
    const token = localStorage.getItem('token');
    if (!token) {
      setSubmitMessage('You must be logged in to submit a review.');
      setSubmitMessageType('error');
      setSubmitting(false);
      return;
    }

    try {
      const response = await api.submitReview(newReview);
      setSubmitMessage(response.message);
      setSubmitMessageType('success');
      setNewReview(prev => ({ ...prev, rating: 0, comment: '' })); // Clear rating and comment
      fetchAndSetReviews(); // Refresh reviews
    } catch (error) {
      setSubmitMessage(error.message);
      setSubmitMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex text-accent">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 star-rating-svg ${i < rating ? 'filled' : 'empty'}`} viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.817 1.48-8.279L.001 9.306l8.332-1.151L12 .587z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-20 mt-16">
      <h2 className="text-5xl font-extrabold text-center text-text-primary mb-12">What Our Guests Say</h2>

      {loading && <div className="text-center py-10 text-text-secondary">Loading reviews...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {!loading && reviews.length === 0 && <div className="md:col-span-3 text-center text-text-secondary">No reviews yet. Be the first to share your experience!</div>}
        {reviews.map(review => (
          <div key={review._id} className="card-modern p-6">
            <StarRating rating={review.rating} />
            <p className="text-text-primary italic my-3">"{review.comment}"</p>
            <p className="text-sm font-semibold text-text-secondary">- {review.author}</p>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto card-modern p-8">
        <h3 className="text-3xl font-bold text-center text-text-primary mb-6">Share Your Experience</h3>
        <form onSubmit={handleReviewSubmit}>
          <div className="mb-4">
            <label htmlFor="author" className="block text-text-primary text-sm font-bold mb-2">Your Name</label>
            <input type="text" id="author" name="author" value={newReview.author} onChange={handleReviewChange} required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight"
              disabled={true} // Author name is pre-filled from logged-in user
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-text-primary text-sm font-bold mb-2">Rating</label>
            <select id="rating" name="rating" value={newReview.rating} onChange={handleReviewChange} required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight">
              <option value="0">Select a rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="comment" className="block text-text-primary text-sm font-bold mb-2">Your Review</label>
            <textarea id="comment" name="comment" value={newReview.comment} onChange={handleReviewChange} rows="5" required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" disabled={submitting} className="btn-modern disabled:opacity-50 disabled:cursor-not-allowed">
              <span>{submitting ? 'Submitting...' : 'Submit Review'}</span>
            </button>
          </div>
        </form>
        {submitMessage && (
          <div className={`mt-6 p-4 rounded-md text-center ${submitMessageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
