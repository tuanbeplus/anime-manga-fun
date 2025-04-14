import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import MediaCard from '../components/common/MediaCard';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemoveAll = () => {
    if (window.confirm('Are you sure you want to remove all items from your wishlist?')) {
      wishlist.forEach((item) => removeFromWishlist(item.mal_id));
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-semibold mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-400">
          Start adding anime and manga to your wishlist to see them here!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Wishlist</h2>
        <button
          onClick={handleRemoveAll}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors duration-300"
        >
          Remove All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <MediaCard
            key={item.mal_id}
            item={item}
            type={item.type.toLowerCase().includes('manga') ? 'manga' : 'anime'}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage; 