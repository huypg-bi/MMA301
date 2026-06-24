import { Dimensions, StyleSheet } from 'react-native';
import { THEME } from './theme';

const { width: SCREEN_W } = Dimensions.get('window');
export const CARD_W = (SCREEN_W - 16 * 2 - 12) / 2;

export const searchStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 32,
  },

  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  backBtn: {
    padding: 4,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.backgroundAlt,
    borderRadius: THEME.radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: THEME.fontSize.base,
    color: THEME.colors.textPrimary,
    padding: 0,
  },
  searchBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.radius.sm,
  },
  searchBtnText: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.white,
    fontWeight: THEME.fontWeight.semibold,
  },

  filterRow: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    paddingBottom: 10,
  },
  filterChips: {
    paddingHorizontal: 12,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
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

  scrollContent: {
    paddingTop: 16,
  },

  quickCatRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  quickCatItem: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  quickCatIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: THEME.colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickCatLabel: {
    fontSize: 11,
    color: THEME.colors.textPrimary,
    fontWeight: THEME.fontWeight.medium,
    textAlign: 'center',
  },

  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.textPrimary,
  },
  clearAll: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.salePrice,
    fontWeight: THEME.fontWeight.medium,
  },

  recentChips: {
    gap: 8,
  },
  recentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  recentChipText: {
    flex: 1,
    fontSize: THEME.fontSize.base,
    color: THEME.colors.textPrimary,
  },

  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  popularChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: THEME.radius.pill,
    backgroundColor: THEME.colors.backgroundAlt,
  },
  popularChipText: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textPrimary,
    fontWeight: THEME.fontWeight.medium,
  },

  noResultTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: THEME.colors.textPrimary,
    textAlign: 'center',
  },
  noResultSub: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
  },
  browseBtn: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.radius.sm,
  },
  browseBtnText: {
    color: THEME.colors.white,
    fontWeight: THEME.fontWeight.semibold,
    fontSize: THEME.fontSize.base,
  },

  gridRow: {
    paddingHorizontal: 16,
    gap: 12,
  },
  gridContent: {
    paddingTop: 12,
  },
  resultCount: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.fontWeight.medium,
  },
});
