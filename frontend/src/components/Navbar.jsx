import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; 

const Navbar = () => {
  // Pull the real, dynamic cart count from our Context
  const { cartCount } = useCart();
  
  // Pull the user state and logout function from AuthContext
  const { userId, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle the logout click
  const handleLogout = () => {
    setUserId(null); // Clears the context
    localStorage.removeItem('token'); // Clears the browser storage
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* --- LEFT SIDE: Logo & Home --- */}
        <div className="flex items-center gap-8">
          {/* Brand / Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            MyStore
          </Link>

          {/* Home Link */}
          <Link to="/" className="hidden md:block text-gray-300 hover:text-white transition-colors font-medium">
            Home
          </Link>
        </div>

        {/* --- RIGHT SIDE: Cart & Auth Buttons --- */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors flex items-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {/* Cart Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          <div className="flex space-x-3">
            {userId ? (
              <button 
                onClick={handleLogout}
                className="px-4 py-2 border border-gray-600 bg-red-700 text-gray-300 rounded hover:bg-gray-400 hover:text-white transition-colors font-medium cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 hover:text-white transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;