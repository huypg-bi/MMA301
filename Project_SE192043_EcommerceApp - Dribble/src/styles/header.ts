import { StyleSheet } from 'react-native';
import { THEME } from './theme';

export const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  left: {
    width: 56,
    alignItems: 'flex-start',
  },
  logo: {
    fontSize: 28,
    fontWeight: THEME.fontWeight.extrabold,
    color: THEME.colors.primary,
    letterSpacing: -1,
  },
  logoImage: {
    width: 44,
    height: 30,
  },
  titleText: {
    flex: 1,
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: THEME.colors.textPrimary,
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
  right: {
    width: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  iconBtn: {
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -5,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: THEME.colors.badge,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    fontSize: 9,
    color: THEME.colors.white,
    fontWeight: THEME.fontWeight.bold,
  },
});
