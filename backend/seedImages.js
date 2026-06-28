// backend/seedImages.js

// 1. Bulletproof dotenv load (always finds .env no matter where the terminal is)
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// --- THE MAGIC NETWORK BYPASS ---
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first'); // Prefer IPv4 over broken IPv6
dns.setServers(['8.8.8.8', '8.8.4.4']); // Use Google DNS
// --------------------------------

const mongoose = require('mongoose');
const axios = require('axios');

// 2. Pull the keys securely from process.env
const MONGO_URI = process.env.MONGO_URI;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// Safety check
if (!MONGO_URI || !PEXELS_API_KEY) {
  console.error("❌ ERROR: Missing MONGO_URI or PEXELS_API_KEY in the .env file.");
  process.exit(1);
}

// Flexible schema
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function updateProductImages() {
  try {
    console.log('⏳ Connecting to MongoDB Atlas securely...');

    // Force IPv4 connection
    await mongoose.connect(MONGO_URI, { family: 4 });

    console.log('✅ Connected successfully to Atlas Database');

    // Fetch all products (replace old image URLs too)
    const products = await Product.find().lean();

    console.log(`📊 Found ${products.length} products.`);
    console.log('⏳ Updating images... Please wait.');

    for (let i = 0; i < products.length; i++) {
      const productRaw = products[i];

      const productName =
        productRaw.ProductName ||
        productRaw.name ||
        productRaw.product_name;

      if (!productName) continue;

      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(productName)}&per_page=1`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );

        if (
          response.data.photos &&
          response.data.photos.length > 0
        ) {
          const imgUrl = response.data.photos[0].src.large;

          await Product.updateOne(
            { _id: productRaw._id },
            {
              $set: {
                imageUrl: imgUrl,
              },
            }
          );
        }
      } catch (apiError) {
        console.error(`❌ API Error for ${productName}: ${apiError.message}`);
      }

      // Small delay to avoid hitting rate limits
      await sleep(500);
    }

    console.log('🎉 Image seeding complete!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Database Error:', error);
    process.exit(1);
  }
}

updateProductImages();