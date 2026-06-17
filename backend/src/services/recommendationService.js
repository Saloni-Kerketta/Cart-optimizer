const Cart = require('../models/Cart');
const ProductRelationship = require('../models/ProductRelationship');
const calculateScores = require('../services/ranking');

async function getRecommendations(req, res) {
    try {
        let userCartId = req.body.cartId;

        // 1. Get all items currently in the user's cart
        let itemsInCart = await Cart.find({ cartId: userCartId }).populate('productId');

        if (itemsInCart.length === 0) {
            return res.json({ message: "Cart is empty" });
        }

        // 2. Find the most expensive item in the cart (this is our main item)
        let mainItem = itemsInCart[0].productId;
        
        for (let i = 0; i < itemsInCart.length; i++) {
            if (itemsInCart[i].productId.price > mainItem.price) {
                mainItem = itemsInCart[i].productId;
            }
        }

        // 3. Find related items from the database mapping
        let relationsFromDb = await ProductRelationship.find({ productid: mainItem._id }).populate('relatedProductid');

        // 4. Create a clean list to pass into our math function
        let listForMathFunction = [];
        
        for (let i = 0; i < relationsFromDb.length; i++) {
            let tempObject = {
                productDetails: relationsFromDb[i].relatedProductid,
                relationshipScore: relationsFromDb[i].relationshipScore
            };
            listForMathFunction.push(tempObject);
        }

        // 5. Call the math function
        let finalRankedAnswers = calculateScores(listForMathFunction, mainItem.price);

        // 6. Send the answers back to the frontend
        return res.json({
            targetProduct: mainItem.productName,
            recommendations: finalRankedAnswers
        });

    } catch (error) {
        console.log(error);
        return res.json({ message: "Something went wrong in the server" });
    }
}

module.exports = { getRecommendations };