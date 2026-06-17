import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  searchWrap: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listEmpty: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 8,
  },
  posterWrap: {
    width: 80,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    flexShrink: 0,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noPoster: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHigh,
  },
  noPosterText: {
    color: colors.textMuted,
    fontSize: 10,
  },
  rowInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  rowTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  rowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRating: {
    color: colors.orange,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  rowYear: {
    color: colors.textMuted,
    fontSize: 12,
  },
  rowOverview: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 80,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
