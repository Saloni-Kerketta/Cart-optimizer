const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config(); 
const productRoutes = require('./src/routes/productRoutes');
console.log(require.resolve('./src/routes/userRoutes'));

// 1. Initialize Express
const app = express();

// 2. Middleware (MUST be before routes)
app.use(express.json());
app.use(cors());

// --- DIAGNOSTIC TEST ROUTES ---
// We will use this to prove the server is updating
app.get('/api/test', (req, res) => {
    res.json({ message: "SUCCESS! The server is updating and reading routes!" });
});
// ------------------------------

app.get('/api/test', (req, res) => {
    console.log("API TEST HIT");
    res.json({
        message: "SUCCESS!"
    });
});

// 3. Import Routes
const recommendationRoutes = require('./src/routes/recommendationRoutes');

// const userRoutes = require('./src/routes/userRoutes');
const userRoutes = require('./src/routes/userRoutes');


// console.log("userRoutes =", userRoutes);   .............YE BS EK TEST KE LIYE THA
// console.log("type =", typeof userRoutes);




const cartRoutes = require('./src/routes/cartRoutes');

// 4. Connect Routes
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes); 
app.use('/api/products', productRoutes); // product routes added here 

// 5. MongoDB Connection (With safety check)
const databaseLink = process.env.MONGO_URI;

if (!databaseLink) {
    console.error("⚠️ WARNING: MONGO_URI is missing from your .env file!");
} else {
    mongoose.connect(databaseLink)
        .then(() => console.log('Successfully connected to MongoDB Atlas!'))
        .catch((err) => console.error('MongoDB connection error:', err));
}

// 6. Start Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Smart Cart Backend is running on port ${PORT}`); 
});