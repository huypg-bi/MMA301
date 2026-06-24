import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from './color';

const { width: SCREEN_W } = Dimensions.get('window');
export const CARD_WIDTH = (SCREEN_W - 48) / 2;
export const COLLECTION_ITEM_WIDTH = (SCREEN_W - 48) / 2;

export const homeStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.off_white,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  errorText: {
    color: '#E57373',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  retryBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: COLORS.off_white,
    fontSize: 14,
    letterSpacing: 1,
  },
  heroBanner: {
    height: 520,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
  },
  heroTitle: {
    fontSize: 38,
    color: COLORS.body,
    fontWeight: '200',
    fontStyle: 'italic',
    lineHeight: 50,
    opacity: 0.9,
    marginBottom: 24,
  },
  heroBtn: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  heroBtnText: {
    color: COLORS.title_active,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  section: {
    paddingTop: 32,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    letterSpacing: 4,
    color: COLORS.title_active,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  titleUnderline: {
    width: 60,
    height: 2,
    backgroundColor: COLORS.secondary,
    borderRadius: 1,
    marginTop: 6,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.input_background,
  },
  tabActive: {
    backgroundColor: COLORS.title_active,
  },
  tabText: {
    fontSize: 13,
    color: COLORS.label,
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: COLORS.off_white,
    fontWeight: '600',
  },
  loader: {
    marginVertical: 40,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 16,
  },
  exploreBtn: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.body,
    borderRadius: 24,
  },
  exploreBtnText: {
    fontSize: 14,
    color: COLORS.body,
    letterSpacing: 1,
  },
  collectionsSection: {
    paddingTop: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  collectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    width: '100%',
  },
  collectionItem: {
    width: COLLECTION_ITEM_WIDTH,
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  collectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  collectionLabel: {
    color: COLORS.title_active,
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  trendingSection: {
    paddingTop: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 16,
  },
  tag: {
    backgroundColor: COLORS.input_background,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    color: COLORS.body,
    letterSpacing: 0.3,
  },
  footerSection: {
    marginTop: 48,
    backgroundColor: COLORS.off_white,
  },
  footerContent: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 8,
  },
  footerTagline: {
    fontSize: 13,
    color: COLORS.label,
    textAlign: 'center',
  },
  footerCopyright: {
    fontSize: 11,
    color: COLORS.placeholder,
  },
  footerCopyrightBar: {
    backgroundColor: COLORS.input_background,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerCopyrightText: {
    fontSize: 12,
    color: COLORS.label,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
