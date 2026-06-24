import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/contexts/CartContext';
import { COLORS } from '@/styles/color';
import { headerStyles as styles } from '@/styles/header';
import { DrawerMenu } from './DrawerMenu';
import { SvgIcon } from './SvgIcon';

type Props = {
  showSearch?: boolean;
  showCart?: boolean;
  showBack?: boolean;
  title?: string;
  transparent?: boolean;
};

export function Header({
  showSearch = true,
  showCart = true,
  showBack = false,
  title,
  transparent = false,
}: Props) {
  const router = useRouter();
  const { totalItems } = useCart();
  const insets = useSafeAreaInsets();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
    <DrawerMenu visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 8 },
        transparent && styles.transparent,
      ]}
    >
      <View style={styles.inner}>
        {showBack ? (
          <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
            <SvgIcon name="backward" width={24} height={24} color={COLORS.body} />
          </Pressable>
        ) : (
          <Pressable onPress={() => setDrawerOpen(true)} style={styles.iconBtn} hitSlop={8}>
            <SvgIcon name="menu" width={22} height={22} color={COLORS.body} />
          </Pressable>
        )}

        <View style={styles.logoContainer}>
          {title ? (
            <Text style={styles.titleText}>{title}</Text>
          ) : (
            <SvgIcon name="logo" width={100} height={41} color={COLORS.title_active} />
          )}
        </View>

        <View style={styles.actions}>
          {showSearch && (
            <Pressable
              onPress={() => router.push('/search')}
              style={styles.iconBtn}
              hitSlop={8}
              accessibilityLabel="Search"
            >
              <SvgIcon name="search" width={22} height={22} color={COLORS.title_active} />
            </Pressable>
          )}
          {showCart && (
            <Pressable
              onPress={() => router.push('/(tabs)/cart')}
              style={styles.iconBtn}
              hitSlop={8}
              accessibilityLabel="Cart"
            >
              <View style={styles.cartWrapper}>
                <SvgIcon name="shopping_bag" width={22} height={22} color={COLORS.title_active} />
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
    </View>
    </>
  );
}
