function calculateScores(relatedItemsList, mainItemPrice) {
    let resultList = [];

    for (let i = 0; i < relatedItemsList.length; i++) {
        let item = relatedItemsList[i];
        let product = item.productDetails; // The actual product data
        let totalScore = 0;

        // 1. Relationship Score (Powered by your Apriori ML) - 40% weight
        totalScore += (item.relationshipScore * 0.40);

        // 2. Popularity Score
        if (product.Popularity === 'High') {
            totalScore += 30;
        } else if (product.Popularity === 'Medium') {
            totalScore += 15;
        } else {
            totalScore += 5;
        }

        // 3. Rating Score (Scales a 5-star rating to a max of 20 points)
        if (product.Rating) {
            totalScore += ((product.Rating / 5) * 20);
        }
        // 4. Pricing Compatibility 
        // Logic: Add-ons are usually cheaper than the main item. 
        // If the accessory is less than 50% of the main item's price, it's a highly compatible cross-sell.
        if (product.Price < (mainItemPrice * 0.50)) {
            totalScore += 10;
        }

        resultList.push({ 
            product: product, 
            score: totalScore.toFixed(2) // Keep it to 2 decimal places
        });
    }

    // Sort the list from highest score to lowest score
    resultList.sort((a, b) => b.score - a.score);

    // Return only the Top 3 best recommendations
    return resultList.slice(0, 3);
}

module.exports = calculateScores;