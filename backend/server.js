const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Allows your React frontend to talk to this backend
require('dotenv').config(); // <-- NEW: Loads your .env file
const recommendationRoutes = require('./src/routes/recommendationRoutes');
const productRoutes = require('./src/routes/productRoutes'); 
const cartRoutes = require('./src/routes/cartRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection (Ask your teammate to verify this link/password)
// NEW: Securely pulls the link from your .env file
const databaseLink = process.env.MONGO_URI;

mongoose.connect(databaseLink)
    .then(() => console.log('Successfully connected to MongoDB Atlas!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Register Routes
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Smart Cart Backend is running on port ${PORT}`);
});