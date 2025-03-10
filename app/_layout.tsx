import { Stack } from 'expo-router';
import { MarkersProvider } from '../components/MarkersContext';
import { DatabaseProvider } from '../contexts/DatabaseContext';

export default function RootLayout() {
  return (
    <MarkersProvider>
        <Stack>
        <Stack.Screen
            name="index"
            options={{
            headerTitle: 'Карта',
            }}
        />
        <Stack.Screen
            name="marker/[id]"
            options={{
            headerTitle: 'Детали маркера',
            }}
        />
        </Stack>
    </ MarkersProvider>
  );
}