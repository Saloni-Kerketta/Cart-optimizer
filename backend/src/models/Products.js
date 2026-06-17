const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Accepts the CSV's string ID
  productName: { type: String },
  category: { type: String },
  price: { type: Number },
  rating: { type: Number },
  popularity: { type: String } 
});

module.exports = mongoose.model('Product', productSchema);