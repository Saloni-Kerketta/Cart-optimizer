const mongoose = require('mongoose');

const productRelationshipSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  relatedProductId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  relationshipScore: { 
    type: Number, 
    required: true, 
    min: 0, 
    max: 100 
  } // Scale of 0-100 indicating how strongly linked they are
});

module.exports = mongoose.model('ProductRelationship', productRelationshipSchema);