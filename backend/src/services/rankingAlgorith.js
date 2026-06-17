function calculateScores(relatedItemsList, mainItemPrice) {
    let resultList = [];

    // Loop through every item to calculate its total score
    for (let i = 0; i < relatedItemsList.length; i++) {
        let currentItem = relatedItemsList[i].productDetails;
        let relationScore = relatedItemsList[i].relationshipScore;
        
        let totalScore = 0;

        // 1. 40% Product Relationship Weight
        totalScore = totalScore + (relationScore * 0.40);

        // 2. 30% Popularity Weight
        if (currentItem.popularity === 'High') {
            totalScore = totalScore + 30;
        } else if (currentItem.popularity === 'Medium') {
            totalScore = totalScore + 15;
        } else {
            totalScore = totalScore + 5;
        }

        // 3. 20% Rating Weight (Rating is out of 5, so we convert it to out of 20)
        totalScore = totalScore + ((currentItem.rating / 5) * 20);

        // 4. 10% Price Compatibility Weight
        // We only want to recommend items that are much cheaper than the main item.
        let thirtyPercentOfMainPrice = mainItemPrice * 0.30;

        if (currentItem.price < thirtyPercentOfMainPrice) {
            totalScore = totalScore + 10; // Good price for an add-on
        } else {
            totalScore = totalScore + 0;  // Too expensive
        }

        // Create a simple object to hold the product and its new score
        let finalProductObject = {
            product: currentItem,
            score: totalScore
        };

        // Add it to our list
        resultList.push(finalProductObject);
    }

    // Sort the list from highest score to lowest score
    resultList.sort(function(a, b) {
        return b.score - a.score;
    });

    // Create a new list that only holds the top 3 items
    let topThreeItems = [];
    for (let j = 0; j < resultList.length; j++) {
        if (j < 3) {
            topThreeItems.push(resultList[j]);
        }
    }

    return topThreeItems;
}

module.exports = calculateScores;