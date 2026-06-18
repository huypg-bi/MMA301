import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: string;
  title: string;
  detail: string;
  completed: boolean;
}

const KEY = 'todos_v1';

export async function getTodos(): Promise<Todo[]> {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? (JSON.parse(json) as Todo[]) : [];
  } catch {
    return [];
  }
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(todos));
}
