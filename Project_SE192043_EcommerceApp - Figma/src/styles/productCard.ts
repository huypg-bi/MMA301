import { StyleSheet } from 'react-native';
import { COLORS } from './color';

export const productCardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.off_white,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: COLORS.input_background,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  wishlistBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: COLORS.off_white,
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  info: {
    paddingTop: 8,
    paddingHorizontal: 4,
    gap: 4,
  },
  title: {
    fontSize: 12,
    color: COLORS.body,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 15,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    color: COLORS.placeholder,
  },
});
