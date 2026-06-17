import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  getImageUrl,
} from '@/utils/api';
import { toggleFavorite, isFavorite } from '@/utils/storage';
import { ArrowIcon, DotsIcon, StarIcon, HeartIcon } from '@/components/SvgIcons';
import { MovieCard } from '@/components/MovieCard';
import { colors } from '@/styles/colors';
import { styles } from '@/styles/movieDetail';
import type { Cast, Movie, Video } from '@/utils/types';

function CastCard({ cast }: { cast: Cast }) {
  const router = useRouter();
  const profileUrl = getImageUrl(cast.profile_path, 'w185');
  return (
    <TouchableOpacity
      style={styles.castCard}
      activeOpacity={0.8}
      onPress={() => router.push({ pathname: '/person/[id]', params: { id: cast.id } } as any)}
    >
      <View style={styles.castImgWrap}>
        {profileUrl ? (
          <Image source={{ uri: profileUrl }} style={styles.castImg} />
        ) : (
          <View style={styles.castNoImg}>
            <Text style={styles.castInitial}>
              {cast.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.castName} numberOfLines={2}>
        {cast.name}
      </Text>
      <Text style={styles.castRole} numberOfLines={1}>
        {cast.character}
      </Text>
    </TouchableOpacity>
  );
}

function RatingBar({ value }: { value: number }) {
  const pct = (value / 10) * 100;
  return (
    <View style={styles.ratingBarWrap}>
      <View style={styles.ratingBarBg}>
        <View style={[styles.ratingBarFill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.ratingBarLabel}>{value.toFixed(1)} / 10</Text>
    </View>
  );
}

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const movieId = Number(id);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorited, setFavorited] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const [movieData, castData, videoData, similarData, fav] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
        getMovieVideos(movieId),
        getSimilarMovies(movieId),
        isFavorite(movieId),
      ]);
      setMovie(movieData);
      setCast(castData);
      setVideos(videoData);
      setSimilar(similarData);
      setFavorited(fav);
    } catch {
      setError('Failed to load movie details');
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleFavorite = async () => {
    if (!movie) return;
    const nowFav = await toggleFavorite(movie);
    setFavorited(nowFav);
  };


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Movie not found'}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backFallback}>
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const trailerKey = videos[0]?.key ?? null;
  const backdropUrl = getImageUrl(movie.backdrop_path, 'w780') ?? getImageUrl(movie.poster_path, 'w500');
  const year = movie.release_date?.substring(0, 4) ?? '';
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;
  const starsCount = Math.round(movie.vote_average / 2);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {trailerKey ? (
          <View style={styles.videoContainer}>
            <YoutubePlayer
              height={styles.videoContainer.height as number}
              play={false}
              videoId={trailerKey}
              webViewProps={{ androidLayerType: 'hardware' }}
            />
          </View>
        ) : (
          <View style={styles.backdrop}>
            {backdropUrl ? (
              <ExpoImage
                source={{ uri: backdropUrl }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            ) : (
              <View style={styles.backdropFallbackBg} />
            )}
            <LinearGradient
              colors={['transparent', 'rgba(13,13,13,0.6)', colors.background]}
              style={styles.absoluteFill}
              start={{ x: 0, y: 0.35 }}
              end={{ x: 0, y: 1 }}
            />
          </View>
        )}

        <View style={trailerKey ? styles.contentFlat : styles.content}>
          <View style={styles.badges}>
            {year ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{year}</Text>
              </View>
            ) : null}
            {movie.genres?.slice(0, 3).map((g) => (
              <View key={g.id} style={styles.badge}>
                <Text style={styles.badgeText}>{g.name}</Text>
              </View>
            ))}
            {runtime ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{runtime}</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.title}>{movie.title}</Text>

          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon
                  key={i}
                  size={16}
                  color={i <= starsCount ? colors.orange : colors.textMuted}
                />
              ))}
            </View>
            <Text style={styles.ratingNum}>{movie.vote_average.toFixed(1)}</Text>
            <Text style={styles.voteCount}>({movie.vote_count.toLocaleString()})</Text>
          </View>

          {movie.tagline ? (
            <Text style={styles.tagline}>"{movie.tagline}"</Text>
          ) : null}

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.favBtn, favorited && styles.favBtnActive]}
              onPress={handleFavorite}
              activeOpacity={0.8}
            >
              <HeartIcon color={favorited ? colors.accent : colors.text} size={20} filled={favorited} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>IMDb Rating</Text>
            <RatingBar value={movie.vote_average} />
          </View>

          {cast.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>The Cast</Text>
              <FlatList
                data={cast}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <CastCard cast={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.castListPad}
                scrollEnabled
              />
            </View>
          )}

          {similar.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Maybe You Like</Text>
                <Text style={styles.seeAll}>See all</Text>
              </View>
              <FlatList
                data={similar}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <MovieCard item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.castListPad}
                scrollEnabled
              />
            </View>
          )}

          <View style={styles.bottomPad} />
        </View>
      </ScrollView>

      <SafeAreaView style={styles.navBar} edges={['top']}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
          <ArrowIcon size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={handleFavorite}>
          <DotsIcon size={32} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
