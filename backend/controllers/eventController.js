const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');

// Fallback event data when database is not available
const fallbackEvents = [
  {
    _id: '1',
    title: 'Wine Tasting Evening',
    description: 'Join us for an exclusive wine tasting experience featuring premium wines from around the world. Expert sommeliers will guide you through each selection.',
    date: '2024-12-20',
    time: '19:00',
    capacity: 30,
    price: 75,
    isActive: true
  },
  {
    _id: '2',
    title: 'Chef\'s Table Experience',
    description: 'An intimate dining experience at our chef\'s table. Watch our executive chef prepare your meal while enjoying a curated tasting menu.',
    date: '2024-12-25',
    time: '18:30',
    capacity: 8,
    price: 150,
    isActive: true
  },
  {
    _id: '3',
    title: 'New Year\'s Eve Gala',
    description: 'Ring in the new year with our spectacular gala dinner. Live music, champagne toast, and a special 5-course menu.',
    date: '2024-12-31',
    time: '20:00',
    capacity: 50,
    price: 200,
    isActive: true
  }
];

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  try {
    // Try to get events from database
    const events = await Event.find({}).sort({ date: 1 });
    
    if (events && events.length > 0) {
      res.json(events);
    } else {
      // If no events in database, return fallback data
      console.log('No events found in database, using fallback data');
      res.json(fallbackEvents);
    }
  } catch (error) {
    console.error('Database error, using fallback event data:', error.message);
    // Return fallback data if database is not available
    res.json(fallbackEvents);
  }
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      res.json(event);
    } else {
      // Check fallback data
      const fallbackEvent = fallbackEvents.find(event => event._id === req.params.id);
      if (fallbackEvent) {
        res.json(fallbackEvent);
      } else {
        res.status(404);
        throw new Error('Event not found');
      }
    }
  } catch (error) {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, time, capacity, price, isActive } = req.body;

  const event = new Event({
    title,
    description,
    date,
    time,
    capacity,
    price,
    isActive: isActive || true,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, date, time, capacity, price, isActive } = req.body;

  const event = await Event.findById(req.params.id);

  if (event) {
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.capacity = capacity || event.capacity;
    event.price = price || event.price;
    event.isActive = isActive !== undefined ? isActive : event.isActive;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await event.deleteOne();
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
