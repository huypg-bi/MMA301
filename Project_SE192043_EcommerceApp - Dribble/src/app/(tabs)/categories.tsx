import { Ionicons } from '@expo/vector-icons';
import { type ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { CARD_W, categoriesStyles as styles } from '@/styles/categories';
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
  { label: 'Price', icon: 'chevron-down-outline' },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);

  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    api
      .getProducts()
      .then((prods) => {
        setAllProducts(prods);
        setResults(prods);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleSearch = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) {
        setResults(allProducts);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      try {
        const prods = await api.searchProducts(trimmed);
        setResults(prods);
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [allProducts],
  );

  const clearSearch = () => {
    setQuery('');
    setResults(allProducts);
  };

  const handleFilterPress = (label: string) => {
    if (label === 'Filter') {
      setActiveFilter(null);
    } else {
      setActiveFilter((prev) => (prev === label ? null : label));
    }
  };

  const displayResults = useMemo(() => {
    let filtered = [...results];
    if (activeFilter === 'Ratings') {
      filtered = filtered.filter((p) => p.rating.rate >= 4);
    } else if (activeFilter === 'Price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }
    return filtered;
  }, [results, activeFilter]);

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      {/* Search Bar */}
      <View style={styles.searchBarRow}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search-outline" size={18} color={THEME.colors.textMuted} />
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Men's Fashion"
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
                onPress={() => handleFilterPress(chip.label)}
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

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={THEME.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={displayResults}
          keyExtractor={(p) => `explore-${p.id}`}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={[styles.gridContent, { paddingBottom: insets.bottom + 20 }]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            isSearching ? (
              <View style={styles.searchingRow}>
                <ActivityIndicator size="small" color={THEME.colors.primary} />
              </View>
            ) : (
              <Text style={styles.resultCount}>{results.length} Products</Text>
            )
          }
          renderItem={({ item }) => <ProductCard product={item} style={{ width: CARD_W }} />}
          ListEmptyComponent={
            !isSearching ? (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={52} color={THEME.colors.border} />
                <Text style={styles.emptyTitle}>No results found</Text>
                <Text style={styles.emptySub}>Try different keywords</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}
