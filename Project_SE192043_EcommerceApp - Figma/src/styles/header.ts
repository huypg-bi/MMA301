import { StyleSheet } from 'react-native';
import { COLORS } from './color';

export const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.off_white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 32,
  },
  titleText: {
    fontSize: 16,
    letterSpacing: 3,
    color: COLORS.title_active,
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  cartWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: COLORS.off_white,
    fontSize: 9,
    fontWeight: '700',
  },
});
