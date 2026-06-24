import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { cartStyles as styles } from '@/styles/cart';
import { THEME } from '@/styles/theme';
import type { CartItem } from '@/types';

export default function CartScreen() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  if (items.length === 0) {
    return (
      <View style={styles.flex}>
        <Header title="CART" showSearch={false} showCart={false} />
        <View style={styles.emptyContainer}>
          <Ionicons name="bag-outline" size={64} color={THEME.colors.border} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Discover our new arrivals and add your favourites
          </Text>
          <Pressable style={styles.shopBtn} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.shopBtnText}>START SHOPPING</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <Header title="CART" showSearch={false} showCart={false} />
      <FlatList
        data={items}
        keyExtractor={(item) => `cart-${item.product.id}`}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 190 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <CartItemRow item={item} onUpdateQty={updateQuantity} onRemove={removeItem} />
        )}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.itemCount}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </Text>
            <Pressable onPress={clearCart}>
              <Text style={styles.clearText}>Clear all</Text>
            </Pressable>
          </View>
        }
      />

      <View style={[styles.summary, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>SUB TOTAL</Text>
          <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        <Text style={styles.shippingNote}>
          *Shipping charges, taxes and discount codes are calculated at checkout.
        </Text>
        <Pressable style={styles.checkoutBtn} onPress={() => router.push('/checkout')}>
          <Ionicons name="bag-outline" size={20} color={THEME.colors.white} />
          <Text style={styles.checkoutBtnText}>PROCEED TO CHECKOUT</Text>
        </Pressable>
        <Pressable style={styles.continueBtn} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.continueBtnText}>Continue Shopping</Text>
        </Pressable>
      </View>
    </View>
  );
}

function CartItemRow({
  item,
  onUpdateQty,
  onRemove,
}: {
  item: CartItem;
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) {
  const { product, quantity } = item;

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: product.image }} style={styles.itemImage} contentFit="contain" />
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemCategory}>{product.category}</Text>
          <Pressable onPress={() => onRemove(product.id)} hitSlop={8} accessibilityLabel="Remove item">
            <Ionicons name="close-outline" size={20} color={THEME.colors.textMuted} />
          </Pressable>
        </View>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {product.title}
        </Text>
        {item.selectedSize && (
          <Text style={styles.itemVariant}>Size: {item.selectedSize}</Text>
        )}
        <View style={styles.itemFooter}>
          <View style={styles.qtyRow}>
            <Pressable
              style={styles.qtyBtn}
              onPress={() => onUpdateQty(product.id, quantity - 1)}
              accessibilityLabel="Decrease quantity"
            >
              <Ionicons name="remove" size={16} color={THEME.colors.textPrimary} />
            </Pressable>
            <Text style={styles.qtyText}>{quantity}</Text>
            <Pressable
              style={styles.qtyBtn}
              onPress={() => onUpdateQty(product.id, quantity + 1)}
              accessibilityLabel="Increase quantity"
            >
              <Ionicons name="add" size={16} color={THEME.colors.textPrimary} />
            </Pressable>
          </View>
          <Text style={styles.itemPrice}>${(product.price * quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}
