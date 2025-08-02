const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Test menu route
app.get('/api/menu', (req, res) => {
  const testMenu = [
    {
      _id: '1',
      name: 'Test Menu Item',
      description: 'This is a test menu item',
      price: 25,
      category: 'test',
      isAvailable: true
    }
  ];
  res.json(testMenu);
});

// Test reviews route
app.get('/api/reviews', (req, res) => {
  const testReviews = [
    {
      _id: '1',
      author: 'Test User',
      rating: 5,
      comment: 'This is a test review',
      createdAt: new Date()
    }
  ];
  res.json(testReviews);
});

// Test events route
app.get('/api/events', (req, res) => {
  const testEvents = [
    {
      _id: '1',
      title: 'Test Event',
      description: 'This is a test event',
      date: '2024-12-25',
      time: '19:00',
      capacity: 20,
      price: 50,
      isActive: true
    }
  ];
  res.json(testEvents);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Test the API at: http://localhost:${PORT}/api/menu`);
}); 