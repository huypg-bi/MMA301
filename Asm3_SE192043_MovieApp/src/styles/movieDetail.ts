import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";
import { typography } from "./typography";

const W = Dimensions.get("window").width;
const BACKDROP_H = 380;
const VIDEO_H = Math.round((W * 9) / 16);

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
    alignItems: "center",
    justifyContent: "center",
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
  backdrop: {
    width: W,
    height: BACKDROP_H,
  },
  videoContainer: {
    width: W,
    height: VIDEO_H,
    backgroundColor: "black",
    overflow: "hidden",
    marginTop: 100,
    marginBottom: 20,
  },
  absoluteFill: StyleSheet.absoluteFill,
  backdropFallbackBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.surface,
  },
  content: {
    marginTop: -60,
    paddingHorizontal: 20,
  },
  contentFlat: {
    marginTop: 0,
    paddingHorizontal: 20,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: colors.tagBg,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  title: {
    ...typography.h1,
    fontSize: 30,
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  ratingNum: {
    color: colors.orange,
    fontSize: 15,
    fontWeight: "700",
  },
  voteCount: {
    color: colors.textMuted,
    fontSize: 12,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 16,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  favBtn: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  favBtnActive: {
    backgroundColor: "rgba(255,116,116,0.15)",
    borderColor: colors.accent,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: 14,
  },
  seeAll: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "600",
  },
  overview: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  ratingBarWrap: {
    gap: 8,
  },
  ratingBarBg: {
    height: 6,
    backgroundColor: colors.surface,
    borderRadius: 3,
    overflow: "hidden",
  },
  ratingBarFill: {
    height: "100%",
    backgroundColor: colors.orange,
    borderRadius: 3,
  },
  ratingBarLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  castCard: {
    width: 72,
    marginRight: 12,
    alignItems: "center",
  },
  castImgWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: colors.surface,
    marginBottom: 8,
  },
  castImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  castNoImg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceHigh,
  },
  castInitial: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
  },
  castName: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 14,
  },
  castRole: {
    color: colors.textMuted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
  },
  castListPad: {
    paddingRight: 20,
  },
  navBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  navBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomPad: {
    height: 32,
  },
});
