const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  popularity: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' } // Custom field to track popularity scores for ranking
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);