import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { searchMovies, getImageUrl } from '@/utils/api';
import { SearchBar } from '@/components/SearchBar';
import { StarIcon } from '@/components/SvgIcons';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { styles } from '@/styles/search';
import type { Movie } from '@/utils/types';

function MovieRow({ movie }: { movie: Movie }) {
  const router = useRouter();
  const posterUrl = getImageUrl(movie.poster_path, 'w185');
  const year = movie.release_date?.substring(0, 4) ?? '';

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => router.push(`/movie/${String(movie.id)}`)}
      activeOpacity={0.8}
    >
      <View style={styles.posterWrap}>
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} style={styles.poster} />
        ) : (
          <View style={styles.noPoster}>
            <Text style={styles.noPosterText}>N/A</Text>
          </View>
        )}
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {movie.title}
        </Text>
        <View style={styles.rowMeta}>
          <StarIcon size={12} color={colors.orange} />
          <Text style={styles.rowRating}>{movie.vote_average.toFixed(1)}</Text>
          {year ? <Text style={styles.rowYear}> · {year}</Text> : null}
        </View>
        <Text style={styles.rowOverview} numberOfLines={2}>
          {movie.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function EmptyState({ query }: { query: string }) {
  if (!query) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Find your movie</Text>
        <Text style={styles.emptySubtitle}>Search by title, actor, or genre</Text>
      </View>
    );
  }
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No results found</Text>
      <Text style={styles.emptySubtitle}>Try a different keyword</Text>
    </View>
  );
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (text: string) => {
    if (!text.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await searchMovies(text.trim());
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => doSearch(query), 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={typography.h2}>Search</Text>
      </View>
      <View style={styles.searchWrap}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search movies..."
          autoFocus={false}
        />
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.accent} size="large" />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <MovieRow movie={item} />}
          contentContainerStyle={results.length === 0 ? styles.listEmpty : styles.listContent}
          ListEmptyComponent={<EmptyState query={query} />}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
}
