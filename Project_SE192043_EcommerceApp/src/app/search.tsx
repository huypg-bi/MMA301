import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '@/components/ProductCard';
import { SvgIcon } from '@/components/SvgIcon';
import { useCart } from '@/contexts/CartContext';
import { COLORS } from '@/styles/color';
import { searchStyles as styles, CARD_W } from '@/styles/search';
import type { Product } from '@/types';
import { api } from '@/utils/api';

const POPULAR_CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export default function SearchScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
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
        setRecentSearches((prev: string[]) => [q, ...prev.slice(0, 4)]);
      }
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [recentSearches]);

  const handleRecentSearch = (term: string) => {
    setQuery(term);
    handleSearch(term);
  };

  const handleCategorySearch = (cat: string) => {
    setQuery(cat);
    handleSearch(cat);
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
      <View style={styles.searchBar}>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
          <SvgIcon name="backward" width={22} height={22} color={COLORS.body} />
        </Pressable>
        <View style={styles.inputContainer}>
          <SvgIcon name="search" width={18} height={18} color={COLORS.placeholder} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="Search products..."
            placeholderTextColor={COLORS.placeholder}
            returnKeyType="search"
            onSubmitEditing={() => handleSearch(query)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Pressable onPress={clearSearch} hitSlop={8}>
              <SvgIcon name="close" width={18} height={18} color={COLORS.placeholder} />
            </Pressable>
          )}
        </View>
        {query.length > 0 && (
          <Pressable
            style={styles.searchBtn}
            onPress={() => handleSearch(query)}
          >
            <Text style={styles.searchBtnText}>Search</Text>
          </Pressable>
        )}
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.secondary} />
        </View>
      ) : !hasSearched ? (
        /* Pre-search state */
        <FlatList
          key="pre-search"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]}
          data={[]}
          ListHeaderComponent={
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Searches</Text>
                    <Pressable onPress={() => setRecentSearches([])}>
                      <Text style={styles.clearText}>Clear all</Text>
                    </Pressable>
                  </View>
                  <View style={styles.recentChipsRow}>
                    {recentSearches.map((term: string) => (
                      <Pressable
                        key={term}
                        style={styles.recentChip}
                        onPress={() => handleRecentSearch(term)}
                      >
                        <Text style={styles.recentChipText}>{term}</Text>
                        <Pressable
                          hitSlop={8}
                          onPress={() => setRecentSearches((prev: string[]) => prev.filter((t) => t !== term))}
                        >
                          <Text style={styles.recentChipDelete}>×</Text>
                        </Pressable>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}

              {/* Popular Categories */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular Categories</Text>
                <View style={styles.categoriesGrid}>
                  {POPULAR_CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat}
                      style={styles.categoryChip}
                      onPress={() => handleCategorySearch(cat)}
                    >
                      <Text style={styles.categoryChipText}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </>
          }
          renderItem={null}
        />
      ) : results.length === 0 ? (
        /* No results */
        <View style={styles.centered}>
          <SvgIcon name="search" width={48} height={48} color={COLORS.line} />
          <Text style={styles.noResultsTitle}>No results for "{query}"</Text>
          <Text style={styles.noResultsText}>Try different keywords or browse categories</Text>
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
        /* Results */
        <FlatList
          key="results"
          data={results}
          keyExtractor={(p) => `search-${p.id}`}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.resultCount}>{results.length} results for "{query}"</Text>
          }
          renderItem={({ item }) => (
            <ProductCard product={item} style={{ width: CARD_W }} onAddToCart={addItem} />
          )}
        />
      )}
    </View>
  );
}
