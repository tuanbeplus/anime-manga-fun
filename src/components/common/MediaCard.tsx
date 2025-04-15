import React from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../../services/api';
import { useWishlist } from '../../context/WishlistContext';

interface MediaCardProps {
  item: Anime;
  type: 'anime' | 'manga';
}

const MediaCard: React.FC<MediaCardProps> = ({ item, type }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isInWishlistState = isInWishlist(item.mal_id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlistState) {
      removeFromWishlist(item.mal_id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <Link to={`/${type}/${item.mal_id}`} className="block h-full">
      <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.04] h-full flex flex-col">
        <div className="relative flex-shrink-0">
          <img
            src={item.images.jpg.large_image_url}
            alt={item.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-300"
            aria-label={isInWishlistState ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg
              className={`w-6 h-6 ${isInWishlistState ? 'text-red-500' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 flex-grow">{item.title}</h3>
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>{item.type}</span>
            <span className="flex items-center">
              <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {item.score}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;