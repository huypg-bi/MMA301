import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  container: {
    width: 120,
    marginRight: 12,
  },
  imageWrapper: {
    width: 120,
    height: 175,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHigh,
  },
  noImageText: {
    color: colors.textMuted,
    fontSize: 10,
  },
  info: {
    marginTop: 8,
  },
  title: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    color: colors.orange,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 3,
  },
  year: {
    color: colors.textMuted,
    fontSize: 11,
  },
});
