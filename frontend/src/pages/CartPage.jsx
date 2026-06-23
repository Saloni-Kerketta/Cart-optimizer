import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  // State for recommendations
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch a few products to use as recommendations
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/products');
        const data = await response.json();
        // Grab 4 random/first products for the recommendations section
        setRecommendations(data.slice(0, 4));
      } catch (err) {
        console.error("Failed to load recommendations");
      }
    };
    fetchRecommendations();
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        {/* Left Side: Cart Items List */}
        <div className="w-full lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative">
              
              {/* Item Image - FIXED to use imageUrl */}
              <img 
                src={item.imageUrl || "https://placehold.co/150?text=No+Image"} 
                alt={item.ProductName} 
                className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/150?text=Image+Broken";
                }}
              />
              
              {/* Item Details */}
              <div className="ml-6 flex-grow">
                <h3 className="text-lg font-bold text-gray-800">{item.ProductName}</h3>
                <p className="text-blue-600 font-bold mt-1">${Number(item.Price).toFixed(2)}</p>
                
                {/* Quantity Controls */}
                <div className="flex items-center mt-3 bg-gray-100 w-fit rounded-lg">
                  <button onClick={() => updateQuantity(item._id, -1)} className="px-3 py-1 font-bold text-gray-600 hover:text-black">-</button>
                  <span className="px-3 font-semibold text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 1)} className="px-3 py-1 font-bold text-gray-600 hover:text-black">+</button>
                </div>
              </div>

              {/* Total Price & Remove */}
              <div className="flex flex-col items-end justify-between h-24">
                <p className="font-bold text-lg text-gray-900">${(item.Price * item.quantity).toFixed(2)}</p>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 text-sm font-semibold hover:text-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">Order Summary</h2>
            
            <div className="space-y-3 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t pt-4 mb-6">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* RECOMMENDED PRODUCTS SECTION */}
      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
        
        {/* Grid for smaller, sleeker recommendation cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.map((product) => (
            <div key={product._id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group flex flex-col">
              <div className="h-32 overflow-hidden rounded-lg mb-3">
                {/* Product Image - FIXED to use imageUrl */}
                <img 
                  src={product.imageUrl || "https://placehold.co/150?text=No+Image"} 
                  alt={product.ProductName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/150?text=Image+Broken";
                  }}
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 truncate">{product.ProductName}</h3>
              
              <div className="flex justify-between items-center mt-auto pt-2">
                <span className="font-bold text-gray-900">${Number(product.Price).toFixed(2)}</span>
                <Link to="/" className="text-xs bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded hover:bg-blue-100 transition">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CartPage;