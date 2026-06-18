import { StyleSheet } from 'react-native';
import { COLORS } from './color';

export const loginStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.off_white,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 140,
    height: 44,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 12,
    color: COLORS.label,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  form: {
    gap: 20,
  },
  heading: {
    fontSize: 22,
    letterSpacing: 6,
    color: COLORS.title_active,
    textAlign: 'center' as const,
    marginBottom: 8,
  },
  fieldContainer: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    color: COLORS.label,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  input: {
    backgroundColor: COLORS.input_background,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.body,
  },
  inputError: {
    borderColor: '#E57373',
  },
  errorText: {
    fontSize: 12,
    color: '#E57373',
  },
  passwordContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: COLORS.input_background,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.body,
  },
  eyeBtn: {
    paddingLeft: 12,
  },
  eyeText: {
    fontSize: 13,
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  loginBtn: {
    backgroundColor: COLORS.title_active,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center' as const,
    marginTop: 8,
  },
  loginBtnDisabled: {
    opacity: 0.6,
  },
  loginBtnText: {
    color: COLORS.off_white,
    fontSize: 15,
    letterSpacing: 3,
    fontWeight: '600' as const,
  },
  demoHint: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center' as const,
    gap: 6,
  },
  demoTitle: {
    fontSize: 11,
    color: COLORS.label,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  demoText: {
    fontSize: 13,
    color: COLORS.primary,
  },
  footer: {
    width: '100%' as const,
    height: 80,
    marginTop: 48,
    borderRadius: 8,
    overflow: 'hidden' as const,
  },
});
