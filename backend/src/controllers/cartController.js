const Cart = require('../models/Cart');

// POST: Add a new item to the cart
async function addToCart(req, res) {
    try {
        let currentCartId = req.body.cartId;
        let selectedProductId = req.body.productId;

        // 1. Check if the product is already in the cart
        let existingItem = await Cart.findOne({ cartId: currentCartId, productId: selectedProductId });

        if (existingItem) {
            // If it is already there, just increase the quantity by 1
            existingItem.quantity = existingItem.quantity + 1;
            await existingItem.save();
            return res.json({ message: "Quantity increased!", data: existingItem });
        }

        // 2. If it is not in the cart, create a new entry
        let newItem = await Cart.create({
            cartId: currentCartId,
            productId: selectedProductId,
            quantity: 1
        });

        return res.json({ message: "Item added to cart successfully!", data: newItem });

    } catch (error) {
        console.log("Error adding to cart:", error);
        return res.status(500).json({ message: "Failed to add item to cart" });
    }
}

// GET: Fetch everything inside a user's cart and calculate the total bill
async function getCart(req, res) {
    try {
        let currentCartId = req.params.cartId;

        // Fetch the cart items and populate the actual product details (like name and price)
        let cartItems = await Cart.find({ cartId: currentCartId }).populate('productId');

        if (cartItems.length === 0) {
            return res.json({ message: "Your cart is empty", totalItems: 0, totalPrice: 0, items: [] });
        }

        // Calculate the total price of the cart
        let totalBill = 0;
        let totalItemCount = 0;

        for (let i = 0; i < cartItems.length; i++) {
            let itemPrice = cartItems[i].productId.price;
            let itemQuantity = cartItems[i].quantity;
            
            totalBill = totalBill + (itemPrice * itemQuantity);
            totalItemCount = totalItemCount + itemQuantity;
        }

        return res.json({
            message: "Cart fetched successfully",
            totalItems: totalItemCount,
            totalPrice: totalBill,
            items: cartItems
        });

    } catch (error) {
        console.log("Error fetching cart:", error);
        return res.status(500).json({ message: "Failed to load cart" });
    }
}

// DELETE: Remove an item from the cart
async function removeFromCart(req, res) {
    try {
        // We pass the unique _id of the cart document we want to delete
        let cartDocumentId = req.params.id; 

        let deletedItem = await Cart.findByIdAndDelete(cartDocumentId);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        return res.json({ message: "Item removed from cart successfully" });

    } catch (error) {
        console.log("Error removing from cart:", error);
        return res.status(500).json({ message: "Failed to remove item" });
    }
}

module.exports = { addToCart, getCart, removeFromCart };