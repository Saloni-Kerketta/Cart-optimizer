const Product = require('../models/Product');
const ProductRelationship = require('../models/ProductRelationship');
const calculateScores = require('../services/ranking');
const { generateSalesPitch } = require('../services/aiService');

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

        // ==========================================
        // NEW: AUTOMATED AI GENERATION CODELINE
        // ==========================================
        let aiPitchText = "No additional recommendations available to pitch.";
        
        // Check if our ranking math successfully found at least one recommended item
        if (finalRecommendations && finalRecommendations.length > 0) {
            const targetName = mainProduct.ProductName;
            // Extract the name of the absolute #1 ranked product from the list
            const topRecommendedName = finalRecommendations[0].product.ProductName;

            try {
                // Call Gemini automatically using the names
                aiPitchText = await generateSalesPitch(targetName, topRecommendedName);
            } catch (aiError) {
                console.error("Gemini failed to generate text, falling back to placeholder:", aiError);
                aiPitchText = `We highly recommend pairing your ${targetName} with the ${topRecommendedName}!`;
            }
        }
        // ==========================================

        // 7. Deliver the clean, mathematically optimized recommendations to the client
        return res.status(200).json({
            targetProduct: mainProduct.ProductName,
            targetPrice: mainProduct.Price,
            aiPitch: aiPitchText, // <--- Here is your automated AI text!
            recommendations: finalRecommendations
        });

    } catch (error) {
        console.error("Error in recommendation controller:", error);
        return res.status(500).json({ message: "Server error generating recommendations" });
    }
}

// 2. NEW ENDPOINT FUNCTION ADDED HERE For GENAI
async function getRecommendationPitch(req, res) {
    try {
        const { targetProduct, recommendedProduct } = req.body;

        if (!targetProduct || !recommendedProduct) {
            return res.status(400).json({ 
                message: "Both targetProduct and recommendedProduct are required items." 
            });
        }

        const pitch = await generateSalesPitch(targetProduct, recommendedProduct);

        return res.status(200).json({
            success: true,
            data: {
                targetProduct,
                recommendedProduct,
                pitch
            }
        });
    } catch (error) {
        return res.status(500).json({ 
            message: error.message || "Server error creating the sales pitch" 
        });
    }
}

module.exports = { getRecommendations,
                   getRecommendationPitch
                };
