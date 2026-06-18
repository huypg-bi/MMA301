import { StyleSheet } from 'react-native';
import { COLORS } from './color';

export const profileStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.off_white,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
    color: COLORS.off_white,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
    gap: 3,
  },
  userName: {
    fontSize: 17,
    color: COLORS.title_active,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.label,
  },
  editBtn: {
    padding: 8,
    backgroundColor: COLORS.input_background,
    borderRadius: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.off_white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
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
    backgroundColor: COLORS.line,
    marginVertical: 12,
  },
  statValue: {
    fontSize: 20,
    color: COLORS.secondary,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.label,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  menuSection: {
    backgroundColor: COLORS.off_white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
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
    borderRadius: 8,
    backgroundColor: COLORS.input_background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconBoxDanger: {
    backgroundColor: '#3D1515',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: COLORS.body,
    letterSpacing: 0.2,
  },
  menuLabelDanger: {
    color: '#E57373',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: COLORS.line,
    marginLeft: 64,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.placeholder,
    marginTop: 8,
  },
});
