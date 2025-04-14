import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AnimePage from './pages/AnimePage';
import MangaPage from './pages/MangaPage';
import WishlistPage from './pages/WishlistPage';
import DetailPage from './pages/DetailPage';
import { WishlistProvider } from './context/WishlistContext';

const App: React.FC = () => {
  return (
    <Router>
      <WishlistProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<AnimePage />} />
            <Route path="/anime" element={<AnimePage />} />
            <Route path="/manga" element={<MangaPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/:type/:id" element={<DetailPage />} />
          </Routes>
        </Layout>
      </WishlistProvider>
    </Router>
  );
};

export default App; 