import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useCart } from '@/contexts/CartContext';
import { COLORS } from '@/styles/color';
import { tabLayoutStyles as styles } from '@/styles/tabLayout';
import { SvgIcon } from '@/components/SvgIcon';

function CartIcon({ color }: { color: string | object; focused: boolean }) {
  const { totalItems } = useCart();
  return (
    <View style={styles.cartIconContainer}>
      <SvgIcon name="shopping_bag" width={24} height={24} color={String(color)} />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems > 9 ? '9+' : totalItems}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.placeholder,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <SvgIcon name="menu" width={24} height={24} color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => (
            <SvgIcon name="grid_view" width={24} height={24} color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => <CartIcon color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <SvgIcon name="profile" width={24} height={24} color={String(color)} />
          ),
        }}
      />
    </Tabs>
  );
}
