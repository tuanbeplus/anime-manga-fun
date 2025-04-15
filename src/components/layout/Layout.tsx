import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 flex-grow w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;