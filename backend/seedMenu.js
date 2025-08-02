const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/Menu');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

const sampleMenuItems = [
  // Appetizers
  {
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and mozzarella, served with truffle aioli',
    price: 18,
    category: 'appetizers',
    isAvailable: true
  },
  {
    name: 'Burrata Caprese',
    description: 'Fresh burrata with heirloom tomatoes, basil, and aged balsamic',
    price: 16,
    category: 'appetizers',
    isAvailable: true
  },
  {
    name: 'Lobster Bisque',
    description: 'Creamy lobster soup with cognac and crème fraîche',
    price: 22,
    category: 'appetizers',
    isAvailable: true
  },

  // Main Courses
  {
    name: 'Wagyu Beef Tenderloin',
    description: 'Grade A5 Japanese Wagyu with roasted garlic mashed potatoes and seasonal vegetables',
    price: 85,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    name: 'Pan-Seared Sea Bass',
    description: 'Mediterranean sea bass with saffron risotto and asparagus',
    price: 68,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    name: 'Duck Confit',
    description: 'Confit duck leg with cherry reduction and potato gratin',
    price: 72,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    name: 'Wild Mushroom Risotto',
    description: 'Carnaroli rice with wild mushrooms, parmesan, and truffle oil',
    price: 45,
    category: 'mainCourses',
    isAvailable: true
  },

  // Desserts
  {
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla bean ice cream',
    price: 18,
    category: 'desserts',
    isAvailable: true
  },
  {
    name: 'Crème Brûlée',
    description: 'Classic vanilla bean crème brûlée with fresh berries',
    price: 16,
    category: 'desserts',
    isAvailable: true
  },
  {
    name: 'Tiramisu',
    description: 'Traditional Italian tiramisu with espresso and mascarpone',
    price: 17,
    category: 'desserts',
    isAvailable: true
  },

  // Drinks
  {
    name: 'Signature Martini',
    description: 'Gin or vodka martini with premium spirits and olives',
    price: 22,
    category: 'drinks',
    isAvailable: true
  },
  {
    name: 'Wine Selection',
    description: 'Curated selection of fine wines from around the world',
    price: 15,
    category: 'drinks',
    isAvailable: true
  },
  {
    name: 'Craft Cocktails',
    description: 'House-made cocktails with premium spirits and fresh ingredients',
    price: 18,
    category: 'drinks',
    isAvailable: true
  }
];

const seedMenu = async () => {
  try {
    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert sample menu items
    const insertedItems = await MenuItem.insertMany(sampleMenuItems);
    console.log(`Successfully seeded ${insertedItems.length} menu items`);

    // Display the seeded items
    console.log('\nSeeded menu items:');
    insertedItems.forEach(item => {
      console.log(`- ${item.name} (${item.category}): $${item.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding menu:', error);
    process.exit(1);
  }
};

seedMenu(); 