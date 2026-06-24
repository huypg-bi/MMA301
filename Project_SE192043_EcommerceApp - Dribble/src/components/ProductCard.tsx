import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useWishlist } from '@/contexts/WishlistContext';
import { productCardStyles as styles } from '@/styles/productCard';
import { THEME } from '@/styles/theme';
import type { Product } from '@/types';

const BRAND_MAP: Record<string, string> = {
  "men's clothing": 'H&M',
  "women's clothing": 'Zara',
  electronics: 'Samsung',
  jewelery: 'Pandora',
};

interface ProductCardProps {
  product: Product;
  style?: object;
  onPress?: (product: Product) => void;
}

export function ProductCard({ product, style, onPress }: ProductCardProps) {
  const router = useRouter();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const wishlisted = isWishlisted(product.id);
  const brand = BRAND_MAP[product.category] ?? 'H&M';
  const originalPrice = (product.price * 1.45).toFixed(2);

  const handlePress = () => {
    if (onPress) onPress(product);
    else router.push(`/product/${product.id}`);
  };

  return (
    <Pressable style={[styles.card, style]} onPress={handlePress} accessibilityLabel={product.title}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
          transition={300}
        />
        <Pressable
          style={styles.heartBtn}
          onPress={() => toggleWishlist(product)}
          hitSlop={8}
          accessibilityLabel="Add to wishlist"
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={16}
            color={wishlisted ? THEME.colors.heartActive : THEME.colors.textMuted}
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.brand}>{brand}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={11} color={THEME.colors.star} />
          <Text style={styles.ratingText}>
            {product.rating.rate} ({product.rating.count})
          </Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.salePrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.originalPrice}>${originalPrice}</Text>
        </View>
      </View>
    </Pressable>
  );
}
