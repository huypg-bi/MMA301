import { StyleSheet } from 'react-native';
import { COLORS } from './color';

export const productDetailStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.off_white,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: COLORS.off_white,
  },
  errorText: {
    color: '#E57373',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  backBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backBtnText: {
    color: COLORS.off_white,
    fontSize: 14,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    zIndex: 10,
    backgroundColor: 'rgba(10,10,10,0.92)',
  },
  headerBtn: {
    backgroundColor: COLORS.off_white,
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 460,
    backgroundColor: COLORS.input_background,
    marginTop: 100,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    flex: 1,
  },
  imageDots: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.line,
    transform: [{ rotate: '45deg' }],
  },
  dotActive: {
    backgroundColor: COLORS.placeholder,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 6,
  },
  brandText: {
    fontSize: 14,
    letterSpacing: 3,
    color: COLORS.title_active,
    fontWeight: '600',
  },
  productTitle: {
    fontSize: 16,
    color: COLORS.label,
    lineHeight: 22,
  },
  shareBtn: {
    padding: 4,
  },
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  price: {
    fontSize: 22,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingCount: {
    fontSize: 12,
    color: COLORS.placeholder,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.line,
    marginVertical: 20,
  },
  variantSection: {
    marginBottom: 16,
    gap: 10,
  },
  variantLabel: {
    fontSize: 12,
    color: COLORS.label,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  colorOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  colorCircleSelected: {
    borderWidth: 2,
    borderColor: COLORS.title_active,
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.input_background,
  },
  sizeBtnActive: {
    backgroundColor: COLORS.title_active,
    borderColor: COLORS.title_active,
  },
  sizeBtnText: {
    fontSize: 12,
    color: COLORS.label,
    letterSpacing: 0.5,
  },
  sizeBtnTextActive: {
    color: COLORS.off_white,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 16,
    gap: 8,
  },
  infoSectionTitle: {
    fontSize: 13,
    letterSpacing: 2,
    color: COLORS.title_active,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: COLORS.label,
    lineHeight: 22,
  },
  readMoreText: {
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 4,
  },
  careIcons: {
    gap: 12,
    marginBottom: 16,
  },
  careItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  careLabel: {
    fontSize: 13,
    color: COLORS.label,
  },
  shippingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  shippingInfo: {
    flex: 1,
    gap: 2,
  },
  shippingTitle: {
    fontSize: 14,
    color: COLORS.body,
    fontWeight: '500',
  },
  shippingDetail: {
    fontSize: 12,
    color: COLORS.label,
  },
  relatedSection: {
    marginHorizontal: -20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    letterSpacing: 3,
    color: COLORS.title_active,
    textTransform: 'uppercase',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  wishlistOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
