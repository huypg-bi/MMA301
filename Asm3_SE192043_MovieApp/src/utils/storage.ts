import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from './types';

const FAVORITES_KEY = '@movieapp_favorites';

export const getFavorites = async (): Promise<Movie[]> => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? (JSON.parse(json) as Movie[]) : [];
  } catch {
    return [];
  }
};

export const addFavorite = async (movie: Movie): Promise<void> => {
  const favorites = await getFavorites();
  if (!favorites.find((m) => m.id === movie.id)) {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, movie]));
  }
};

export const removeFavorite = async (movieId: number): Promise<void> => {
  const favorites = await getFavorites();
  const updated = favorites.filter((m) => m.id !== movieId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const isFavorite = async (movieId: number): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some((m) => m.id === movieId);
};

export const toggleFavorite = async (movie: Movie): Promise<boolean> => {
  const fav = await isFavorite(movie.id);
  if (fav) {
    await removeFavorite(movie.id);
    return false;
  } else {
    await addFavorite(movie);
    return true;
  }
};
