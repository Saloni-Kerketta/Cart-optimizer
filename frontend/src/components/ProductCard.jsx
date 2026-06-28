import React from 'react';
import { useCart } from '../context/CartContext'; 
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // 1. Pull the extra cart functions from your Context
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart(); 
  const navigate = useNavigate();

  // 2. Check if this exact product is already in the cart array
  // (Using product._id assuming you are using MongoDB. If your DB uses 'id', change this to product.id)
  const cartItem = cartItems?.find((item) => item._id === product._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // 3. Centralized Auth Check
  const checkAuth = () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      alert("Please login or signup to add items to your cart!");
      navigate('/login'); 
      return false; 
    }
    return true;
  };

  // 4. Cart Action Handlers
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents clicking the button from triggering the card's hover/click effects
    if (checkAuth()) addToCart(product);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (checkAuth()) updateQuantity(product._id, quantityInCart + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (!checkAuth()) return;
    
    if (quantityInCart === 1) {
      removeFromCart(product._id);
    } else {
      updateQuantity(product._id, quantityInCart - 1);
    }
  };

  const initialImage = product.imageUrl || `https://placehold.co/600x400/e2e8f0/1e293b?text=${encodeURIComponent(product.ProductName)}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden
                flex flex-col
                transition-all 
                hover:-translate-y-2 cursor-pointer">
      
      {/* Product Image */}
      <div className="h-48 overflow-hidden bg-gray-200">
        <img 
          src={initialImage} 
          alt={product.ProductName || "Product"} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = `https://placehold.co/600x400/e2e8f0/1e293b?text=${encodeURIComponent(product.ProductName || 'Product')}`;
          }}
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {product.ProductName || "Unnamed Product"}
        </h3>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.Price ? Number(product.Price).toFixed(2) : "0.00"}
          </span>
          <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-sm">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-blue-700 font-medium">{product.Rating || "N/A"}</span>
          </div>
        </div>

        {/* --- THE NEW CART BUTTON LOGIC --- */}
        <div className="mt-auto">
          {quantityInCart === 0 ? (
            // State 1: Not in cart yet (Your original button)
            <button 
              onClick={handleAddToCart} 
              className="w-full cursor-pointer bg-gray-900 text-white py-2 rounded font-medium hover:bg-gray-800 transition-colors active:scale-95"
            >
              Add to Cart
            </button>
          ) : (
            // State 2: Already in cart (The Amazon-style selector)
            <div className="flex items-center justify-between border-2 border-blue-700 rounded-full px-4 py-1.5 bg-white shadow-sm cursor-default" onClick={(e) => e.stopPropagation()}>
              
              <button 
                onClick={handleDecrease} 
                className="text-gray-600 hover:text-red-500 p-1 flex items-center justify-center transition-colors cursor-pointer"
              >
                {quantityInCart === 1 ? (
                  // Trash Can Icon
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                ) : (
                  // Minus Icon
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" />
                  </svg>
                )}
              </button>

              <span className="font-semibold text-gray-900 text-sm">
                {quantityInCart} in cart
              </span>

              <button 
                onClick={handleIncrease} 
                className="text-gray-600 hover:text-green-600 p-1 flex items-center justify-center transition-colors cursor-pointer"
              >
                {/* Plus Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              
            </div>
          )}
        </div>
        {/* --------------------------------- */}

      </div>
    </div>
  );
};

export default ProductCard;