import { Ionicons } from '@expo/vector-icons';
import { Fragment, type ComponentProps, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { profileStyles as styles } from '@/styles/profile';
import { THEME } from '@/styles/theme';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

type MenuItem = {
  icon: IoniconsName;
  label: string;
  onPress: () => void;
  danger?: boolean;
};

function GuestView() {
  const { login, isLoading, error } = useAuth();
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password) return;
    try {
      await login(username.trim(), password);
    } catch {
      Alert.alert('Login Failed', 'Invalid username or password.\n\nDemo: johnd / m38rmF$');
    }
  }

  return (
    <View style={styles.flex}>
      <Header title="PROFILE" showSearch={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.guestContent, { paddingBottom: insets.bottom + 32 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.guestHero}>
          <Ionicons name="person-circle-outline" size={72} color={THEME.colors.primary} />
          <Text style={styles.guestTitle}>Welcome</Text>
          <Text style={styles.guestSubtitle}>
            Sign in to access your profile,{'\n'}orders and wishlist
          </Text>
        </View>

        <View style={styles.guestForm}>
          <View style={styles.guestField}>
            <Text style={styles.guestLabel}>Username</Text>
            <TextInput
              style={styles.guestInput}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor={THEME.colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>

          <View style={styles.guestField}>
            <Text style={styles.guestLabel}>Password</Text>
            <View style={styles.guestPasswordRow}>
              <TextInput
                style={styles.guestPasswordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor={THEME.colors.textMuted}
                secureTextEntry={!showPw}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <Pressable onPress={() => setShowPw((s) => !s)} hitSlop={8}>
                <Text style={styles.guestEyeText}>{showPw ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>
          </View>

          {error ? <Text style={styles.guestError}>{error}</Text> : null}

          <Pressable
            style={[styles.guestLoginBtn, isLoading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={THEME.colors.white} />
            ) : (
              <Text style={styles.guestLoginBtnText}>SIGN IN</Text>
            )}
          </Pressable>

          <Pressable onPress={() => { setUsername('johnd'); setPassword('m38rmF$'); }}>
            <Text style={styles.guestDemo}>Demo: johnd / m38rmF$  (tap to fill)</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { totalItems, totalPrice, clearCart } = useCart();
  const { items: wishlistItems } = useWishlist();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  if (!user) return <GuestView />;

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
      { icon: 'bag-outline', label: 'My Orders', onPress: () => router.push('/(tabs)/cart') },
      { icon: 'heart-outline', label: 'Wishlist', onPress: () => router.push('/wishlist') },
      { icon: 'location-outline', label: 'Delivery Addresses', onPress: () => {} },
    ],
    [
      { icon: 'notifications-outline', label: 'Notifications', onPress: () => {} },
      { icon: 'card-outline', label: 'Payment Methods', onPress: () => {} },
      { icon: 'shield-checkmark-outline', label: 'Privacy & Security', onPress: () => {} },
    ],
    [
      { icon: 'call-outline', label: 'Help & Support', onPress: () => {} },
      { icon: 'information-circle-outline', label: 'About OpenFashion', onPress: () => {} },
      { icon: 'log-out-outline', label: 'Sign Out', onPress: handleLogout, danger: true },
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
            <Ionicons name="person-outline" size={28} color={THEME.colors.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user?.name ? `${user.name.firstname} ${user.name.lastname}` : user?.username}
            </Text>
            <Text style={styles.userEmail}>{user?.email ?? 'user@example.com'}</Text>
          </View>
          <Pressable style={styles.editBtn} hitSlop={8}>
            <Ionicons name="create-outline" size={20} color={THEME.colors.textSecondary} />
          </Pressable>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Pressable style={styles.statItem} onPress={() => router.push('/(tabs)/cart')}>
            <Text style={styles.statValue}>{totalItems}</Text>
            <Text style={styles.statLabel}>Cart Items</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <Pressable style={styles.statItem} onPress={() => router.push('/wishlist')}>
            <Text style={styles.statValue}>{wishlistItems.length}</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${totalPrice.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Cart Total</Text>
          </View>
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, si) => (
          <View key={si} style={styles.menuSection}>
            {section.map((item, ii) => (
              <Fragment key={item.label}>
                <Pressable style={styles.menuItem} onPress={item.onPress}>
                  <View style={[styles.menuIconBox, item.danger && styles.menuIconBoxDanger]}>
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={item.danger ? '#E53935' : THEME.colors.textSecondary}
                    />
                  </View>
                  <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                    {item.label}
                  </Text>
                  {!item.danger && (
                    <Ionicons name="chevron-forward" size={16} color={THEME.colors.textMuted} />
                  )}
                </Pressable>
                {ii < section.length - 1 && <View style={styles.menuSeparator} />}
              </Fragment>
            ))}
          </View>
        ))}

        <Text style={styles.version}>OpenFashion v1.0.0</Text>
      </ScrollView>
    </View>
  );
}
