// 1. Bring in dotenv to read your .env file
require('dotenv').config(); 
const mongoose = require('mongoose');

// 2. Safely grab the URI straight from your .env file!
const MONGO_URI = process.env.MONGO_URI;

const Product = mongoose.model('Product', new mongoose.Schema({
  ProductName: String,
  imageUrl: String
}, { strict: false })); 

const fixDatabaseImages = async () => {
  try {
    // A quick check to make sure it actually found the .env variable
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing! Make sure your .env file is in this folder.");
    }

    console.log("⏳ Connecting to MongoDB securely...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected successfully!");

    console.log("⏳ Fetching all products...");
    const products = await Product.find({});
    console.log(`📦 Found ${products.length} products. Starting massive update...`);

    let count = 0;

    for (let product of products) {
      const encodedName = encodeURIComponent(product.ProductName || 'Store Item');
      const newImageUrl = `https://placehold.co/600x400/e2e8f0/1e293b?text=${encodedName}`;

      await Product.updateOne(
        { _id: product._id }, 
        { $set: { imageUrl: newImageUrl } }
      );
      
      count++;
      if (count % 100 === 0) console.log(`...Updated ${count} products...`);
    }

    console.log(`🎉 SUCCESS! All ${products.length} images have been fixed in the database.`);
    process.exit(0);

  } catch (error) {
    console.error("❌ ERROR:", error.message);
    process.exit(1);
  }
};

fixDatabaseImages();