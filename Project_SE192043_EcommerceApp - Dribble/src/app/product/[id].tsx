import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { productDetailStyles as styles } from '@/styles/productDetail';
import { THEME } from '@/styles/theme';
import type { Product } from '@/types';
import { api } from '@/utils/api';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLOR_OPTIONS = ['#1A2744', '#3D90D6', '#B0C4D8', '#E0D5C5'];
const DOT_COUNT = [0, 1, 2];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addItem, totalItems } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [wishlist, setWishlist] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    api
      .getProduct(Number(id))
      .then(async (p) => {
        setProduct(p);
        const related = await api.getProductsByCategory(p.category);
        setRelatedProducts(related.filter((r) => r.id !== p.id).slice(0, 6));
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, selectedSize, selectedColor);
    Alert.alert(
      'Added to Cart',
      `${product.title.slice(0, 40)}... has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') },
      ],
    );
  };

  const handleBuyNow = () => {
    if (!product) return;
    addItem(product, selectedSize, selectedColor);
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color={THEME.colors.textMuted} />
        <Text style={styles.errorText}>{error ?? 'Product not found'}</Text>
        <Pressable style={styles.goBackBtn} onPress={() => router.back()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const originalPrice = (product.price * 1.45).toFixed(2);

  return (
    <View style={styles.flex}>
      {/* Header Bar */}
      <View style={[styles.headerBar, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.headerIconBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color={THEME.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Detail Product</Text>
        <Pressable
          onPress={() => router.push('/(tabs)/cart')}
          style={styles.headerIconBtn}
          hitSlop={8}
        >
          <View>
            <Ionicons name="bag-outline" size={22} color={THEME.colors.textPrimary} />
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems > 9 ? '9+' : totalItems}</Text>
              </View>
            )}
          </View>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 90 }}
      >
        {/* Product Image */}
        <View style={styles.imageSection}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            contentFit="contain"
          />
          <View style={styles.dotsRow}>
            {DOT_COUNT.map((i) => (
              <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          {/* Brand + Rating + Heart */}
          <View style={styles.brandRow}>
            <View style={styles.brandRatingBlock}>
              <Text style={styles.brandText}>H&M</Text>
              <View style={styles.ratingInline}>
                <Ionicons name="star" size={13} color={THEME.colors.star} />
                <Text style={styles.ratingValue}>{product.rating.rate}</Text>
                <Text style={styles.ratingCount}>({product.rating.count})</Text>
              </View>
            </View>
            <Pressable
              onPress={() => setWishlist((w) => !w)}
              style={styles.heartBtn}
              hitSlop={8}
              accessibilityLabel="Wishlist"
            >
              <Ionicons
                name={wishlist ? 'heart' : 'heart-outline'}
                size={22}
                color={wishlist ? THEME.colors.heartActive : THEME.colors.textMuted}
              />
            </Pressable>
          </View>

          <Text style={styles.productTitle}>{product.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.salePrice}>${product.price.toFixed(2)}</Text>
            <Text style={styles.originalPrice}>${originalPrice}</Text>
          </View>

          <Text
            style={styles.description}
            numberOfLines={descExpanded ? undefined : 3}
          >
            {product.description}
          </Text>
          <Pressable onPress={() => setDescExpanded((e) => !e)} hitSlop={4}>
            <Text style={styles.readMore}>
              {descExpanded ? 'Show less' : 'Read more'}
            </Text>
          </Pressable>

          <View style={styles.divider} />

          {/* Color & Size */}
          <View style={styles.selectorsRow}>
            <View style={styles.selectorBlock}>
              <Text style={styles.selectorLabel}>Colors</Text>
              <View style={styles.colorOptions}>
                {COLOR_OPTIONS.map((c) => (
                  <Pressable
                    key={c}
                    onPress={() => setSelectedColor(c)}
                    style={[
                      styles.colorDot,
                      { backgroundColor: c },
                      selectedColor === c && styles.colorDotSelected,
                    ]}
                    accessibilityLabel={`Color ${c}`}
                  >
                    {selectedColor === c && (
                      <Ionicons name="checkmark" size={12} color={THEME.colors.white} />
                    )}
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.selectorBlock}>
              <Text style={styles.selectorLabel}>Size</Text>
              <View style={styles.sizeOptions}>
                {SIZES.map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => setSelectedSize(s)}
                    style={[styles.sizeBtn, selectedSize === s && styles.sizeBtnActive]}
                    accessibilityLabel={`Size ${s}`}
                  >
                    <Text
                      style={[styles.sizeBtnText, selectedSize === s && styles.sizeBtnTextActive]}
                    >
                      {s}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <View style={styles.relatedSection}>
              <Text style={styles.relatedTitle}>You May Also Like</Text>
              <FlatList
                horizontal
                data={relatedProducts}
                keyExtractor={(p) => `related-${p.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
                renderItem={({ item }) => (
                  <ProductCard product={item} style={{ width: 160 }} />
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.actionBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Ionicons name="bag-outline" size={18} color={THEME.colors.primary} />
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </Pressable>
        <Pressable style={styles.buyNowBtn} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>BUY NOW</Text>
        </Pressable>
      </View>
    </View>
  );
}
