import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emoji: {
    fontSize: 52,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  sub: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
