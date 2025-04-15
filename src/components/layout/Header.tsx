import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-bold">
            Anime/Manga Fun
          </Link>
        </div>
          
        <nav className="flex items-center space-x-8">
          <Link 
            to="/" 
            className={`hover:text-gray-300 transition-colors py-2 ${location.pathname === '/anime' || location.pathname === '/' ? 'text-blue-400 font-semibold border-b-2 border-blue-400' : ''}`}
          >
            Anime
          </Link>
          <Link 
            to="/manga" 
            className={`hover:text-gray-300 transition-colors py-2 ${location.pathname === '/manga' ? 'text-blue-400 font-semibold border-b-2 border-blue-400' : ''}`}
          >
            Manga
          </Link>
          <Link 
            to="/wishlist" 
            className={`hover:text-gray-300 transition-colors py-2 ${location.pathname === '/wishlist' ? 'text-blue-400 font-semibold border-b-2 border-blue-400' : ''}`}
          >
            Wishlist
          </Link>
        </nav>
        
        <div className="flex items-center">
          <img
            src="/avatar.jpeg"
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-600 hover:border-blue-400 transition-colors duration-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;