const asyncHandler = require('express-async-handler');
const Reservation = require('../models/Reservation');

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Public (or Private if only logged-in users can reserve)
const createReservation = asyncHandler(async (req, res) => {
  const { name, email, phone, date, time, guests, requests } = req.body;

  if (!name || !email || !phone || !date || !time || !guests) {
    res.status(400);
    throw new Error('Please fill all required reservation fields');
  }

  const reservation = new Reservation({
    user: req.user ? req.user._id : null, // Link to user if logged in
    name,
    email,
    phone,
    date,
    time,
    guests,
    requests,
  });

  const createdReservation = await reservation.save();
  res.status(201).json(createdReservation);
});

// @desc    Get all reservations (Admin only)
// @route   GET /api/reservations
// @access  Private/Admin
const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({}).populate('user', 'name email'); // Populate user details if linked
  res.json(reservations);
});

// @desc    Get single reservation by ID (Admin or User if linked)
// @route   GET /api/reservations/:id
// @access  Private
const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (reservation) {
    // Optional: Add logic to ensure user can only view their own reservations unless admin
    if (req.user.isAdmin || (reservation.user && reservation.user.equals(req.user._id))) {
      res.json(reservation);
    } else {
      res.status(403);
      throw new Error('Not authorized to view this reservation');
    }
  } else {
    res.status(404);
    throw new Error('Reservation not found');
  }
});

// @desc    Update reservation status (Admin only)
// @route   PUT /api/reservations/:id/status
// @access  Private/Admin
const updateReservationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const reservation = await Reservation.findById(req.params.id);

  if (reservation) {
    reservation.status = status || reservation.status;
    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } else {
    res.status(404);
    throw new Error('Reservation not found');
  }
});

// @desc    Delete a reservation (Admin only)
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (reservation) {
    await reservation.deleteOne();
    res.json({ message: 'Reservation removed' });
  } else {
    res.status(404);
    throw new Error('Reservation not found');
  }
});

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation,
};
