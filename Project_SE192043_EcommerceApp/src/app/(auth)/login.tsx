import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS } from '@/styles/color';
import { loginStyles as styles } from '@/styles/login';

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!username.trim()) errs.username = 'Username is required';
    if (!password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleLogin() {
    if (!validate()) return;
    try {
      await login(username.trim(), password);
    } catch {
      Alert.alert('Login Failed', 'Invalid username or password.\n\nDemo: johnd / m38rmF$');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 40 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/Logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.tagline}>Luxury Fashion & Accessories</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.heading}>SIGN IN</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, errors.username ? styles.inputError : null]}
              value={username}
              onChangeText={(t) => {
                setUsername(t);
                if (errors.username) setErrors((e) => ({ ...e, username: undefined }));
              }}
              placeholder="Enter your username"
              placeholderTextColor={COLORS.placeholder}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.passwordContainer, errors.password ? styles.inputError : null]}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
                }}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <Pressable
                onPress={() => setShowPassword((s) => !s)}
                style={styles.eyeBtn}
                hitSlop={8}
              >
                <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          <Pressable
            style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.off_white} />
            ) : (
              <Text style={styles.loginBtnText}>SIGN IN</Text>
            )}
          </Pressable>

          <View style={styles.demoHint}>
            <Text style={styles.demoTitle}>Demo Credentials</Text>
            <Pressable
              onPress={() => {
                setUsername('johnd');
                setPassword('m38rmF$');
              }}
            >
              <Text style={styles.demoText}>johnd / m38rmF$  (tap to fill)</Text>
            </Pressable>
          </View>
        </View>

        <Image
          source={require('@/assets/images/Footer.png')}
          style={styles.footer}
          contentFit="cover"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

