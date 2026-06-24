import { Dimensions, StyleSheet } from 'react-native';
import { THEME } from './theme';

const { width: SCREEN_W } = Dimensions.get('window');
export const CARD_W = (SCREEN_W - 16 * 2 - 12) / 2;

export const categoriesStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 32,
  },

  // Search bar
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.backgroundAlt,
    borderRadius: THEME.radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: THEME.fontSize.base,
    color: THEME.colors.textPrimary,
    padding: 0,
  },

  // Filter chips
  filterRow: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    paddingBottom: 10,
  },
  filterChips: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: THEME.radius.pill,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.white,
  },
  chipActive: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  chipText: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textPrimary,
    fontWeight: THEME.fontWeight.medium,
  },
  chipTextActive: {
    color: THEME.colors.white,
  },

  // Result count
  resultCount: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.fontWeight.medium,
  },
  searchingRow: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },

  // Grid
  gridRow: {
    paddingHorizontal: 16,
    gap: 12,
  },
  gridContent: {
    paddingTop: 4,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingTop: 48,
    gap: 10,
  },
  emptyTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: THEME.colors.textPrimary,
  },
  emptySub: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textSecondary,
  },
});
