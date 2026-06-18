import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { SvgIcon } from '@/components/SvgIcon';
import { useCart } from '@/contexts/CartContext';
import { COLORS } from '@/styles/color';
import { CARD_WIDTH, homeStyles as styles } from '@/styles/home';
import type { Product } from '@/types';
import { api } from '@/utils/api';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_W } = Dimensions.get('window');
const FOOTER_SVG_H = Math.round(SCREEN_W * 340 / 375);
const FOOTER_CONTENT_H = Math.round(SCREEN_W * 294.754 / 375);

const CATEGORIES_MAP: Record<string, string> = {
  "electronics": "Electronics",
  "jewelery": "Jewelery",
  "men's clothing": "Men's",
  "women's clothing": "Women's",
};

export default function HomeScreen() {
  const { addItem } = useCart();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getProducts()
      .then((prods) => {
        setProducts(prods);
        setFilteredProducts(prods.slice(0, 8));
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleTabChange = useCallback(async (tab: string) => {
    setActiveTab(tab);
    if (tab === 'All') {
      setFilteredProducts(products.slice(0, 8));
    } else {
      const catKey = Object.keys(CATEGORIES_MAP).find(
        (k) => CATEGORIES_MAP[k] === tab,
      );
      if (catKey) {
        const prods = await api.getProductsByCategory(catKey);
        setFilteredProducts(prods.slice(0, 8));
      }
    }
  }, [products]);

  const tabs = ['All', ...Object.values(CATEGORIES_MAP)];

  if (error) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryBtn} onPress={() => {
          setError(null);
          setIsLoading(true);
        }}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={require('@/assets/images/gucci.png')}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Luxury{'\n'}Fashion &{'\n'}Accessories</Text>
            <Pressable
              style={styles.heroBtn}
              onPress={() => router.push('/(tabs)/categories')}
            >
              <Text style={styles.heroBtnText}>Explore Collection</Text>
            </Pressable>
          </View>
        </View>

        {/* New Arrival Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>NEW ARRIVAL</Text>
            <View style={styles.titleUnderline} />
          </View>

          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}
          >
            {tabs.map((tab) => (
              <Pressable
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => handleTabChange(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.secondary} style={styles.loader} />
          ) : (
            <View style={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  style={{ width: CARD_WIDTH }}
                  onAddToCart={addItem}
                />
              ))}
            </View>
          )}

          <Pressable
            style={styles.exploreBtn}
            onPress={() => router.push('/(tabs)/categories')}
          >
            <Text style={styles.exploreBtnText}>Explore More</Text>
          </Pressable>
        </View>

        {/* Collections Banner */}
        <View style={styles.collectionsSection}>
          <Text style={styles.sectionTitle}>COLLECTIONS</Text>
          <View style={styles.titleUnderline} />
          <View style={styles.collectionsGrid}>
            {[
              { label: 'BURBERRY', uri: 'https://st4.depositphotos.com/6995204/38850/i/450/depositphotos_388506628-stock-photo-signage-store-window-british-luxury.jpg', cat: "electronics" },
              { label: "PRADA", uri: 'https://www.the-spin-off.com/news/media/7/Ho-Prad-store-wan-t-mak-th-worl-a-bette-plac-61984-detailp.jpeg', cat: "women's clothing" },
              { label: 'CHANEL', uri: 'https://www.chanel.com/images/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_428/FSH-1711725944866-omotesandomobile.png', cat: "jewelery" },
              { label: "GUCCI", uri: 'https://www.thesomersetcollection.com/wp-content/uploads/2024/01/gucci-scaled-aspect-ratio-1200-600.jpeg', cat: "men's clothing" },
            ].map((col) => (
              <Pressable
                key={col.label}
                style={styles.collectionItem}
                onPress={() => router.push({ pathname: '/(tabs)/categories', params: { category: col.cat } })}
              >
                <Image source={{ uri: col.uri }} style={styles.collectionImage} contentFit="cover" />
                <View style={styles.collectionOverlay}>
                  <Text style={styles.collectionLabel}>{col.label}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Trending Tags */}
        <View style={styles.trendingSection}>
          <Text style={styles.sectionTitle}>@TRENDING</Text>
          <View style={styles.tagsContainer}>
            {['#2024', '#spring', '#collection', '#fall', '#dress', '#autumncollection', '#openfashion'].map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Just For You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>JUST FOR YOU</Text>
            <View style={styles.titleUnderline} />
          </View>
          {!isLoading && (
            <FlatList
              horizontal
              data={products.filter(p => p.category === 'jewelery')}
              keyExtractor={(p) => `jfy-${p.id}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  style={{ width: 180 }}
                  onAddToCart={addItem}
                />
              )}
            />
          )}
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <View style={{ overflow: 'hidden', height: FOOTER_CONTENT_H }}>
            <SvgIcon name="footer" width={SCREEN_W} height={FOOTER_SVG_H} color={COLORS.title_active} />
          </View>
          <View style={styles.footerCopyrightBar}>
            <Text style={styles.footerCopyrightText}>© OpenFashion All Rights Reserved.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
