import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/colors';
import { styles } from '@/styles/movieCard';
import { StarIcon } from '@/components/SvgIcons';
import { getImageUrl } from '@/utils/api';
import { Movie, TrendingItem } from '@/utils/types';

type Props = {
  item: Movie | TrendingItem;
};

function getTitle(item: Movie | TrendingItem): string {
  if ('title' in item && item.title) return item.title;
  if ('name' in item && item.name) return item.name;
  return 'Unknown';
}

function getYear(item: Movie | TrendingItem): string {
  const date = (item as Movie).release_date || (item as TrendingItem).first_air_date;
  return date ? date.substring(0, 4) : '';
}

export function MovieCard({ item }: Props) {
  const router = useRouter();
  const mediaType = (item as TrendingItem).media_type;
  const isMovie = !mediaType || mediaType === 'movie';

  const onPress = () => {
    if (isMovie) {
      router.push(`/movie/${String(item.id)}`);
    }
  };

  const posterUrl = getImageUrl(item.poster_path, 'w342');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageWrapper}>
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} style={styles.poster} />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {getTitle(item)}
        </Text>
        <View style={styles.metaRow}>
          <StarIcon size={12} color={colors.orange} />
          <Text style={styles.rating}>{item.vote_average.toFixed(1)}</Text>
          {getYear(item) ? <Text style={styles.year}> · {getYear(item)}</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
