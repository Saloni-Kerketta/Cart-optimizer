// This file is your Mongoose Model. It does not actually hold any data itself. 
// Instead, it acts as a strict rulebook for MongoDB. It tells your database, 
// "Hey, if anyone tries to save a relationship here, it absolutely MUST have a productId, 
// a relatedProductId, and a relationshipScore." Without this file, your backend has no idea 
// how to structure the database.
// This defines the link between two products, like a Laptop and a Mouse.
const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
  productid: { type: String, ref: 'Product', required: true },
  relatedProductid: { type: String, ref: 'Product', required: true },
  relationshipScore: { type: Number, required: true } 
});

module.exports = mongoose.model('ProductRelationship', relationshipSchema);