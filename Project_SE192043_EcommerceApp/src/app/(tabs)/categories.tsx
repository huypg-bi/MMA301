import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { SvgIcon } from '@/components/SvgIcon';
import { useCart } from '@/contexts/CartContext';
import { COLORS } from '@/styles/color';
import { categoriesStyles as styles, CARD_W } from '@/styles/categories';
import type { Category, Product } from '@/types';
import { api } from '@/utils/api';

const SORT_OPTIONS = ['Default', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

export default function CategoriesScreen() {
  const { category: paramCategory } = useLocalSearchParams<{ category?: string }>();
  const { addItem } = useCart();
  const insets = useSafeAreaInsets();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('Default');
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setDisplayProducts(prods);
        setCategories(cats);
        if (paramCategory) {
          setActiveCategory(paramCategory);
          setDisplayProducts(prods.filter((p) => p.category === paramCategory));
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [paramCategory]);

  const handleCategoryChange = useCallback(async (cat: string) => {
    setActiveCategory(cat);
    setIsLoading(true);
    try {
      const prods = cat === 'all' ? await api.getProducts() : await api.getProductsByCategory(cat);
      setProducts(prods);
      applySort(prods, sortBy);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [sortBy]);

  const applySort = useCallback((prods: Product[], sort: string) => {
    const sorted = [...prods];
    if (sort === 'Price: Low to High') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'Price: High to Low') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'Top Rated') sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    setDisplayProducts(sorted);
  }, []);

  const handleSort = useCallback((sort: string) => {
    setSortBy(sort);
    setShowSort(false);
    applySort(products, sort);
  }, [products, applySort]);

  if (error) {
    return (
      <View style={styles.flex}>
        <Header title="Categories" />
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <Header title="Categories" />

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
        contentContainerStyle={styles.categoryTabsContent}
      >
        <Pressable
          style={[styles.catTab, activeCategory === 'all' && styles.catTabActive]}
          onPress={() => handleCategoryChange('all')}
        >
          <Text style={[styles.catTabText, activeCategory === 'all' && styles.catTabTextActive]}>
            All
          </Text>
        </Pressable>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.catTab, activeCategory === cat && styles.catTabActive]}
            onPress={() => handleCategoryChange(cat)}
          >
            <Text style={[styles.catTabText, activeCategory === cat && styles.catTabTextActive]}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Text style={styles.resultCount}>
          {isLoading ? '...' : `${displayProducts.length} Products`}
        </Text>
        <View style={styles.toolbarRight}>
          <Pressable style={styles.sortBtn} onPress={() => setShowSort((s) => !s)}>
            <SvgIcon name="filter" width={16} height={16} color={COLORS.body} />
            <Text style={styles.sortBtnText}>{sortBy}</Text>
          </Pressable>
          <Pressable
            style={styles.viewToggle}
            onPress={() => setViewMode((m) => (m === 'grid' ? 'list' : 'grid'))}
            hitSlop={8}
          >
            <SvgIcon
              name={viewMode === 'grid' ? 'listview' : 'grid_view'}
              width={20}
              height={20}
              color={COLORS.body}
            />
          </Pressable>
        </View>
      </View>

      {/* Sort Dropdown */}
      {showSort && (
        <View style={styles.sortDropdown}>
          {SORT_OPTIONS.map((opt) => (
            <Pressable
              key={opt}
              style={[styles.sortOption, sortBy === opt && styles.sortOptionActive]}
              onPress={() => handleSort(opt)}
            >
              <Text style={[styles.sortOptionText, sortBy === opt && styles.sortOptionTextActive]}>
                {opt}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.secondary} />
        </View>
      ) : viewMode === 'grid' ? (
        <FlatList
          data={displayProducts}
          keyExtractor={(p) => `cat-${p.id}`}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 16 }]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard product={item} style={{ width: CARD_W }} onAddToCart={addItem} />
          )}
        />
      ) : (
        <FlatList
          data={displayProducts}
          keyExtractor={(p) => `cat-list-${p.id}`}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 16 }]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ListProductItem product={item} onAddToCart={addItem} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

function ListProductItem({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) {
  const router = useRouter();
  return (
    <Pressable
      style={styles.listItem}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image source={{ uri: product.image }} style={styles.listItemImage} contentFit="contain" />
      <View style={styles.listItemInfo}>
        <Text style={styles.listItemTitle} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.listItemCategory}>{product.category}</Text>
        <Text style={styles.listItemPrice}>${product.price.toFixed(2)}</Text>
        <Pressable style={styles.listAddBtn} onPress={() => onAddToCart(product)}>
          <Text style={styles.listAddBtnText}>ADD TO CART</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
