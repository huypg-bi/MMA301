import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from './color';

const { width: SCREEN_W } = Dimensions.get('window');
export const CARD_W = (SCREEN_W - 48) / 2;

export const categoriesStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.off_white,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#E57373',
    fontSize: 14,
  },
  categoryTabs: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  categoryTabsContent: {
    paddingHorizontal: 16,
    gap: 8,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  catTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.input_background,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  catTabActive: {
    backgroundColor: COLORS.title_active,
    borderColor: COLORS.title_active,
  },
  catTabText: {
    fontSize: 13,
    color: COLORS.body,
    letterSpacing: 0.3,
  },
  catTabTextActive: {
    color: COLORS.off_white,
    fontWeight: '600',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  resultCount: {
    fontSize: 13,
    color: COLORS.label,
    letterSpacing: 0.3,
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortBtnText: {
    fontSize: 13,
    color: COLORS.body,
    letterSpacing: 0.3,
  },
  viewToggle: {
    padding: 2,
  },
  sortDropdown: {
    position: 'absolute',
    top: 150,
    right: 16,
    backgroundColor: COLORS.off_white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  sortOption: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  sortOptionActive: {
    backgroundColor: COLORS.input_background,
  },
  sortOptionText: {
    fontSize: 14,
    color: COLORS.body,
  },
  sortOptionTextActive: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  gridRow: {
    gap: 16,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.line,
  },
  listItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: COLORS.off_white,
  },
  listItemImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: COLORS.input_background,
  },
  listItemInfo: {
    flex: 1,
    gap: 4,
    justifyContent: 'center',
  },
  listItemTitle: {
    fontSize: 13,
    color: COLORS.body,
    lineHeight: 18,
  },
  listItemCategory: {
    fontSize: 11,
    color: COLORS.placeholder,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  listItemPrice: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: '500',
    marginTop: 4,
  },
  listAddBtn: {
    backgroundColor: COLORS.title_active,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  listAddBtnText: {
    color: COLORS.off_white,
    fontSize: 11,
    letterSpacing: 1,
  },
});
