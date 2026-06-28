import React, { useState } from 'react';

const Sidebar = () => {
  const categories = ['Electronics', 'Accessories', 'Computers', 'Smart Home'];
  
  // State to make the slider dynamically show the price as you drag it
  const [maxPrice, setMaxPrice] = useState(5000);

  return (
    <aside className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
        Filters
      </h2>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">
          Categories
        </h3>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                // accent-blue-600 changes the checkbox color from default red/gray to a nice blue
                className="w-5 h-5 cursor-pointer accent-blue-600 bg-gray-100 border-gray-300 rounded" 
              />
              <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors select-none">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">
            Max Price
          </h3>
          {/* Dynamic price display */}
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            ${maxPrice}
          </span>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="5000" 
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          // accent-blue-600 perfectly styles the slider thumb
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
        />
        
        <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
          <span>$0</span>
          <span>$5000+</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;