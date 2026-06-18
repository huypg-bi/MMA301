import { ProductCard } from '@/components/ProductCard';
import { SvgIcon } from '@/components/SvgIcon';
import { useCart } from '@/contexts/CartContext';
import { COLORS } from '@/styles/color';
import { productDetailStyles as styles } from '@/styles/productDetail';
import type { Product } from '@/types';
import { api } from '@/utils/api';
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

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS_OPT = ['#C4A882', '#3D3D3D', '#B5C4B1', '#DD8560'];

const CARE_ITEMS = [
  { icon: 'do_not_bleach', label: 'Do not bleach' },
  { icon: 'do_not_tumble_dry', label: 'Do not tumble dry' },
  { icon: 'do_not_wash', label: 'Do not wash' },
  { icon: 'iron_low_temperature', label: 'Iron max 110°C' },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(COLORS_OPT[0]);
  const [wishlist, setWishlist] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    api.getProduct(Number(id))
      .then(async (p) => {
        setProduct(p);
        const related = await api.getProductsByCategory(p.category);
        setRelatedProducts(related.filter((r) => r.id !== p.id).slice(0, 4));
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, selectedSize, selectedColor);
    Alert.alert('Added to Cart', `${product.title.slice(0, 40)}... has been added to your cart.`, [
      { text: 'Continue Shopping', style: 'cancel' },
      { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.secondary} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Product not found'}</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const stars = Math.round(product.rating.rate);

  return (
    <View style={styles.flex}>
      {/* Floating Header */}
      <View style={[styles.floatingHeader, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.headerBtn} hitSlop={8}>
          <SvgIcon name="backward" width={22} height={22} color={COLORS.body} />
        </Pressable>
        <Pressable
          onPress={() => setWishlist((w) => !w)}
          style={styles.headerBtn}
          hitSlop={8}
        >
          {wishlist ? (
            <SvgIcon name="heart" width={22} height={22} color={COLORS.secondary} />
          ) : (
            <SvgIcon name="heart" width={22} height={22} color={COLORS.body} />
          )}
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 90 }}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            contentFit="contain"
          />
          <View style={styles.imageDots}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          {/* Title and Share */}
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.brandText}>{product.category.toUpperCase()}</Text>
              <Text style={styles.productTitle}>{product.title}</Text>
            </View>
            <Pressable style={styles.shareBtn} hitSlop={8}>
              <SvgIcon name="export" width={20} height={20} color={COLORS.label} />
            </Pressable>
          </View>

          {/* Price and Rating */}
          <View style={styles.priceRatingRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Text
                  key={i}
                  style={{ fontSize: 14, color: '#F4C150' }}
                >
                  {i < stars ? '★' : '☆'}
                </Text>
              ))}
              <Text style={styles.ratingCount}>({product.rating.count})</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Color Selection */}
          <View style={styles.variantSection}>
            <Text style={styles.variantLabel}>Color</Text>
            <View style={styles.colorOptions}>
              {COLORS_OPT.map((c) => (
                <Pressable
                  key={c}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: c },
                    selectedColor === c && styles.colorCircleSelected,
                  ]}
                  onPress={() => setSelectedColor(c)}
                  accessibilityLabel={`Color ${c}`}
                />
              ))}
            </View>
          </View>

          {/* Size Selection */}
          <View style={styles.variantSection}>
            <Text style={styles.variantLabel}>Size</Text>
            <View style={styles.sizeOptions}>
              {SIZES.map((s) => (
                <Pressable
                  key={s}
                  style={[styles.sizeBtn, selectedSize === s && styles.sizeBtnActive]}
                  onPress={() => setSelectedSize(s)}
                >
                  <Text style={[styles.sizeBtnText, selectedSize === s && styles.sizeBtnTextActive]}>
                    {s}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Materials */}
          <View style={styles.infoSection}>
            <Text style={styles.infoSectionTitle}>MATERIALS</Text>
            <Text style={styles.infoText}>
              We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.
            </Text>
          </View>

          {/* Care */}
          <View style={styles.infoSection}>
            <Text style={styles.infoSectionTitle}>CARE</Text>
            <Text style={styles.infoText} numberOfLines={descExpanded ? undefined : 3}>
              {product.description}
            </Text>
            <Pressable onPress={() => setDescExpanded((e) => !e)}>
              <Text style={styles.readMoreText}>{descExpanded ? 'Show less' : 'Read more'}</Text>
            </Pressable>
          </View>

          {/* Care Icons */}
          <View style={styles.careIcons}>
            {CARE_ITEMS.map((item) => (
              <View key={item.label} style={styles.careItem}>
                <SvgIcon name={item.icon} width={28} height={28} color={COLORS.body} />
                <Text style={styles.careLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Shipping */}
          <View style={styles.shippingSection}>
            <SvgIcon name="shipping" width={22} height={22} color={COLORS.body} />
            <View style={styles.shippingInfo}>
              <Text style={styles.shippingTitle}>Free Flat Rate Shipping</Text>
              <Text style={styles.shippingDetail}>Estimated delivery: 09/11 - 12/11/2024</Text>
            </View>
            <SvgIcon name="down" width={16} height={16} color={COLORS.placeholder} />
          </View>

          <View style={styles.divider} />

          {/* You May Also Like */}
          <View style={styles.relatedSection}>
            <Text style={styles.sectionTitle}>YOU MAY ALSO LIKE</Text>
            <FlatList
              horizontal
              data={relatedProducts}
              keyExtractor={(p) => `related-${p.id}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
              renderItem={({ item }) => (
                <ProductCard product={item} style={{ width: 160 }} onAddToCart={addItem} />
              )}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.actionBar, { paddingBottom: insets.bottom - 20 }]}>
        <Pressable
          style={styles.wishlistActionBtn}
          onPress={() => setWishlist((w) => !w)}
        >
          {wishlist ? (
            <SvgIcon name="heart" width={22} height={22} color={COLORS.secondary} />
          ) : (
            <SvgIcon name="heart" width={22} height={22} color={COLORS.off_white} />
          )}
        </Pressable>
        <Pressable style={styles.addToCartBtn} onPress={handleAddToCart}>
          <SvgIcon name="plus" width={18} height={18} color={COLORS.off_white} />
          <Text style={styles.addToCartText}>ADD TO BASKET</Text>
        </Pressable>
      </View>
    </View>
  );
}
