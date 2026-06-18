import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import BackArrowIcon from '@/assets/svg/back_arrow.svg';
import { getTodos, saveTodos } from '@/utils/storage';
import { editTaskStyles as styles } from '@/styles/editTaskStyles';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  useEffect(() => {
    getTodos().then((todos) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        setTitle(todo.title);
        setDetail(todo.detail);
      }
    });
  }, [id]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a title.');
      return;
    }
    const todos = await getTodos();
    const updated = todos.map((t) =>
      t.id === id ? { ...t, title: title.trim(), detail: detail.trim() } : t
    );
    await saveTodos(updated);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <BackArrowIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Task</Text>
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
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
