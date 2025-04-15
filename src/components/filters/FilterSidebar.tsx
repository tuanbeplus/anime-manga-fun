import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface FilterSidebarProps {
  type: 'anime' | 'manga';
  filters: {
    type: string;
    status: string;
    rating: string;
    genres: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

const ToggleButton: React.FC<{ isOpen: boolean; onClick: () => void }> = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-4 right-4 z-50 md:hidden bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    </svg>
  </button>)

const FilterSidebar: React.FC<FilterSidebarProps> = ({ type, filters, onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const animeTypes = ['TV', 'Movie', 'OVA', 'Special', 'ONA', 'Music'];
  const mangaTypes = ['Manga', 'Novel', 'One-shot', 'Doujinshi', 'Manhwa', 'Manhua'];
  const statuses = ['Airing', 'Complete', 'Upcoming'];
  const ratings = ['G', 'PG', 'PG-13', 'R', 'R+', 'Rx'];
  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life',
    'Sports', 'Supernatural', 'Thriller'
  ];

  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchValue) {
      setSearchParams({ q: searchValue });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
      <div className={`bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg fixed md:static inset-y-0 left-0 w-64 md:w-auto z-50 transition-transform duration-300 transform md:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto md:overflow-visible`}>
      <h2 className="text-xl font-semibold mb-6 text-blue-400">Filters</h2>
      
      <div className="mb-6">
        <div className="relative flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Enter name..."
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearchSubmit}
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Search
          </button>
        </div>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-m font-bold mb-4 text-gray-300">Type</h3>
          <div className="space-y-2">
            {(type === 'anime' ? animeTypes : mangaTypes).map((itemType) => (
              <label key={itemType} className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="type"
                    value={itemType}
                    checked={filters.type === itemType}
                    onChange={(e) => onFilterChange('type', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 rounded-full transition-colors ${filters.type === itemType ? 'border-blue-500 bg-blue-500' : 'border-gray-500 group-hover:border-gray-400'}`}>
                    {filters.type === itemType && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`ml-3 text-sm ${filters.type === itemType ? 'text-blue-400' : 'text-gray-300 group-hover:text-gray-200'}`}>
                  {itemType}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-m font-bold mb-4 text-gray-300">Status</h3>
          <div className="space-y-2">
            {statuses.map((status) => (
              <label key={status} className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={filters.status === status}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 rounded-full transition-colors ${filters.status === status ? 'border-blue-500 bg-blue-500' : 'border-gray-500 group-hover:border-gray-400'}`}>
                    {filters.status === status && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`ml-3 text-sm ${filters.status === status ? 'text-blue-400' : 'text-gray-300 group-hover:text-gray-200'}`}>
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-m font-bold mb-4 text-gray-300">Genres</h3>
          <div className="space-y-2">
            {genres.map((genre) => (
              <label key={genre} className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="genres"
                    value={genre}
                    checked={filters.genres === genre}
                    onChange={(e) => onFilterChange('genres', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 rounded-full transition-colors ${filters.genres === genre ? 'border-blue-500 bg-blue-500' : 'border-gray-500 group-hover:border-gray-400'}`}>
                    {filters.genres === genre && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`ml-3 text-sm ${filters.genres === genre ? 'text-blue-400' : 'text-gray-300 group-hover:text-gray-200'}`}>
                  {genre}
                </span>
              </label>
            ))}
          </div>
        </div>

        {(type === 'anime' || type === 'manga') && (
          <div>
            <h3 className="text-m font-bold mb-4 text-gray-300">Rating</h3>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <label key={rating} className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={filters.rating === rating}
                      onChange={(e) => onFilterChange('rating', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border-2 rounded-full transition-colors ${filters.rating === rating ? 'border-blue-500 bg-blue-500' : 'border-gray-500 group-hover:border-gray-400'}`}>
                      {filters.rating === rating && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`ml-3 text-sm ${filters.rating === rating ? 'text-blue-400' : 'text-gray-300 group-hover:text-gray-200'}`}>
                    {rating}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            onFilterChange('type', '');
            onFilterChange('status', '');
            onFilterChange('rating', '');
            onFilterChange('genres', '');
          }}
          className="w-full py-3 mt-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300 text-gray-300 hover:text-white font-bold"
        >
          Clear Filters
        </button>
      </div>
    </div>
    <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
};

export default FilterSidebar;