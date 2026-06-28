import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-12 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold text-white mb-2">MyStore</p>
        <p className="text-sm">
          Made with ❤️ by Aditya, Sudhanshu, and Saloni
        </p>
        <p className="text-xs mt-4">
          &copy; {new Date().getFullYear()} Smart-Cart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;