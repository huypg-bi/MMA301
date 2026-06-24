import { StyleSheet } from 'react-native';
import { THEME } from './theme';

export const productCardStyles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.white,
    borderRadius: THEME.radius.md,
    overflow: 'hidden',
    marginBottom: 4,
  },
  imageWrapper: {
    backgroundColor: THEME.colors.backgroundAlt,
    borderRadius: THEME.radius.md,
    overflow: 'hidden',
    aspectRatio: 3 / 4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: THEME.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  info: {
    paddingTop: 8,
    paddingHorizontal: 2,
    paddingBottom: 4,
  },
  brand: {
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.fontWeight.semibold,
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 3,
  },
  ratingText: {
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.textSecondary,
  },
  title: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textPrimary,
    fontWeight: THEME.fontWeight.medium,
    lineHeight: 17,
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  salePrice: {
    fontSize: THEME.fontSize.base,
    color: THEME.colors.salePrice,
    fontWeight: THEME.fontWeight.bold,
  },
  originalPrice: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textMuted,
    textDecorationLine: 'line-through',
  },
});
