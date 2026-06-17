import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { typography } from '@/styles/typography';
import { styles } from '@/styles/profile';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={typography.h2}>Profile</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.emoji}>👤</Text>
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.sub}>Your account settings</Text>
      </View>
    </SafeAreaView>
  );
}
