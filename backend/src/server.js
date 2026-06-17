// 1. Import dependencies
const express = require('express');
require('dotenv').config(); // Loads your .env variables

// 2. Initialize the Express app (Fixes Error 1)
const app = express();

// 3. Middleware to parse JSON body data
app.use(express.json());

// 4. Import Routes (Fixes Error 2 - No 'src/' needed because server.js is already in src)
const cartRoutes = require('./routes/cartRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

// 5. Connect the routes to URLs
app.use('/api/cart', cartRoutes);
app.use('/api/recommendations', recommendationRoutes);

// 6. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running perfectly on port ${PORT}`);
});