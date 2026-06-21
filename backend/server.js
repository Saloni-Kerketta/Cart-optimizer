const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const recommendationRoutes = require('./src/routes/recommendationRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get('/api/test', (req, res) => {
    res.json({
        message: "SUCCESS! The server is running."
    });
});

// API Routes
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
const databaseLink = process.env.MONGO_URI;

if (!databaseLink) {
    console.error("⚠️ WARNING: MONGO_URI is missing from .env file!");
} else {
    mongoose.connect(databaseLink)
        .then(() => console.log('Successfully connected to MongoDB Atlas!'))
        .catch((err) => console.error('MongoDB connection error:', err));
}

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Smart Cart Backend is running on port ${PORT}`);
});