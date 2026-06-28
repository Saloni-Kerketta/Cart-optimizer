const Product = require('../models/Product');
// Function 1: Fetch all products for the store homepage
async function getAllProducts(req, res) {
    try {
        // .lean() makes the database query much faster by returning raw JSON
        const products = await Product.find({}).lean();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Server error fetching products" });
    }
}
// Function 2: Fetch a single product's details (when a user clicks on one)
async function getProductById(req, res) {
    try {
        // Grab the ID from the URL (e.g., /api/products/1001)
        const { id } = req.params;
        
        // Search using your custom ProductID column
        const product = await Product.findOne({ ProductID: Number(id) }).lean();

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Server error fetching product details" });
    }
}
module.exports = { getAllProducts, getProductById };