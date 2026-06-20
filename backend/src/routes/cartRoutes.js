const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware'); // <-- NEW: Import the "Bouncer"

// Add an item to the cart (Protected: Must be logged in)
router.post('/add', protect, cartController.addToCart);

// View the entire cart (Protected: Must be logged in)
router.get('/:cartId', protect, cartController.getCart);

// Delete a specific item from the cart (Protected: Must be logged in)
router.delete('/remove/:id', protect, cartController.removeFromCart);

module.exports = router;