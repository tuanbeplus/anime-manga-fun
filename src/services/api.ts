import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

export interface SearchFilters {
  type?: string;
  status?: string;
  rating?: string;
  genres?: string;
  page?: number;
}

export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  type: string;
  episodes: number;
  status: string;
  score: number;
  genres: Array<{
    name: string;
  }>;
}

export interface SearchResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
  };
}

export const searchAnime = async (query: string, filters: SearchFilters = {}): Promise<SearchResponse> => {
  try {
    const params = new URLSearchParams({
      q: query,
      page: filters.page?.toString() || '1',
      ...(filters.type && { type: filters.type }),
      ...(filters.status && { status: filters.status }),
      ...(filters.rating && { rating: filters.rating }),
      ...(filters.genres && { genres: filters.genres }),
    });

    const response = await axios.get(`${BASE_URL}/anime?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

export const getAnimeDetails = async (id: number): Promise<{ data: Anime }> => {
  try {
    const response = await axios.get(`${BASE_URL}/anime/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};

export const searchManga = async (query: string, filters: SearchFilters = {}): Promise<SearchResponse> => {
  try {
    const params = new URLSearchParams({
      q: query,
      page: filters.page?.toString() || '1',
      ...(filters.type && { type: filters.type }),
      ...(filters.status && { status: filters.status }),
      ...(filters.genres && { genres: filters.genres }),
    });

    const response = await axios.get(`${BASE_URL}/manga?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error searching manga:', error);
    throw error;
  }
};

export const getMangaDetails = async (id: number): Promise<{ data: Anime }> => {
  try {
    const response = await axios.get(`${BASE_URL}/manga/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching manga details:', error);
    throw error;
  }
}; 