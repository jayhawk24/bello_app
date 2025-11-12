import { Tabs, router } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { colors as TColors } from '@/theme/tokens';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: TColors.brand.primary,
        tabBarInactiveTintColor: TColors.text.secondary,
        tabBarStyle: {
          backgroundColor: TColors.surface.card,
          borderTopColor: TColors.surface.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: true,
        headerRight: () => (
          <Pressable accessibilityRole="button" onPress={() => router.push('/notifications')} style={{ paddingHorizontal: 8 }} hitSlop={8}>
            <MaterialIcons name="notifications" size={22} color={TColors.text.primary} />
          </Pressable>
        ),
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tray.full" color={color} />,
        }}
      />
    </Tabs>
  );
}
