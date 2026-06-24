import { StyleSheet } from 'react-native';
import { THEME } from './theme';

export const profileStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: THEME.colors.backgroundAlt,
  },
  content: {
    padding: 16,
    gap: 14,
  },

  // User card
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: THEME.colors.heroBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
    gap: 3,
  },
  userName: {
    fontSize: THEME.fontSize.lg,
    color: THEME.colors.textPrimary,
    fontWeight: THEME.fontWeight.semibold,
    textTransform: 'capitalize',
  },
  userEmail: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textSecondary,
  },
  editBtn: {
    padding: 8,
    backgroundColor: THEME.colors.backgroundAlt,
    borderRadius: 20,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: THEME.colors.border,
    marginVertical: 12,
  },
  statValue: {
    fontSize: THEME.fontSize.xxl,
    color: THEME.colors.salePrice,
    fontWeight: THEME.fontWeight.bold,
  },
  statLabel: {
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // Menu
  menuSection: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: THEME.radius.sm,
    backgroundColor: THEME.colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconBoxDanger: {
    backgroundColor: '#FDECEA',
  },
  menuLabel: {
    flex: 1,
    fontSize: THEME.fontSize.base,
    color: THEME.colors.textPrimary,
  },
  menuLabelDanger: {
    color: '#E53935',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: THEME.colors.border,
    marginLeft: 64,
  },
  version: {
    textAlign: 'center',
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.textMuted,
    marginTop: 8,
    paddingBottom: 8,
  },

  // Guest view
  guestContent: {
    padding: 24,
    gap: 32,
  },
  guestHero: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 24,
  },
  guestTitle: {
    fontSize: THEME.fontSize.xxl,
    color: THEME.colors.textPrimary,
    fontWeight: THEME.fontWeight.bold,
  },
  guestSubtitle: {
    fontSize: THEME.fontSize.base,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  guestForm: {
    gap: 16,
  },
  guestField: {
    gap: 6,
  },
  guestLabel: {
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: THEME.fontWeight.medium,
  },
  guestInput: {
    backgroundColor: THEME.colors.backgroundAlt,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: THEME.fontSize.base,
    color: THEME.colors.textPrimary,
  },
  guestPasswordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.backgroundAlt,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.radius.sm,
    paddingHorizontal: 14,
    gap: 8,
  },
  guestPasswordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: THEME.fontSize.base,
    color: THEME.colors.textPrimary,
  },
  guestEyeText: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.primary,
    fontWeight: THEME.fontWeight.medium,
  },
  guestError: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.salePrice,
  },
  guestLoginBtn: {
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.radius.sm,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  guestLoginBtnText: {
    color: THEME.colors.white,
    fontSize: THEME.fontSize.base,
    letterSpacing: 1.5,
    fontWeight: THEME.fontWeight.semibold,
  },
  guestDemo: {
    textAlign: 'center',
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.textMuted,
    marginTop: 4,
  },
});
