import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
const API_URL = import.meta.env.VITE_API_URL;
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- NEW: SEARCH STATE ---
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}http://localhost:7000/api/products`); 
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- NEW: RESET PAGE WHEN SEARCHING ---
  // If the user is on page 3 and searches for something new, 
  // send them back to page 1 of the new results!
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // --- NEW: FILTER LOGIC ---
  // Only keep products where the name matches whatever the user typed
  const filteredProducts = products.filter(product => 
    product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- UPDATED: PAGINATION MATH ---
  // Notice we now use 'filteredProducts' instead of 'products' for all the math!
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-xl font-bold text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-xl font-bold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      
      {/* Header and Search Bar Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        
        {/* NEW: SEARCH INPUT */}
        <div className="w-full md:w-96 relative">
          <input 
            type="text" 
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm"
          />
          {/* Magnifying Glass Icon */}
          <div className="absolute left-3 top-3.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        // What to show if the search finds nothing
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600">No products found for "{searchQuery}"</h2>
          <p className="text-gray-400 mt-2">Try checking your spelling or searching for a different term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-6 mt-12 mb-4">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;