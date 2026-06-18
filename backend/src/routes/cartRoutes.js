const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add an item to the cart
router.post('/add', cartController.addToCart);

// View the entire cart (Notice we pass the cartId in the URL)
router.get('/:cartId', cartController.getCart);

// Delete a specific item from the cart
router.delete('/remove/:id', cartController.removeFromCart);

module.exports = router;