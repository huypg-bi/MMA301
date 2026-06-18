import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/styles/color';

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
    backgroundColor: COLORS.off_white,
  },
  code: {
    fontSize: 72,
    fontWeight: '700',
    color: COLORS.line,
  },
  title: {
    fontSize: 20,
    color: COLORS.body,
    letterSpacing: 2,
  },
  btn: {
    backgroundColor: COLORS.title_active,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  btnText: {
    color: COLORS.off_white,
    fontSize: 14,
    letterSpacing: 1,
  },
});
