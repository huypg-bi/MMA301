import { StyleSheet } from 'react-native';
import { PRIMARY } from './colors';

export const editTaskStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PRIMARY,
  },
  header: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 12,
  },
  headerSpacer: {
    width: 32,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 28,
    paddingTop: 32,
  },
  inputWrapper: {
    marginBottom: 32,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    paddingVertical: 8,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  btn: {
    flex: 1,
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
