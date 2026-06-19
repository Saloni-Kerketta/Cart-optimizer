const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartId: { type: String, required: true }, // A unique ID for the user's current shopping session
    productId: { type: String, ref: 'Product', required: true }, // Links to the Kaggle product ID
    quantity: { type: Number, default: 1 } // Defaults to 1 when first added
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);