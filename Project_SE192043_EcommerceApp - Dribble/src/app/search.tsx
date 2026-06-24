import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { type ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '@/components/ProductCard';
import { CARD_W, searchStyles as styles } from '@/styles/search';
import { THEME } from '@/styles/theme';
import type { Product } from '@/types';
import { api } from '@/utils/api';


type IoniconsName = ComponentProps<typeof Ionicons>['name'];

interface FilterChip {
  label: string;
  icon?: IoniconsName;
}

const FILTER_CHIPS: FilterChip[] = [
  { label: 'Filter', icon: 'options-outline' },
  { label: 'Ratings', icon: 'chevron-down-outline' },
  { label: 'Size', icon: 'chevron-down-outline' },
  { label: 'Color', icon: 'chevron-down-outline' },
  { label: 'Price', icon: 'chevron-down-outline' },
];

interface QuickCategory {
  id: string;
  label: string;
  icon: IoniconsName;
  query: string;
}

const QUICK_CATEGORIES: QuickCategory[] = [
  { id: 'bags', label: 'Bags', icon: 'bag-handle-outline', query: "women's clothing" },
  { id: 'wallets', label: 'Wallets', icon: 'wallet-outline', query: 'electronics' },
  { id: 'footwear', label: 'Footwear', icon: 'footsteps-outline', query: "men's clothing" },
  { id: 'clothes', label: 'Clothes', icon: 'shirt-outline', query: "women's clothing" },
  { id: 'watches', label: 'Watches', icon: 'watch-outline', query: 'jewelery' },
];

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      const q = searchQuery.trim();
      if (!q) {
        setResults([]);
        setHasSearched(false);
        return;
      }
      setIsLoading(true);
      setHasSearched(true);
      try {
        const prods = await api.searchProducts(q);
        setResults(prods);
        if (!recentSearches.includes(q)) {
          setRecentSearches((prev) => [q, ...prev.slice(0, 4)]);
        }
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [recentSearches],
  );

  const handleRecentPress = (term: string) => {
    setQuery(term);
    handleSearch(term);
  };

  const handleCategoryPress = (label: string) => {
    setQuery(label);
    handleSearch(label);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    inputRef.current?.focus();
  };

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      {/* Search Bar */}
      <View style={styles.searchBarRow}>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={THEME.colors.textPrimary} />
        </Pressable>
        <View style={styles.inputWrapper}>
          <Ionicons name="search-outline" size={18} color={THEME.colors.textMuted} />
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search Men's Fashion"
            placeholderTextColor={THEME.colors.textMuted}
            returnKeyType="search"
            onSubmitEditing={() => handleSearch(query)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Pressable onPress={clearSearch} hitSlop={8}>
              <Ionicons name="close-circle" size={17} color={THEME.colors.textMuted} />
            </Pressable>
          )}
        </View>
        {query.length > 0 && (
          <Pressable style={styles.searchBtn} onPress={() => handleSearch(query)}>
            <Text style={styles.searchBtnText}>Search</Text>
          </Pressable>
        )}
      </View>

      {/* Filter Chips */}
      <View style={styles.filterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChips}
        >
          {FILTER_CHIPS.map((chip) => {
            const isActive = activeFilter === chip.label;
            return (
              <Pressable
                key={chip.label}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setActiveFilter(isActive ? null : chip.label)}
              >
                {chip.label === 'Filter' && chip.icon && (
                  <Ionicons
                    name={chip.icon}
                    size={13}
                    color={isActive ? THEME.colors.white : THEME.colors.textPrimary}
                    style={{ marginRight: 3 }}
                  />
                )}
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {chip.label}
                </Text>
                {chip.label !== 'Filter' && chip.icon && (
                  <Ionicons
                    name={chip.icon}
                    size={12}
                    color={isActive ? THEME.colors.white : THEME.colors.textSecondary}
                    style={{ marginLeft: 2 }}
                  />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={THEME.colors.primary} />
        </View>
      ) : !hasSearched ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        >
          {/* Quick Category Icons */}
          <View style={styles.quickCatRow}>
            {QUICK_CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={styles.quickCatItem}
                onPress={() => handleCategoryPress(cat.label)}
              >
                <View style={styles.quickCatIcon}>
                  <Ionicons name={cat.icon} size={26} color={THEME.colors.textSecondary} />
                </View>
                <Text style={styles.quickCatLabel}>{cat.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                <Pressable onPress={() => setRecentSearches([])} hitSlop={8}>
                  <Text style={styles.clearAll}>Clear all</Text>
                </Pressable>
              </View>
              <View style={styles.recentChips}>
                {recentSearches.map((term) => (
                  <Pressable
                    key={term}
                    style={styles.recentChip}
                    onPress={() => handleRecentPress(term)}
                  >
                    <Ionicons name="time-outline" size={13} color={THEME.colors.textMuted} />
                    <Text style={styles.recentChipText}>{term}</Text>
                    <Pressable
                      hitSlop={8}
                      onPress={() =>
                        setRecentSearches((prev) => prev.filter((t) => t !== term))
                      }
                    >
                      <Ionicons name="close" size={14} color={THEME.colors.textMuted} />
                    </Pressable>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Popular Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <View style={styles.popularGrid}>
              {["men's clothing", "women's clothing", 'electronics', 'jewelery'].map((cat) => (
                <Pressable
                  key={cat}
                  style={styles.popularChip}
                  onPress={() => handleCategoryPress(cat)}
                >
                  <Text style={styles.popularChipText}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : results.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="search-outline" size={52} color={THEME.colors.border} />
          <Text style={styles.noResultTitle}>No results for "{query}"</Text>
          <Text style={styles.noResultSub}>Try different keywords or browse categories</Text>
          <Pressable
            style={styles.browseBtn}
            onPress={() => {
              clearSearch();
              router.push('/(tabs)/categories');
            }}
          >
            <Text style={styles.browseBtnText}>Browse Categories</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          key="results"
          data={results}
          keyExtractor={(p) => `search-${p.id}`}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={[styles.gridContent, { paddingBottom: insets.bottom + 20 }]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.resultCount}>
              {results.length} results for "{query}"
            </Text>
          }
          renderItem={({ item }) => (
            <ProductCard product={item} style={{ width: CARD_W }} />
          )}
        />
      )}
    </View>
  );
}
