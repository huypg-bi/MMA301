import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getPersonDetails, getPersonCredits, getImageUrl } from '@/utils/api';
import { ArrowIcon, StarIcon } from '@/components/SvgIcons';
import { colors } from '@/styles/colors';
import { styles } from '@/styles/personDetail';
import type { Person, PersonCredit } from '@/utils/types';

function CreditCard({ credit }: { credit: PersonCredit }) {
  const router = useRouter();
  const posterUrl = getImageUrl(credit.poster_path, 'w342');
  const title = credit.title ?? credit.name ?? 'Unknown';
  const year = (credit.release_date ?? credit.first_air_date ?? '').substring(0, 4);

  const onPress = () => {
    if (credit.media_type === 'movie') {
      router.push(`/movie/${credit.id}` as any);
    }
  };

  return (
    <TouchableOpacity
      style={creditStyles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={creditStyles.imgWrap}>
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} style={creditStyles.img} resizeMode="cover" />
        ) : (
          <View style={creditStyles.noImg}>
            <Text style={creditStyles.noImgText}>No Image</Text>
          </View>
        )}
      </View>
      <Text style={creditStyles.title} numberOfLines={2}>{title}</Text>
      <View style={creditStyles.meta}>
        <StarIcon size={11} color={colors.orange} />
        <Text style={creditStyles.rating}>{(credit.vote_average ?? 0).toFixed(1)}</Text>
        {year ? <Text style={creditStyles.year}> · {year}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const creditStyles = StyleSheet.create({
  card: { width: 110, marginRight: 12 },
  imgWrap: {
    width: 110,
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    marginBottom: 6,
  },
  img: { width: '100%', height: '100%', resizeMode: 'cover' },
  noImg: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  noImgText: { color: colors.textMuted, fontSize: 10 },
  title: { color: colors.text, fontSize: 11, fontWeight: '600', lineHeight: 15 },
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  rating: { color: colors.orange, fontSize: 10, fontWeight: '600', marginLeft: 2 },
  year: { color: colors.textMuted, fontSize: 10 },
});

export default function PersonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const personId = Number(id);

  const [person, setPerson] = useState<Person | null>(null);
  const [credits, setCredits] = useState<PersonCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bioExpanded, setBioExpanded] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const [personData, creditsData] = await Promise.all([
        getPersonDetails(personId),
        getPersonCredits(personId),
      ]);
      setPerson(personData);
      setCredits(creditsData);
    } catch {
      setError('Failed to load person details');
    } finally {
      setLoading(false);
    }
  }, [personId]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  if (error || !person) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Person not found'}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backFallback}>
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const profileUrl = getImageUrl(person.profile_path, 'h632');
  const birthday = person.birthday
    ? new Date(person.birthday).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.header}>
          {profileUrl ? (
            <ExpoImage source={{ uri: profileUrl }} style={StyleSheet.absoluteFill} contentFit="cover" />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]} />
          )}
          <LinearGradient
            colors={['rgba(13,13,13,0.15)', colors.background]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.45 }}
            end={{ x: 0, y: 1 }}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.avatarWrap}>
            {profileUrl ? (
              <Image source={{ uri: profileUrl }} style={styles.avatar} resizeMode="cover" />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback]}>
                <Text style={styles.avatarInitial}>{person.name.charAt(0)}</Text>
              </View>
            )}
          </View>

          <Text style={styles.name}>{person.name}</Text>

          {person.known_for_department ? (
            <View style={styles.deptBadge}>
              <Text style={styles.deptText}>{person.known_for_department}</Text>
            </View>
          ) : null}

          <View style={styles.infoRow}>
            {birthday ? (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Born</Text>
                <Text style={styles.infoValue}>{birthday}</Text>
              </View>
            ) : null}
            {person.place_of_birth ? (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>From</Text>
                <Text style={styles.infoValue}>{person.place_of_birth}</Text>
              </View>
            ) : null}
          </View>

          {person.biography ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Biography</Text>
              <Text
                style={styles.bio}
                numberOfLines={bioExpanded ? undefined : 4}
              >
                {person.biography}
              </Text>
              <TouchableOpacity onPress={() => setBioExpanded((v) => !v)}>
                <Text style={styles.readMore}>
                  {bioExpanded ? 'Read less' : 'Read more'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {credits.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Known For</Text>
              <FlatList
                data={credits}
                keyExtractor={(item) => `${item.id}-${item.media_type}`}
                renderItem={({ item }) => <CreditCard credit={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listPad}
                scrollEnabled
              />
            </View>
          )}

          <View style={{ height: 32 }} />
        </View>
      </ScrollView>

      <SafeAreaView style={styles.navBar} edges={['top']}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
          <ArrowIcon size={32} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
