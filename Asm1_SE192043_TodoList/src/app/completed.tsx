import { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';

import BackArrowIcon from '@/assets/svg/back_arrow.svg';
import { getTodos, Todo } from '@/utils/storage';
import { completedStyles as styles } from '@/styles/completedStyles';

export default function CompletedScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useFocusEffect(
    useCallback(() => {
      getTodos().then((all) => setTodos(all.filter((t) => t.completed)));
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <BackArrowIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Completed Task</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.body}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <Text style={styles.todoDetail}>{item.detail}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
