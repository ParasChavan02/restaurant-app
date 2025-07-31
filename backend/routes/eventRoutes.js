const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getEvents) // Publicly accessible
  .post(protect, admin, createEvent); // Only admin can create

router.route('/:id')
  .get(getEventById) // Publicly accessible
  .put(protect, admin, updateEvent) // Only admin can update
  .delete(protect, admin, deleteEvent); // Only admin can delete

module.exports = router;
