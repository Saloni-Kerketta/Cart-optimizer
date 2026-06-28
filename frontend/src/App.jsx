import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // <-- Import the Provider
import { AuthProvider } from './context/AuthContext'; // Or whatever the provider component is named in that file
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage'; // <-- We will build this next

function App() {
  return (
    // Wrap everything in CartProvider
    <AuthProvider>
    <CartProvider>
      <Router>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;