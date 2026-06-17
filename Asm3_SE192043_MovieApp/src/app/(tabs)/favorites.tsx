import { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { getFavorites, removeFavorite } from '@/utils/storage';
import { getImageUrl } from '@/utils/api';
import { StarIcon, HeartIcon } from '@/components/SvgIcons';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { styles } from '@/styles/favorites';
import type { Movie } from '@/utils/types';

function FavoriteCard({ movie, onRemove }: { movie: Movie; onRemove: () => void }) {
  const router = useRouter();
  const posterUrl = getImageUrl(movie.poster_path, 'w342');
  const year = movie.release_date?.substring(0, 4) ?? '';

  const handleRemove = () => {
    Alert.alert(
      'Remove Favorite',
      `Remove "${movie.title}" from your favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: onRemove },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/movie/${String(movie.id)}`)}
      activeOpacity={0.85}
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
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {movie.title}
        </Text>
        <View style={styles.metaRow}>
          <StarIcon size={12} color={colors.orange} />
          <Text style={styles.ratingText}>{movie.vote_average.toFixed(1)}</Text>
          {year ? <Text style={styles.yearText}> · {year}</Text> : null}
        </View>
        <Text style={styles.overview} numberOfLines={2}>
          {movie.overview}
        </Text>
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={handleRemove} hitSlop={8}>
        <HeartIcon color={colors.accent} size={20} filled />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function EmptyFavorites() {
  return (
    <View style={styles.emptyContainer}>
      <HeartIcon color={colors.textMuted} size={56} />
      <Text style={styles.emptyTitle}>No favorites yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the heart on any movie to save it here
      </Text>
    </View>
  );
}

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setFavorites);
    }, [])
  );

  const handleRemove = async (movieId: number) => {
    await removeFavorite(movieId);
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={typography.h2}>My Favorites</Text>
        {favorites.length > 0 && (
          <Text style={styles.count}>{favorites.length} movies</Text>
        )}
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteCard movie={item} onRemove={() => handleRemove(item.id)} />
        )}
        contentContainerStyle={
          favorites.length === 0 ? styles.listEmpty : styles.listContent
        }
        ListEmptyComponent={<EmptyFavorites />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}
