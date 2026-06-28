import React, { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext();

// Create a custom hook to use the cart easily
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if item is already in cart
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        // Increase quantity
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Add new item with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove item entirely
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  // Update quantity to an EXACT amount
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        // BUG FIX: Removed 'item.quantity + amount' and replaced with 'newQuantity'
        item._id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  // Calculate total price
  const cartTotal = cartItems.reduce((total, item) => total + (item.Price * item.quantity), 0);
  // Calculate total items for the navbar badge
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};