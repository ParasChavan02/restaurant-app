const express = require('express');
const router = express.Router();
const {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation,
} = require('../controllers/reservationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(createReservation) // Anyone can create a reservation
  .get(protect, admin, getReservations); // Only admin can get all reservations

router.route('/:id')
  .get(protect, getReservationById) // User can get their own, admin can get any
  .delete(protect, admin, deleteReservation); // Only admin can delete

router.route('/:id/status')
  .put(protect, admin, updateReservationStatus); // Only admin can update status

module.exports = router;
