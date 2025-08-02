const asyncHandler = require('express-async-handler');
const Reservation = require('../models/Reservation');

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Public
const createReservation = asyncHandler(async (req, res) => {
  const { name, email, phone, date, time, guests, requests } = req.body;

  try {
    const reservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      requests: requests || '',
    });

    const createdReservation = await reservation.save();
    res.status(201).json({
      success: true,
      message: 'Reservation confirmed! We will contact you shortly to confirm your booking.',
      data: createdReservation
    });
  } catch (error) {
    console.error('Reservation creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create reservation. Please try again later.'
    });
  }
});

// @desc    Get all reservations (Admin only)
// @route   GET /api/reservations
// @access  Private/Admin
const getReservations = asyncHandler(async (req, res) => {
  try {
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reservations.'
    });
  }
});

// @desc    Get reservation by ID
// @route   GET /api/reservations/:id
// @access  Private/Admin
const getReservationById = asyncHandler(async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404);
      throw new Error('Reservation not found');
    }
  } catch (error) {
    res.status(404);
    throw new Error('Reservation not found');
  }
});

// @desc    Update a reservation
// @route   PUT /api/reservations/:id
// @access  Private/Admin
const updateReservation = asyncHandler(async (req, res) => {
  const { name, email, phone, date, time, guests, requests, status } = req.body;

  try {
    const reservation = await Reservation.findById(req.params.id);

    if (reservation) {
      reservation.name = name || reservation.name;
      reservation.email = email || reservation.email;
      reservation.phone = phone || reservation.phone;
      reservation.date = date || reservation.date;
      reservation.time = time || reservation.time;
      reservation.guests = guests || reservation.guests;
      reservation.requests = requests || reservation.requests;
      reservation.status = status || reservation.status;

      const updatedReservation = await reservation.save();
      res.json(updatedReservation);
    } else {
      res.status(404);
      throw new Error('Reservation not found');
    }
  } catch (error) {
    res.status(404);
    throw new Error('Reservation not found');
  }
});

// @desc    Delete a reservation
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
const deleteReservation = asyncHandler(async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (reservation) {
      await reservation.deleteOne();
      res.json({ message: 'Reservation removed' });
    } else {
      res.status(404);
      throw new Error('Reservation not found');
    }
  } catch (error) {
    res.status(404);
    throw new Error('Reservation not found');
  }
});

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
