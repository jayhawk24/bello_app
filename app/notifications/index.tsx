import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Container from '@/components/ui/Container';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/theme/tokens';
import { fetchNotifications, markAllNotificationsRead, NotificationItem } from '@/api/notifications';

export default function NotificationsScreen() {
  const [list, setList] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchNotifications(50);
      setList(data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try { await load(); } finally { setRefreshing(false); }
  };

  const onMarkAll = async () => {
    try { await markAllNotificationsRead(); await load(); } catch { }
  };

  return (
    <LinearGradient colors={["#fffbeb", "#fef3c7"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: spacing.xl }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Container>
          <View style={{ marginBottom: spacing.md }}>
            <Button title="Mark all as read" onPress={onMarkAll} />
          </View>

          {loading ? (
            <Text color={colors.text.secondary}>Loading notifications…</Text>
          ) : list.length === 0 ? (
            <Card style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 40 }}>🔔</Text>
              <Text variant="subtitle" style={{ marginTop: spacing.sm }}>No notifications yet</Text>
              <Text color={colors.text.secondary}>You’re all caught up.</Text>
            </Card>
          ) : (
            <View style={{ gap: spacing.sm }}>
              {list.map((n) => (
                <Card key={n.id} style={[!n.isRead ? styles.unread : null]}>
                  <Text variant="subtitle">{n.title}</Text>
                  <Text color={colors.text.secondary} style={{ marginTop: 4 }}>{n.message}</Text>
                  <Text variant="caption" color={colors.text.secondary} style={{ marginTop: 6 }}>{new Date(n.createdAt).toLocaleString()}</Text>
                </Card>
              ))}
            </View>
          )}
        </Container>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  unread: { borderColor: colors.brand.accent, borderWidth: 1 },
});
