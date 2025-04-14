import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimeDetails, getMangaDetails, Anime } from '../services/api';
import { useWishlist } from '../context/WishlistContext';
import DetailSkeleton from '../components/common/DetailSkeleton';

const DetailPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!type || !id) return;

      setLoading(true);
      setError(null);
      try {
        const response = type === 'anime' 
          ? await getAnimeDetails(parseInt(id))
          : await getMangaDetails(parseInt(id));
        setItem(response.data);
      } catch (err) {
        setError('Failed to fetch details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  const handleWishlistToggle = () => {
    if (!item) return;
    if (isInWishlist(item.mal_id)) {
      removeFromWishlist(item.mal_id);
    } else {
      addToWishlist(item);
    }
  };

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error || !item) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">{error || 'Item not found'}</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={item.images.jpg.large_image_url}
            alt={item.title}
            className="w-full rounded-lg shadow-lg"
          />
          <button
            onClick={handleWishlistToggle}
            className={`w-full mt-4 py-2 rounded transition-colors duration-300 ${
              isInWishlist(item.mal_id)
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isInWishlist(item.mal_id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-gray-400">Type</h3>
              <p>{item.type}</p>
            </div>
            <div>
              <h3 className="text-gray-400">Status</h3>
              <p>{item.status}</p>
            </div>
            {type === 'anime' && (
              <div>
                <h3 className="text-gray-400">Episodes</h3>
                <p>{item.episodes}</p>
              </div>
            )}
            <div>
              <h3 className="text-gray-400">Score</h3>
              <p>{item.score}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {item.genres.map((genre) => (
                <span
                  key={genre.name}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed">{item.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;