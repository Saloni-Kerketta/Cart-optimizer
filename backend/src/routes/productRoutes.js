const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');

// Route 1: GET http://localhost:5000/api/products
// Action: Returns every product in the database
router.get('/', getAllProducts);

// Route 2: GET http://localhost:5000/api/products/1001
// Action: Returns only product number 1001
router.get('/:id', getProductById);

module.exports = router;