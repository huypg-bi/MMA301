import { Cast, Movie, Person, PersonCredit, TrendingItem, TVShow, Video } from './types';

const BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL!;
const IMAGE_BASE_URL = process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL!;
const TOKEN = process.env.EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN!;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

export const getImageUrl = (path: string | null, size: string = 'w500'): string | null => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getTrending = async (): Promise<TrendingItem[]> => {
  const res = await fetch(`${BASE_URL}/trending/all/day?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch trending');
  const data = await res.json();
  return data.results as TrendingItem[];
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US`,
    { headers }
  );
  if (!res.ok) throw new Error('Failed to search movies');
  const data = await res.json();
  return data.results as Movie[];
};

export const getMovieDetails = async (id: number): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json() as Promise<Movie>;
};

export const getMovieVideos = async (id: number): Promise<Video[]> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch movie videos');
  const data = await res.json();
  return (data.results as Video[]).filter(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  );
};

export const getMovieCredits = async (id: number): Promise<Cast[]> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch movie credits');
  const data = await res.json();
  return (data.cast as Cast[]).slice(0, 10);
};

export const getSimilarMovies = async (id: number): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch similar movies');
  const data = await res.json();
  return (data.results as Movie[]).slice(0, 10);
};

export const getTVDetails = async (id: number): Promise<TVShow> => {
  const res = await fetch(`${BASE_URL}/tv/${id}?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch TV details');
  return res.json() as Promise<TVShow>;
};

export const getTVVideos = async (id: number): Promise<Video[]> => {
  const res = await fetch(`${BASE_URL}/tv/${id}/videos?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch TV videos');
  const data = await res.json();
  return (data.results as Video[]).filter(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  );
};

export const getTVCredits = async (id: number): Promise<Cast[]> => {
  const res = await fetch(`${BASE_URL}/tv/${id}/credits?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch TV credits');
  const data = await res.json();
  return (data.cast as Cast[]).slice(0, 10);
};

export const getSimilarTV = async (id: number): Promise<TVShow[]> => {
  const res = await fetch(`${BASE_URL}/tv/${id}/similar?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch similar TV');
  const data = await res.json();
  return (data.results as TVShow[]).slice(0, 10);
};

export const getPersonDetails = async (id: number): Promise<Person> => {
  const res = await fetch(`${BASE_URL}/person/${id}?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch person details');
  return res.json() as Promise<Person>;
};

export const getPersonCredits = async (id: number): Promise<PersonCredit[]> => {
  const res = await fetch(`${BASE_URL}/person/${id}/combined_credits?language=en-US`, { headers });
  if (!res.ok) throw new Error('Failed to fetch person credits');
  const data = await res.json();
  return (data.cast as PersonCredit[])
    .filter((c) => c.poster_path)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 20);
};
