const ProductRelationship = require('../models/ProductRelationship');
const Product = require('../models/Products');

async function getRecommendations(cartItems) {

    const recommendationMap = {};

    // Get all related products
    for (const item of cartItems) {

        const relationships =
            await ProductRelationship.find({
                productid: item
            });

        console.log(
            `Found ${relationships.length} relationships for ${item}`
        );

        for (const relation of relationships) {

            const recommendedId =
                relation.relatedProductid;

            // Don't recommend item already in cart
            if (cartItems.includes(recommendedId))
                continue;

            // Keep highest score
            recommendationMap[recommendedId] =
                Math.max(
                    recommendationMap[recommendedId] || 0,
                    relation.relationshipScore
                );
        }
    }

    // Sort by score descending
    const sortedRecommendations =
        Object.entries(recommendationMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5); // TOP 5 PRODUCTS

    const productIds =
        sortedRecommendations.map(
            ([id]) => id
        );

    const products =
        await Product.find({
            _id: { $in: productIds }
        });

    return sortedRecommendations.map(
        ([id, score]) => {

            const product =
                products.find(
                    p => p._id === id
                );

            return {
                productId: id,
                productName:
                    product?.productName ||
                    "Unknown Product",
                category:
                    product?.category || "",
                price:
                    product?.price || 0,
                rating:
                    product?.rating || 0,
                recommendationScore:
                    score
            };
        }
    );
}

module.exports = {
    getRecommendations
};