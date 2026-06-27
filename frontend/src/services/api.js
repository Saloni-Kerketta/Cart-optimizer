// The base link to your Node.js server
const BASE_URL = 'http://localhost:5000/api';
// PRODUCT REQUESTS
// Get the whole catalog for the Home Page
export async function fetchAllProducts() {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    return data;
}
// Get one specific product for the Details Page
export async function fetchProductById(productId) {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    const data = await response.json();
    return data;
}
// CART REQUESTS

// Get everything in a specific user's cart
export async function fetchCart(userId) {
    const response = await fetch(`${BASE_URL}/cart/${userId}`);
    const data = await response.json();
    return data;
}

// Add an item to the cart
export async function addToCart(userId, productId) {
    const response = await fetch(`${BASE_URL}/cart/add`, {
        method: 'POST', // POST because we are sending new data
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId, productId: productId })
    });
    const data = await response.json();
    return data;
}

// Remove an item from the cart
export async function removeFromCart(userId, productId) {
    const response = await fetch(`${BASE_URL}/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId, productId: productId })
    });
    const data = await response.json();
    return data;
}

// AI & MACHINE LEARNING REQUESTS
// Run the Apriori Math and get the Gemini AI Pitch
export async function fetchRecommendations(productId) {
    const response = await fetch(`${BASE_URL}/recommendations/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: productId })
    });
    const data = await response.json();
    return data;
}