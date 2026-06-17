import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  count: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listEmpty: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 8,
    alignItems: 'flex-start',
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
  cardInfo: {
    flex: 1,
    gap: 6,
    justifyContent: 'center',
  },
  cardTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: colors.orange,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  yearText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  overview: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  removeBtn: {
    padding: 4,
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
    gap: 12,
    paddingBottom: 80,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
