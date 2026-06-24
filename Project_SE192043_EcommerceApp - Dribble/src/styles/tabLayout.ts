import { StyleSheet } from 'react-native';
import { THEME } from './theme';

export const tabLayoutStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: THEME.colors.white,
    borderTopColor: THEME.colors.border,
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 10,
    paddingTop: 8,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: THEME.fontWeight.medium,
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
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
