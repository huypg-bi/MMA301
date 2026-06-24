import { StyleSheet } from 'react-native';
import { COLORS } from './color';

export const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.off_white,
  },
  closeBtn: {
    padding: 10,
    alignSelf: 'flex-start',
    marginLeft: 6,
    marginBottom: 20,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 40,
  },
  tab: {
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 14,
    letterSpacing: 3,
    color: COLORS.body,
    opacity: 0.4,
  },
  tabTextActive: {
    color: COLORS.title_active,
    opacity: 1,
  },
  indicatorRow: {
    height: 12,
    position: 'relative',
    marginBottom: 8,
  },
  indicatorLine: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.line,
  },
  diamond: {
    position: 'absolute',
    top: 2,
    width: 8,
    height: 8,
    backgroundColor: COLORS.secondary,
    transform: [{ rotate: '45deg' }],
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.title_active,
    letterSpacing: 0.5,
  },
  subList: {
    backgroundColor: COLORS.input_background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  subItem: {
    paddingVertical: 13,
    paddingLeft: 36,
    paddingRight: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  subItemText: {
    fontSize: 15,
    color: COLORS.body,
    textTransform: 'capitalize',
  },
  drawerFooter: {
    paddingHorizontal: 18,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    gap: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.label,
    letterSpacing: 0.5,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 8,
  },
});
