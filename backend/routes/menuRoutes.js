const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getMenuItems) // Publicly accessible
  .post(protect, admin, createMenuItem); // Only admin can create

router.route('/:id')
  .get(getMenuItemById) // Publicly accessible
  .put(protect, admin, updateMenuItem) // Only admin can update
  .delete(protect, admin, deleteMenuItem); // Only admin can delete

module.exports = router;
