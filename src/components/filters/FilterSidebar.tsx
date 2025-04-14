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

const FilterSidebar: React.FC<FilterSidebarProps> = ({ type, filters, onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const animeTypes = ['TV', 'Movie', 'OVA', 'Special', 'ONA', 'Music'];
  const mangaTypes = ['Manga', 'Novel', 'One-shot', 'Doujinshi', 'Manhwa', 'Manhua'];
  const statuses = ['Airing', 'Complete', 'Upcoming'];
  const ratings = ['G', 'PG', 'PG-13', 'R', 'R+', 'Rx'];

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
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
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
          <h3 className="text-lg font-medium mb-4 text-gray-300">Type</h3>
          <div className="space-y-3">
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
                  <div className={`w-5 h-5 border-2 rounded-full transition-colors ${filters.type === itemType ? 'border-blue-500 bg-blue-500' : 'border-gray-500 group-hover:border-gray-400'}`}>
                    {filters.type === itemType && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`ml-3 ${filters.type === itemType ? 'text-blue-400' : 'text-gray-300 group-hover:text-gray-200'}`}>
                  {itemType}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-300">Status</h3>
          <div className="space-y-3">
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
                  <div className={`w-5 h-5 border-2 rounded-full transition-colors ${filters.status === status ? 'border-blue-500 bg-blue-500' : 'border-gray-500 group-hover:border-gray-400'}`}>
                    {filters.status === status && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`ml-3 ${filters.status === status ? 'text-blue-400' : 'text-gray-300 group-hover:text-gray-200'}`}>
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>

        {type === 'anime' && (
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-300">Rating</h3>
            <div className="space-y-3">
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
                    <div className={`w-5 h-5 border-2 rounded-full transition-colors ${filters.rating === rating ? 'border-blue-500 bg-blue-500' : 'border-gray-500 group-hover:border-gray-400'}`}>
                      {filters.rating === rating && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`ml-3 ${filters.rating === rating ? 'text-blue-400' : 'text-gray-300 group-hover:text-gray-200'}`}>
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
          }}
          className="w-full py-3 mt-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300 text-gray-300 hover:text-white font-medium"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;