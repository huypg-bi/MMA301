import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from './color';

const { width: SCREEN_W } = Dimensions.get('window');
export const CARD_W = (SCREEN_W - 48) / 2;

export const searchStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.off_white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
    backgroundColor: COLORS.off_white,
  },
  backBtn: {
    padding: 4,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input_background,
    borderRadius: 10,
    paddingHorizontal: 12,
    gap: 8,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.body,
  },
  searchBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: COLORS.title_active,
    borderRadius: 8,
  },
  searchBtnText: {
    color: COLORS.off_white,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    letterSpacing: 1.5,
    color: COLORS.title_active,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  clearText: {
    fontSize: 13,
    color: COLORS.secondary,
  },
  recentChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.input_background,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  recentChipText: {
    fontSize: 14,
    color: COLORS.body,
  },
  recentChipDelete: {
    fontSize: 18,
    color: COLORS.placeholder,
    lineHeight: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  categoryChipText: {
    fontSize: 14,
    color: COLORS.body,
    letterSpacing: 0.3,
  },
  resultCount: {
    fontSize: 13,
    color: COLORS.label,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  gridRow: {
    gap: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    color: COLORS.body,
    fontWeight: '500',
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 14,
    color: COLORS.label,
    textAlign: 'center',
  },
  browseBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  browseBtnText: {
    color: COLORS.off_white,
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
