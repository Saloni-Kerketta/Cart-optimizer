const Cart = require('../models/Cart');
const Product = require('../models/Product');

// 1. ADD: Put an item in the cart
async function addToCart(req, res) {
    try {
        // Step 1: Get data from the frontend request
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ message: "We need both a userId and a productId" });
        }
        // Step 2: Look for the user's cart in the database
        let cart = await Cart.findOne({ userId: userId });
        // Step 3: If the cart doesn't exist at all, create a brand new one
        if (!cart) {
            cart = new Cart({ 
                userId: userId, 
                items: [{ productId: Number(productId), quantity: 1 }] 
            });
        } 
        // Step 4: If the cart DOES exist, figure out if the item is already inside
        else {
            // Search the cart to see if this item is already there
            let existingItem = cart.items.find(item => item.productId === Number(productId));

            if (existingItem) {
                // If it is already there, just add 1 to the count
                existingItem.quantity += 1;
            } else {
                // If it is a new item, add it to the list
                cart.items.push({ productId: Number(productId), quantity: 1 });
            }
        }

        // Step 5: Save our changes to the database
        await cart.save();
        return res.status(200).json({ message: "Item added to cart successfully!", cart: cart });

    } catch (error) {
        console.error("Cart Add Error:", error);
        return res.status(500).json({ message: "Server error adding to cart" });
    }
}

// 2. READ: View everything in the cart
async function getCart(req, res) {
    try {
        // Step 1: Get the userId from the URL bar
        const { userId } = req.params;
        // Step 2: Find their cart
        const cart = await Cart.findOne({ userId: userId }).lean();

        // Step 3: If they have no cart, or the cart is empty, send back a total of 0
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ items: [], grandTotal: 0 });
        }
        // Step 4: Make a simple list of just the Product IDs in the cart
        let idsToFind = [];
        for (let i = 0; i < cart.items.length; i++) {
            idsToFind.push(cart.items[i].productId);
        }
        // Step 5: Ask the database for the real names and prices of those specific IDs
        const productsFromDB = await Product.find({ ProductID: { $in: idsToFind } }).lean();

        // Step 6: Build the final list to send to the frontend
        let finalCartItems = [];
        let grandTotal = 0;
        // Loop through the user's cart one item at a time
        for (let i = 0; i < cart.items.length; i++) {
            let cartItem = cart.items[i];
            // Find the matching details (like Price and Name) from our database lookup
            let productDetails = productsFromDB.find(p => p.ProductID === cartItem.productId);
            
            // If the product exists in our catalog, do the math!
            if (productDetails) {
                let totalForThisItem = productDetails.Price * cartItem.quantity;
                grandTotal += totalForThisItem; // Add to the total bill
                // Add the clean, formatted item to our final list
                finalCartItems.push({
                    productId: productDetails.ProductID,
                    name: productDetails.ProductName,
                    price: productDetails.Price,
                    quantity: cartItem.quantity,
                    totalPrice: totalForThisItem
                });
            }
        }
        // Step 7: Send the finished math back to the frontend
        return res.status(200).json({ items: finalCartItems, grandTotal: grandTotal });
    } catch (error) {
        console.error("Cart Fetch Error:", error);
        return res.status(500).json({ message: "Server error fetching cart" });
    }
}

// 3. DELETE: Remove an item from the cart
async function removeFromCart(req, res) {
    try {
        const { userId, productId } = req.body;
        // Step 1: Find the cart
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        // Step 2: Use .filter() to keep everything EXCEPT the item we want to delete
        cart.items = cart.items.filter(item => item.productId !== Number(productId));
        // Step 3: Save the updated cart
        await cart.save();
        return res.status(200).json({ message: "Item removed from cart", cart: cart });

    } catch (error) {
        console.error("Cart Remove Error:", error);
        return res.status(500).json({ message: "Server error removing item" });
    }
}
module.exports = { addToCart, getCart, removeFromCart };