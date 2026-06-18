import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import BackArrowIcon from '@/assets/svg/back_arrow.svg';
import { getTodos, saveTodos } from '@/utils/storage';
import { addTaskStyles as styles } from '@/styles/addTaskStyles';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a title.');
      return;
    }
    const todos = await getTodos();
    await saveTodos([
      ...todos,
      { id: generateId(), title: title.trim(), detail: detail.trim(), completed: false },
    ]);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <BackArrowIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Task</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#BDBDBD"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Detail"
              placeholderTextColor="#BDBDBD"
              value={detail}
              onChangeText={setDetail}
            />
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addBtnText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
