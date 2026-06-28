import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
const API_URL = import.meta.env.VITE_API_URL;
const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, addToCart } = useCart();
  
  const [recommendations, setRecommendations] = useState([]);
  const [aiPitch, setAiPitch] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const firstItemTargetId = cartItems.length > 0 
    ? (cartItems[0].ProductID || cartItems[0]._id) 
    : null;

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!firstItemTargetId) return;

      setLoadingAi(true);
      try {
        const response = await fetch(`${API_URL}/api/recommendations/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: firstItemTargetId }) 
        });
        
        const data = await response.json();
        setAiPitch(data.aiPitch);
        
        const fetchedProducts = data.recommendations.map(rec => rec.product);
        setRecommendations(fetchedProducts);
      } catch (err) {
        console.error("Failed to load AI recommendations", err);
      } finally {
        setLoadingAi(false);
      }
    };

    fetchRecommendations();
  }, [firstItemTargetId]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
          Start Shopping
        </Link>
      </div>
    );
  }

  const gridClass = recommendations.length === 3 
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Left Side: Cart Items List */}
        <div className="w-full lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md">
              <img 
                src={item.imageUrl || `https://placehold.co/150?text=${encodeURIComponent(item.ProductName)}`} 
                alt={item.ProductName} 
                className="w-20 h-20 object-cover rounded-lg bg-gray-50 border border-gray-100"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/150?text=Image+Broken";
                }}
              />
              <div className="sm:ml-5 mt-4 sm:mt-0 flex-grow text-center sm:text-left">
                <h3 className="text-base font-bold text-gray-900">{item.ProductName}</h3>
                <p className="text-indigo-600 font-bold mt-1 text-sm">${Number(item.Price).toFixed(2)}</p>
                <div className="flex items-center justify-center sm:justify-start mt-3 bg-gray-50 w-fit rounded-lg border border-gray-200 mx-auto sm:mx-0">
                  <button onClick={() => updateQuantity(item._id, -1)} className="px-3 py-1 font-bold text-gray-600 hover:text-indigo-600 transition">-</button>
                  <span className="px-3 font-semibold text-gray-800 text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 1)} className="px-3 py-1 font-bold text-gray-600 hover:text-indigo-600 transition">+</button>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-end justify-between h-full mt-4 sm:mt-0 min-h-[5rem]">
                <p className="font-extrabold text-lg text-gray-900">${(item.Price * item.quantity).toFixed(2)}</p>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 text-xs font-semibold hover:text-red-700 transition mt-auto flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">Order Summary</h2>
            <div className="space-y-3 mb-6 text-gray-600 font-medium text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Free</span>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-6">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-indigo-600">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-sm hover:shadow active:scale-95 text-sm">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* DYNAMIC AI RECOMMENDED PRODUCTS SECTION - COMPACTED */}
      <div className="border-t border-gray-200 pt-8 pb-6">
        
        {/* The AI Pitch Banner */}
        <div className="mb-6 w-full">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-xl font-extrabold text-gray-900">Perfect Companions</h2>
          </div>
          
          {loadingAi ? (
             <div className="flex items-center justify-center gap-2 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 text-indigo-600 font-medium animate-pulse text-sm">
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path></svg>
                Analyzing cart for perfect matches...
             </div>
          ) : aiPitch ? (
            <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-100 p-5 md:p-6 rounded-2xl shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 text-indigo-200 opacity-20">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 9l7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"/></svg>
              </div>
              <p className="text-base md:text-lg text-gray-800 italic font-medium leading-relaxed relative z-10 text-center px-2 md:px-6">
                "{aiPitch}"
              </p>
            </div>
          ) : null}
        </div>
        
        {/* Grid for AI recommendation cards */}
        {!loadingAi && recommendations.length > 0 && (
          <div className={`grid gap-5 ${gridClass}`}>
            {recommendations.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group flex flex-col hover:-translate-y-1">
                <div className="h-32 overflow-hidden rounded-lg mb-3 bg-gray-50 border border-gray-100">
                  <img 
                    src={product.imageUrl || `https://placehold.co/400x300?text=${encodeURIComponent(product.ProductName || 'Product')}`} 
                    alt={product.ProductName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://placehold.co/400x300?text=Image+Broken";
                    }}
                  />
                </div>
                <h3 className="text-base font-bold text-gray-800 line-clamp-2 min-h-[3rem]">{product.ProductName}</h3>
                
                <div className="mt-auto pt-3 flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="font-extrabold text-xl text-gray-900">${Number(product.Price).toFixed(2)}</span>
                    <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-700">
                      ★ {product.Rating || "4.5"}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <Link to={`/product/${product._id}`} className="flex-1 text-center text-sm bg-indigo-50 text-indigo-700 font-bold py-2 rounded-lg hover:bg-indigo-100 transition">
                      Details
                    </Link>
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 text-sm bg-gray-900 text-white font-bold py-2 rounded-lg hover:bg-gray-800 transition active:scale-95"
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default CartPage;