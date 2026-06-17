import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';

const W = Dimensions.get('window').width;
const HEADER_H = 340;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  backFallback: {
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  goBackText: {
    color: colors.text,
  },
  header: {
    width: W,
    height: HEADER_H,
  },
  content: {
    marginTop: -80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  avatarWrap: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHigh,
  },
  avatarInitial: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '700',
  },
  name: {
    ...typography.h1,
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  deptBadge: {
    backgroundColor: colors.tagBg,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  deptText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  infoRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  section: {
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: 12,
  },
  bio: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  readMore: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  listPad: {
    paddingRight: 8,
  },
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  navBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
