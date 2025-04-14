import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MediaCard from '../components/common/MediaCard';
import { MediaCardSkeleton } from '../components/common/Skeleton';
import FilterSidebar from '../components/filters/FilterSidebar';
import Pagination from '../components/common/Pagination';
import { searchAnime, SearchFilters, Anime, SearchResponse } from '../services/api';

const AnimePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [pagination, setPagination] = useState<SearchResponse['pagination']>({
    last_visible_page: 1,
    has_next_page: false,
    current_page: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    type: string;
    status: string;
    rating: string;
    genres: string;
  }>({
    type: '',
    status: '',
    rating: '',
    genres: '',
  });

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = searchParams.get('q') || '';
        const response = await searchAnime(query, { ...filters, page: currentPage });
        setAnimeList(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError('Failed to fetch anime. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [searchParams, filters, currentPage]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-64">
        <FilterSidebar
          type="anime"
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <MediaCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : animeList.length === 0 ? (
          <div className="text-center p-4 text-gray-400">
            No anime found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {animeList.map((anime) => (
              <MediaCard key={anime.mal_id} item={anime} type="anime" />
            ))}
          </div>
        )}
        {!loading && !error && animeList.length > 0 && (
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_visible_page}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo(0, 0);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AnimePage;