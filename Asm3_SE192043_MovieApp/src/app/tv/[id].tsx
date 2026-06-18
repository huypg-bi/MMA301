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
  getTVDetails,
  getTVVideos,
  getTVCredits,
  getSimilarTV,
  getImageUrl,
} from '@/utils/api';
import { toggleFavorite, isFavorite } from '@/utils/storage';
import { ArrowIcon, DotsIcon, StarIcon, HeartIcon } from '@/components/SvgIcons';
import { MovieCard } from '@/components/MovieCard';
import { colors } from '@/styles/colors';
import { styles } from '@/styles/movieDetail';
import type { Cast, Movie, TVShow, Video } from '@/utils/types';

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

function tvShowToMovie(show: TVShow): Movie {
  return {
    id: show.id,
    title: show.name,
    original_title: show.original_name,
    overview: show.overview,
    poster_path: show.poster_path,
    backdrop_path: show.backdrop_path,
    release_date: show.first_air_date,
    vote_average: show.vote_average,
    vote_count: show.vote_count,
    genres: show.genres,
    tagline: show.tagline,
  };
}

export default function TVDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const tvId = Number(id);

  const [show, setShow] = useState<TVShow | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [similar, setSimilar] = useState<TVShow[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorited, setFavorited] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const [showData, castData, videoData, similarData, fav] = await Promise.all([
        getTVDetails(tvId),
        getTVCredits(tvId),
        getTVVideos(tvId),
        getSimilarTV(tvId),
        isFavorite(tvId),
      ]);
      setShow(showData);
      setCast(castData);
      setVideos(videoData);
      setSimilar(similarData);
      setFavorited(fav);
    } catch {
      setError('Failed to load TV show details');
    } finally {
      setLoading(false);
    }
  }, [tvId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleFavorite = async () => {
    if (!show) return;
    const nowFav = await toggleFavorite(tvShowToMovie(show));
    setFavorited(nowFav);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  if (error || !show) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'TV show not found'}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backFallback}>
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const trailerKey = videos[0]?.key ?? null;
  const backdropUrl = getImageUrl(show.backdrop_path, 'w780') ?? getImageUrl(show.poster_path, 'w500');
  const year = show.first_air_date?.substring(0, 4) ?? '';
  const seasons = show.number_of_seasons
    ? `${show.number_of_seasons} Season${show.number_of_seasons > 1 ? 's' : ''}`
    : null;
  const epRuntime = show.episode_run_time?.[0]
    ? `~${show.episode_run_time[0]}m / ep`
    : null;
  const starsCount = Math.round(show.vote_average / 2);

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
            {show.genres?.slice(0, 3).map((g) => (
              <View key={g.id} style={styles.badge}>
                <Text style={styles.badgeText}>{g.name}</Text>
              </View>
            ))}
            {seasons ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{seasons}</Text>
              </View>
            ) : null}
            {epRuntime ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{epRuntime}</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.title}>{show.name}</Text>

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
            <Text style={styles.ratingNum}>{show.vote_average.toFixed(1)}</Text>
            <Text style={styles.voteCount}>({show.vote_count.toLocaleString()})</Text>
          </View>

          {show.tagline ? (
            <Text style={styles.tagline}>"{show.tagline}"</Text>
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
            <Text style={styles.overview}>{show.overview}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>IMDb Rating</Text>
            <RatingBar value={show.vote_average} />
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
                renderItem={({ item }) => <MovieCard item={item} mediaType="tv" />}
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
