import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { CARD_WIDTH, homeStyles as styles } from '@/styles/home';
import { THEME } from '@/styles/theme';
import type { Product } from '@/types';
import { api } from '@/utils/api';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { type ComponentProps, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

interface CategoryItem {
  id: string;
  label: string;
  query: string;
  icon: IoniconsName;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'women', label: 'Women', query: "women's clothing", icon: 'woman-outline' },
  { id: 'men', label: 'Men', query: "men's clothing", icon: 'man-outline' },
  { id: 'teens', label: 'Teens', query: 'electronics', icon: 'phone-portrait-outline' },
  { id: 'kids', label: 'Kids', query: 'jewelery', icon: 'happy-outline' },
  { id: 'bags', label: 'Bags', query: "women's clothing", icon: 'bag-handle-outline' },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getProducts()
      .then((prods) => setProducts(prods.slice(0, 8)))
      .catch((e: any) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
  }, []);

  if (error) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <Ionicons name="cloud-offline-outline" size={48} color={THEME.colors.textMuted} />
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryBtn} onPress={handleRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <Header showNotification />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Hero Banner */}
        <Pressable style={styles.heroBanner} onPress={() => router.push('/(tabs)/categories')}>
          <Image
            source={require('@/assets/images/banner.png')}
            style={styles.heroModelImage}
            contentFit="cover"
          />
        </Pressable>

        {/* Shop By Category */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop By Category</Text>
            <Pressable onPress={() => router.push('/(tabs)/categories')}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}
          >
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={styles.categoryItem}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/categories',
                    params: { category: cat.query },
                  })
                }
              >
                <View style={styles.categoryCircle}>
                  <Ionicons name={cat.icon} size={28} color={THEME.colors.textSecondary} />
                </View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Curated For You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Curated For You</Text>
            <Pressable onPress={() => router.push('/(tabs)/categories')}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={THEME.colors.primary} />
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsRow}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  style={{ width: CARD_WIDTH }}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
