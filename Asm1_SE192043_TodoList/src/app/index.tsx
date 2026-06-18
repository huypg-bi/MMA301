import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';

import CalendarIcon from '@/assets/svg/calendar.svg';
import PencilIcon from '@/assets/svg/Pencil.svg';
import TrashIcon from '@/assets/svg/Trash.svg';
import CheckCircleIcon from '@/assets/svg/CheckCircle.svg';
import PlusIcon from '@/assets/svg/plus.svg';
import PlaylistIcon from '@/assets/svg/Playlist.svg';
import TickIcon from '@/assets/svg/Tick.svg';

import { getTodos, saveTodos, Todo } from '@/utils/storage';
import { homeStyles as styles } from '@/styles/homeStyles';

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useFocusEffect(
    useCallback(() => {
      getTodos().then((all) => setTodos(all.filter((t) => !t.completed)));
    }, [])
  );

  const handleDelete = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const all = await getTodos();
          const updated = all.filter((t) => t.id !== id);
          await saveTodos(updated);
          setTodos(updated.filter((t) => !t.completed));
        },
      },
    ]);
  };

  const handleComplete = async (id: string) => {
    const all = await getTodos();
    const updated = all.map((t) => (t.id === id ? { ...t, completed: true } : t));
    await saveTodos(updated);
    setTodos(updated.filter((t) => !t.completed));
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.todoTitle}>{item.title}</Text>
        <Text style={styles.todoDetail}>{item.detail}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/edit-task', params: { id: item.id } })}
          style={styles.actionBtn}
        >
          <PencilIcon width={25} height={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionBtn}>
          <TrashIcon width={25} height={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleComplete(item.id)} style={styles.actionBtn}>
          <CheckCircleIcon width={25} height={25} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TODO APP</Text>
        <CalendarIcon width={42} height={42} />
      </View>

      <View style={styles.body}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.fab} onPress={() => router.push('/add-task')}>
          <PlusIcon width={28} height={28} />
        </TouchableOpacity>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.tabBarSafe}>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tab}>
            <PlaylistIcon width={26} height={26} />
            <Text style={[styles.tabText, styles.tabTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => router.push('/completed')}>
            <TickIcon width={26} height={26} />
            <Text style={styles.tabText}>Completed</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}
