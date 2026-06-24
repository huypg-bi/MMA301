import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SvgIcon } from '@/components/SvgIcon';
import type { Product } from '@/types';
import { COLORS } from '@/styles/color';
import { productCardStyles as styles } from '@/styles/productCard';

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  style?: object;
};

export function ProductCard({ product, onAddToCart, style }: Props) {
  const router = useRouter();
  const [wishlist, setWishlist] = useState(false);

  return (
    <Pressable
      style={[styles.card, style]}
      onPress={() => router.push(`/product/${product.id}`)}
      accessibilityLabel={product.title}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
          transition={300}
        />
        <Pressable
          style={styles.wishlistBtn}
          onPress={() => setWishlist((w) => !w)}
          hitSlop={8}
          accessibilityLabel="Add to wishlist"
        >
          <SvgIcon
            name="heart"
            width={18}
            height={18}
            color={wishlist ? COLORS.secondary : COLORS.placeholder}
          />
        </Pressable>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.row}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {onAddToCart && (
            <Pressable
              style={styles.addBtn}
              onPress={() => onAddToCart(product)}
              hitSlop={8}
              accessibilityLabel="Add to cart"
            >
              <SvgIcon name="plus" width={16} height={16} color={COLORS.off_white} />
            </Pressable>
          )}
        </View>
        <View style={styles.ratingRow}>
          <Text style={{ fontSize: 12, color: '#F4C150' }}>★</Text>
          <Text style={styles.ratingText}>
            {product.rating.rate} ({product.rating.count})
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
