import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  searchIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    padding: 0,
  },
  clearBtn: {
    padding: 4,
  },
});
