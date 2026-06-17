import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import { getTrending, getMovieVideos, getImageUrl } from '@/utils/api';
import { MovieCard } from '@/components/MovieCard';
import { StarIcon } from '@/components/SvgIcons';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { styles, VIDEO_HEIGHT } from '@/styles/home';
import type { TrendingItem } from '@/utils/types';

function HeroCard({ item, trailerKey }: { item: TrendingItem; trailerKey: string | null }) {
  const router = useRouter();
  const title = item.title ?? item.name ?? 'Unknown';
  const year = (item.release_date ?? item.first_air_date ?? '').substring(0, 4);
  const isMovie = !item.media_type || item.media_type === 'movie';
  const posterUrl = getImageUrl(item.poster_path, 'w500');

  const onWatchNow = () => {
    if (isMovie) router.push(`/movie/${String(item.id)}`);
  };

  return (
    <View>
      <View style={styles.heroMedia}>
        {trailerKey ? (
          <YoutubePlayer
            height={VIDEO_HEIGHT}
            play={false}
            videoId={trailerKey}
            webViewProps={{ androidLayerType: 'hardware' }}
          />
        ) : posterUrl ? (
          <Image
            source={{ uri: posterUrl }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        ) : (
          <View style={styles.heroFallbackBg} />
        )}
      </View>

      <View style={styles.heroInfo}>
        <View style={styles.heroMeta}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {item.media_type === 'tv' ? 'TV Series' : 'Movie'}
            </Text>
          </View>
          {year ? <Text style={styles.yearText}>{year}</Text> : null}
        </View>
        <Text style={styles.heroTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.heroRating}>
          <StarIcon size={14} color={colors.orange} />
          <Text style={styles.ratingText}>{item.vote_average.toFixed(1)}</Text>
        </View>
        {isMovie && (
          <TouchableOpacity style={styles.watchBtn} onPress={onWatchNow}>
            <Text style={styles.watchBtnText}>Watch Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [heroTrailerKey, setHeroTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await getTrending();
      setTrending(data);

      const hero = data[0];
      if (hero && (hero.media_type === 'movie' || !hero.media_type)) {
        getMovieVideos(hero.id)
          .then((vids) => {
            if (vids.length > 0) setHeroTrailerKey(vids[0].key);
          })
          .catch(() => {});
      }
    } catch (e) {
      console.error('[Home] loadTrending error:', e);
      setError('Failed to load trending movies');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setHeroTrailerKey(null);
    setRefreshing(true);
    load();
  };

  const hero = trending[0];
  const trendingMovies = trending.filter(
    (item) => item.media_type === 'movie' || !item.media_type
  );
  const trendingTV = trending.filter((item) => item.media_type === 'tv');

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={load}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
          />
        }
      >
        {hero && <HeroCard item={hero} trailerKey={heroTrailerKey} />}

        <SafeAreaView edges={['left', 'right']} style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={typography.h3}>Trending Today</Text>
          </View>
          <FlatList
            data={trending}
            keyExtractor={(item) => `${item.id}-${item.media_type}`}
            renderItem={({ item }) => <MovieCard item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listPad}
          />

          {trendingMovies.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={typography.h3}>Popular Movies</Text>
              </View>
              <FlatList
                data={trendingMovies}
                keyExtractor={(item) => `movie-${item.id}`}
                renderItem={({ item }) => <MovieCard item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listPad}
              />
            </>
          )}

          {trendingTV.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={typography.h3}>Trending TV</Text>
              </View>
              <FlatList
                data={trendingTV}
                keyExtractor={(item) => `tv-${item.id}`}
                renderItem={({ item }) => <MovieCard item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listPad}
              />
            </>
          )}
          <View style={styles.listBottom} />
        </SafeAreaView>
      </ScrollView>

      <SafeAreaView edges={['top']} style={[styles.topBar, { pointerEvents: 'box-none' } as any]}>
        <Text style={styles.appTitle}>MovieApp</Text>
      </SafeAreaView>
    </View>
  );
}
