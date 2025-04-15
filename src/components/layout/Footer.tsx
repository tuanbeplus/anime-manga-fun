import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-400">
            Tuan Nguyen © {new Date().getFullYear()} Anime & Manga Fun App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;