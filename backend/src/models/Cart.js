const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Example: "user123"
    items: [{
        productId: { type: Number, required: true }, // Your custom IDs, like 1001
        quantity: { type: Number, default: 1 }
    }]
});

module.exports = mongoose.model('Cart', cartSchema);