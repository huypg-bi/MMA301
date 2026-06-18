import { Fragment } from 'react';
import { useRouter } from 'expo-router';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { SvgIcon } from '@/components/SvgIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { COLORS } from '@/styles/color';
import { profileStyles as styles } from '@/styles/profile';

type MenuItem = {
  icon: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
};

function MenuIcon({ name, danger }: { name: string; danger?: boolean }) {
  return <SvgIcon name={name} width={18} height={18} color={danger ? '#E57373' : COLORS.body} />;
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { totalItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  function handleLogout() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          clearCart();
          logout();
        },
      },
    ]);
  }

  const menuItems: MenuItem[][] = [
    [
      { icon: 'shopping_bag', label: 'My Orders', onPress: () => router.push('/(tabs)/cart') },
      { icon: 'heart', label: 'Wishlist', onPress: () => {} },
      { icon: 'location', label: 'Delivery Addresses', onPress: () => {} },
    ],
    [
      { icon: 'noti', label: 'Notifications', onPress: () => {} },
      { icon: 'voucher', label: 'Payment Methods', onPress: () => {} },
      { icon: 'sercurity', label: 'Privacy & Security', onPress: () => {} },
    ],
    [
      { icon: 'call', label: 'Help & Support', onPress: () => {} },
      { icon: 'about', label: 'About OpenFashion', onPress: () => {} },
      { icon: 'logout', label: 'Sign Out', onPress: handleLogout, danger: true },
    ],
  ];

  return (
    <View style={styles.flex}>
      <Header title="PROFILE" showSearch={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <SvgIcon name="profile" width={32} height={32} color={COLORS.secondary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user?.name ? `${user.name.firstname} ${user.name.lastname}` : user?.username}
            </Text>
            <Text style={styles.userEmail}>{user?.email ?? 'user@example.com'}</Text>
          </View>
          <Pressable style={styles.editBtn} hitSlop={8}>
            <SvgIcon name="brush" width={20} height={20} color={COLORS.body} />
          </Pressable>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Pressable
            style={styles.statItem}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <Text style={styles.statValue}>{totalItems}</Text>
            <Text style={styles.statLabel}>Cart Items</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${totalPrice.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Cart Total</Text>
          </View>
          <View style={styles.statDivider} />
          <Pressable style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </Pressable>
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, si) => (
          <View key={si} style={styles.menuSection}>
            {section.map((item, ii) => (
              <Fragment key={item.label}>
                <Pressable style={styles.menuItem} onPress={item.onPress}>
                  <View style={[styles.menuIconBox, item.danger && styles.menuIconBoxDanger]}>
                    <MenuIcon name={item.icon} danger={item.danger} />
                  </View>
                  <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                    {item.label}
                  </Text>
                  {!item.danger && (
                    <SvgIcon name="forward_arrow" width={14} height={14} color={COLORS.placeholder} />
                  )}
                </Pressable>
                {ii < section.length - 1 && <View style={styles.menuSeparator} />}
              </Fragment>
            ))}
          </View>
        ))}

        {/* App Version */}
        <Text style={styles.version}>OpenFashion v1.0.0</Text>
      </ScrollView>
    </View>
  );
}
