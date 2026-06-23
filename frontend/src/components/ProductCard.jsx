import React from 'react';
import { useCart } from '../context/CartContext'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); 

  // Try the database image first
  const initialImage = product.imageUrl || `https://placehold.co/600x400/e2e8f0/1e293b?text=${encodeURIComponent(product.ProductName)}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Product Image */}
      <div className="h-48 overflow-hidden bg-gray-200">
        <img 
          src={initialImage} 
          alt={product.ProductName || "Product"} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // If the Pixabay link is dead, swap it for a nice placeholder with the product name!
            e.target.onerror = null; 
            e.target.src = `https://placehold.co/600x400/e2e8f0/1e293b?text=${encodeURIComponent(product.ProductName || 'Product')}`;
          }}
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
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

        {/* Add to Cart Button */}
        <div className="mt-auto">
          <button 
            onClick={() => addToCart(product)} 
            className="w-full bg-gray-900 text-white py-2 rounded font-medium hover:bg-gray-800 transition-colors active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;