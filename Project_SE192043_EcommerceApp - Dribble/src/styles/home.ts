import { Dimensions, StyleSheet } from 'react-native';
import { THEME } from './theme';

const { width: SCREEN_W } = Dimensions.get('window');
export const CARD_WIDTH = (SCREEN_W - 16 * 2 - 12) / 2;

export const homeStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: THEME.colors.background,
  },
  errorText: {
    fontSize: THEME.fontSize.base,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.radius.sm,
  },
  retryText: {
    color: THEME.colors.white,
    fontWeight: THEME.fontWeight.semibold,
    fontSize: THEME.fontSize.base,
  },

  heroBanner: {
    marginBottom: 28,
    height: 200,
    overflow: 'hidden',
  },
  heroModelImage: {
    width: '100%',
    height: '100%',
  },

  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.textPrimary,
  },
  seeAll: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.fontWeight.medium,
  },

  categoriesRow: {
    paddingHorizontal: 16,
    gap: 14,
    alignItems: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    gap: 6,
  },
  categoryCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: THEME.colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    fontSize: 11,
    color: THEME.colors.textPrimary,
    fontWeight: THEME.fontWeight.medium,
  },

  loadingContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  productsRow: {
    paddingHorizontal: 16,
    gap: 12,
  },
});
