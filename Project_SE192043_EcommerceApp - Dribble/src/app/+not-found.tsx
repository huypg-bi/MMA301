import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { THEME } from '@/styles/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.code}>404</Text>
      <Text style={styles.title}>Page Not Found</Text>
      <Pressable style={styles.btn} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.btnText}>Go Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: THEME.colors.background,
  },
  code: {
    fontSize: 72,
    fontWeight: '700',
    color: THEME.colors.border,
  },
  title: {
    fontSize: 20,
    color: THEME.colors.textSecondary,
    letterSpacing: 2,
  },
  btn: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: THEME.radius.sm,
    marginTop: 8,
  },
  btnText: {
    color: THEME.colors.white,
    fontSize: 14,
    letterSpacing: 1,
  },
});
