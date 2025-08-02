const asyncHandler = require('express-async-handler');
const MenuItem = require('../models/Menu');

// Fallback menu data when database is not available
const fallbackMenuItems = [
  {
    _id: '1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and mozzarella, served with truffle aioli',
    price: 18,
    category: 'appetizers',
    isAvailable: true
  },
  {
    _id: '2',
    name: 'Burrata Caprese',
    description: 'Fresh burrata with heirloom tomatoes, basil, and aged balsamic',
    price: 16,
    category: 'appetizers',
    isAvailable: true
  },
  {
    _id: '3',
    name: 'Wagyu Beef Tenderloin',
    description: 'Grade A5 Japanese Wagyu with roasted garlic mashed potatoes and seasonal vegetables',
    price: 85,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    _id: '4',
    name: 'Pan-Seared Sea Bass',
    description: 'Mediterranean sea bass with saffron risotto and asparagus',
    price: 68,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    _id: '5',
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla bean ice cream',
    price: 18,
    category: 'desserts',
    isAvailable: true
  },
  {
    _id: '6',
    name: 'Signature Martini',
    description: 'Gin or vodka martini with premium spirits and olives',
    price: 22,
    category: 'drinks',
    isAvailable: true
  }
];

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
const getMenuItems = asyncHandler(async (req, res) => {
  try {
    // Try to get menu items from database
    const menuItems = await MenuItem.find({});
    
    if (menuItems && menuItems.length > 0) {
      res.json(menuItems);
    } else {
      // If no items in database, return fallback data
      console.log('No menu items found in database, using fallback data');
      res.json(fallbackMenuItems);
    }
  } catch (error) {
    console.error('Database error, using fallback menu data:', error.message);
    // Return fallback data if database is not available
    res.json(fallbackMenuItems);
  }
});

// @desc    Get menu item by ID
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = asyncHandler(async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (menuItem) {
      res.json(menuItem);
    } else {
      // Check fallback data
      const fallbackItem = fallbackMenuItems.find(item => item._id === req.params.id);
      if (fallbackItem) {
        res.json(fallbackItem);
      } else {
        res.status(404);
        throw new Error('Menu item not found');
      }
    }
  } catch (error) {
    res.status(404);
    throw new Error('Menu item not found');
  }
});

// @desc    Create a new menu item
// @route   POST /api/menu
// @access  Private/Admin
const createMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, category, isAvailable } = req.body;

  const menuItem = new MenuItem({
    name,
    description,
    price,
    category,
    isAvailable: isAvailable || true,
  });

  const createdMenuItem = await menuItem.save();
  res.status(201).json(createdMenuItem);
});

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, category, isAvailable } = req.body;

  const menuItem = await MenuItem.findById(req.params.id);

  if (menuItem) {
    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price || menuItem.price;
    menuItem.category = category || menuItem.category;
    menuItem.isAvailable = isAvailable !== undefined ? isAvailable : menuItem.isAvailable;

    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } else {
    res.status(404);
    throw new Error('Menu item not found');
  }
});

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (menuItem) {
    await menuItem.deleteOne(); // Changed from remove() to deleteOne() for Mongoose 6+
    res.json({ message: 'Menu item removed' });
  } else {
    res.status(404);
    throw new Error('Menu item not found');
  }
});

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
