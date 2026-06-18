const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const ProductRelationship = require('./src/models/ProductRelationship');

// Replace with your local database or your teammate's development DB URI
const MONGO_URI = 'mongodb://127.0.0.1:27017/smart_cart';

async function seed() {
  await mongoose.connect(MONGO_URI);
  
  // Clear existing items to maintain a fresh state during tests
  await Product.deleteMany({});
  await ProductRelationship.deleteMany({});

  // 1. Insert Core Testing Products
  const laptop = await Product.create({ productName: 'Gaming Laptop', category: 'Electronics', brand: 'TechBrand', price: 60000, rating: 4.5, popularity: 'High' });
  const mouse = await Product.create({ productName: 'Wireless Mouse', category: 'Accessories', brand: 'Logi', price: 1200, rating: 4.6, popularity: 'High' });
  const keyboard = await Product.create({ productName: 'Mechanical Keyboard', category: 'Accessories', brand: 'Key', price: 4500, rating: 4.3, popularity: 'Medium' });
  const expensiveMonitor = await Product.create({ productName: '4K UltraWide Monitor', category: 'Monitors', brand: 'View', price: 55000, rating: 4.8, popularity: 'High' });

  console.log('Products seeded successfully!');

  // 2. Map the Product Relationships
  await ProductRelationship.create([
    { productId: laptop._id, relatedProductId: mouse._id, relationshipScore: 95 },      // High association
    { productId: laptop._id, relatedProductId: keyboard._id, relationshipScore: 80 },   // Medium-high association
    { productId: laptop._id, relatedProductId: expensiveMonitor._id, relationshipScore: 40 } // Out of sensible budget tier
  ]);

  console.log('Product relationships seeded successfully!');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});