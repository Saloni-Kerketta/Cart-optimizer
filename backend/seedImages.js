// backend/seedImages.js

// 1. Import dotenv at the very top to load the hidden variables
require('dotenv').config(); 

const mongoose = require('mongoose');
const axios = require('axios');

// 2. Pull the keys securely from process.env
const MONGO_URI = process.env.MONGO_URI;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY; 

// Add a quick safety check so the script warns you if it can't find the .env file
if (!MONGO_URI || !PIXABAY_API_KEY) {
  console.error("❌ ERROR: Missing MONGO_URI or PIXABAY_API_KEY in the .env file.");
  process.exit(1);
}

const productSchema = new mongoose.Schema({}, { strict: false }); 
const Product = mongoose.model('Product', productSchema);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function updateProductImages() {
  try {
    console.log('⏳ Connecting to MongoDB Atlas securely...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected successfully to Atlas Database');

    // Find items missing an image
    const products = await Product.find({ 
      $or: [ { imageUrl: { $exists: false } }, { imageUrl: "" } ] 
    }).lean();
    
    console.log(`📊 Found ${products.length} products needing images.`);

    for (let i = 0; i < products.length; i++) {
      const productRaw = products[i];
      
      const productName = productRaw.ProductName || productRaw.name || productRaw.product_name;

      if (!productName) {
        console.log(`[${i + 1}/${products.length}] ❌ Skipped: Could not find a name property.`);
        continue;
      }

      console.log(`[${i + 1}/${products.length}] Fetching image for: ${productName}`);

      try {
        const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(productName)}&image_type=photo&per_page=3`;
        const response = await axios.get(url);

        if (response.data.hits && response.data.hits.length > 0) {
          const imgUrl = response.data.hits[0].webformatURL;
          
          await Product.updateOne({ _id: productRaw._id }, { $set: { imageUrl: imgUrl } });
          console.log(`   ✅ Saved: ${imgUrl}`);
        } else {
          console.log(`   ⚠️ No image found on Pixabay for "${productName}"`);
        }

      } catch (apiError) {
        console.error(`   ❌ API Error for ${productName}:`, apiError.message);
      }

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