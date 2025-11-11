import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/contexts/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="login" options={{ title: 'Login' }} />
          <Stack.Screen name="dashboard/index" options={{ title: 'Dashboard' }} />
          <Stack.Screen name="requests/[id]" options={{ title: 'Request' }} />
          <Stack.Screen name="subscription" options={{ title: 'Subscription' }} />
          <Stack.Screen name="hotel/index" options={{ title: 'Hotel Info' }} />
          <Stack.Screen name="hotel/edit" options={{ title: 'Edit Hotel' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
