import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '@/styles/searchStyles';
import { WeatherResult, fetchWeatherData, getWeatherIconAsset } from '@/utils/weatherApi';
import { setWeatherData } from '@/utils/weatherStore';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<WeatherResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(text: string) {
    setQuery(text);
    setError('');
    setResult(null);
    if (timer.current) clearTimeout(timer.current);
    if (text.trim().length < 2) return;

    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherData(text.trim());
        setResult(data);
      } catch (e: any) {
        setError(e.message ?? 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }, 600);
  }

  function handleSelect(data: WeatherResult) {
    setWeatherData(data);
    router.back();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/Starry Mountain.png')}
        style={styles.bg}
        resizeMode="cover"
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search City</Text>
        </View>

        <View style={styles.searchBar}>
          <Image
            source={require('@/assets/svg/search.svg')}
            style={styles.searchIcon}
            contentFit="contain"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter city name..."
            placeholderTextColor="rgba(255,255,255,0.35)"
            value={query}
            onChangeText={handleChange}
            autoFocus
            returnKeyType="search"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => {
                setQuery('');
                setResult(null);
                setError('');
              }}
            >
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        )}

        {!loading && error !== '' && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && result && (
          <FlatList
            data={[result]}
            keyExtractor={() => result.current.city}
            renderItem={() => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelect(result)}
                activeOpacity={0.7}
              >
                <View style={styles.resultIconWrapper}>
                  <Image
                    source={getWeatherIconAsset(
                      result.current.conditionCode,
                      result.current.icon
                    )}
                    style={styles.resultIcon}
                    contentFit="contain"
                  />
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultCity}>{result.current.city}</Text>
                  <Text style={styles.resultCountry}>{result.current.country}</Text>
                </View>
                <Text style={styles.resultTemp}>{result.current.temperature}°</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {!loading && !result && error === '' && query.length < 2 && (
          <View style={styles.emptyState}>
            <Image
              source={require('@/assets/svg/search.svg')}
              style={styles.emptyIcon}
              contentFit="contain"
            />
            <Text style={styles.emptyText}>Type at least 2 characters to search</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
