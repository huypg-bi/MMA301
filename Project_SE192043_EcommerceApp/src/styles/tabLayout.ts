import { StyleSheet } from 'react-native';
import { COLORS } from './color';

export const tabLayoutStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.off_white,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 90,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  cartIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.off_white,
    fontSize: 10,
    fontWeight: '700',
  },
});
