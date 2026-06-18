const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
// Route to Add item
router.post('/add', addToCart);
// Route to Remove item
router.post('/remove', removeFromCart);
// Route to View cart (Notice the :userId parameter in the URL)
router.get('/:userId', getCart);
module.exports = router;