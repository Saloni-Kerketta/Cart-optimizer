const Product = require('../models/Product');
const ProductRelationship = require('../models/ProductRelationship');
const calculateScores = require('../services/ranking');

async function getRecommendations(req, res) {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Please provide a productId" });
        }

        // 1. Find the main target product using the correct ProductID column name
        const mainProduct = await Product.findOne({ ProductID: Number(productId) }).lean();
        if (!mainProduct) {
            return res.status(404).json({ message: "Product not found in catalog" });
        }

        // 2. Fetch all Apriori relationships for this product from the database
        const relationships = await ProductRelationship.find({ productid: String(productId) }).lean();

        if (relationships.length === 0) {
            return res.json({ message: "No recommendations found for this item." });
        }

        // 3. Extract all the related Product ID numbers into a clean array
        const relatedIds = relationships.map(rel => Number(rel.relatedProductid));

        // 4. FIX: Fetch full details for ALL matching products in one single batch query
        const relatedProductsList = await Product.find({ ProductID: { $in: relatedIds } }).lean();

        // 5. Combine the data to prepare it for your ranking system
        let listForMathFunction = [];
        relationships.forEach(rel => {
            // Find the item details from our batch list that match this relationship
            const productDetails = relatedProductsList.find(p => p.ProductID === Number(rel.relatedProductid));
            // Only add it if the item actually exists in your product catalog
            if (productDetails) {
                listForMathFunction.push({
                    productDetails: productDetails,
                    relationshipScore: rel.relationshipScore
                });
            }
        });

        // 6. Pass everything to your ranking logic engine (40/30/20/10 split)
        const finalRecommendations = calculateScores(listForMathFunction, mainProduct.Price);

        // 7. Deliver the clean, mathematically optimized recommendations to the client
        return res.status(200).json({
            targetProduct: mainProduct.ProductName,
            targetPrice: mainProduct.Price,
            recommendations: finalRecommendations
        });

    } catch (error) {
        console.error("Error in recommendation controller:", error);
        return res.status(500).json({ message: "Server error generating recommendations" });
    }
}

module.exports = { getRecommendations };