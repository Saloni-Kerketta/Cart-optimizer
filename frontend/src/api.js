import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create an isolated axios instance with global settings pre-configured
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // 1. Fetch catalog items for your Main Product Page
  getProducts: async () => {
    try {
      const response = await apiClient.get('/products'); // Maps to backend productController
      return response.data;
    } catch (error) {
      console.error("Error fetching product catalog:", error);
      throw error;
    }
  },

  // 2. Add an item to the backend cart session/database
  addToCart: async (productId) => {
    try {
      const response = await apiClient.post('/cart/add', { productId }); // Maps to cartController
      return response.data;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  },

  // 3. Remove an item from the backend cart
  removeFromCart: async (productId) => {
    try {
      const response = await apiClient.delete(`/cart/remove/${productId}`); // Maps to cartController
      return response.data;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  },

  // 4. THIS CALLS YOUR UNIFIED AI RECOMMENDATION GENERATOR!
  // Send just the productId from the cart, and get back the products + your custom aiPitch text
  getSmartRecommendations: async (productId) => {
    try {
      const response = await apiClient.post('/recommendations/generate', { productId });
      return response.data; 
      /* Returns:
         {
           targetProduct: "...",
           targetPrice: 0,
           aiPitch: "AI-generated single sentence pitch...",
           recommendations: [...]
         }
      */
    } catch (error) {
      console.error("Error fetching automated AI recommendations:", error);
      throw error;
    }
  }
};