import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { headerStyles as styles } from '@/styles/header';
import { THEME } from '@/styles/theme';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  showNotification?: boolean;
  showSearch?: boolean;
  onBackPress?: () => void;
}

export function Header({
  title,
  showBack = false,
  showCart = true,
  showNotification = false,
  showSearch: _showSearch,
  onBackPress,
}: HeaderProps) {
  const router = useRouter();
  const { totalItems } = useCart();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBackPress) onBackPress();
    else router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.left}>
        {showBack ? (
          <Pressable onPress={handleBack} style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={24} color={THEME.colors.textPrimary} />
          </Pressable>
        ) : (
          <Image
            source={require('@/assets/images/logo (2).png')}
            style={styles.logoImage}
            contentFit="contain"
          />
        )}
      </View>

      {title ? (
        <Text style={styles.titleText}>{title}</Text>
      ) : (
        <View style={styles.spacer} />
      )}

      <View style={styles.right}>
        {showNotification && (
          <Pressable style={styles.iconBtn} hitSlop={8} accessibilityLabel="Notifications">
            <Ionicons name="notifications-outline" size={22} color={THEME.colors.textPrimary} />
          </Pressable>
        )}
        {showCart && (
          <Pressable
            onPress={() => router.push('/(tabs)/cart')}
            style={styles.iconBtn}
            hitSlop={8}
            accessibilityLabel="Cart"
          >
            <View>
              <Ionicons name="bag-outline" size={22} color={THEME.colors.textPrimary} />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems > 9 ? '9+' : totalItems}</Text>
                </View>
              )}
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
}
