import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';

const SCREEN_WIDTH = Dimensions.get('window').width;
export const VIDEO_HEIGHT = Math.round(SCREEN_WIDTH * 9 / 16);

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
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
  retryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: colors.text,
    fontWeight: '600',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  appTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroMedia: {
    width: SCREEN_WIDTH,
    height: VIDEO_HEIGHT,
    backgroundColor: 'black',
    overflow: 'hidden',
    marginTop: 72,
  },
  heroFallbackBg: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surface,
  },
  absoluteFill: StyleSheet.absoluteFillObject,
  heroInfo: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
  },
  heroContent: {
    position: 'absolute',
    bottom: 28,
    left: 20,
    right: 20,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: colors.tagBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
  yearText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  heroTitle: {
    ...typography.h1,
    fontSize: 32,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  ratingText: {
    color: colors.orange,
    fontSize: 14,
    fontWeight: '700',
  },
  watchBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  watchBtnText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  content: {
    flex: 1,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 14,
    marginTop: 8,
  },
  listPad: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  listBottom: {
    height: 20,
  },
});
