import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { fetchRequests, ServiceRequest } from '@/api/requests';
import { fetchNotifications, NotificationItem, markAllNotificationsRead } from '@/api/notifications';
import { Link } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors, spacing } from '@/theme/tokens';
import { LinearGradient } from 'expo-linear-gradient';
import { Badge } from '@/components/ui/Badge';
import Container from '@/components/ui/Container';

export default function DashboardScreen() {
    const { user, logout } = useAuth();
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        try {
            const [r, n] = await Promise.all([fetchRequests(), fetchNotifications()]);
            setRequests(r); setNotifications(n);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    // Refresh data when a notification arrives while on dashboard
    useEffect(() => {
        const sub = Notifications.addNotificationReceivedListener(() => {
            load();
        });
        return () => sub.remove();
    }, []);

    return (
        <LinearGradient colors={["#fffbeb", "#fef3c7"]} style={styles.gradient}>
            <ScrollView style={styles.scroll} contentContainerStyle={{ paddingVertical: spacing.xl }}>
                <Container>
                    <Text variant="title" style={styles.heading}>Welcome {user?.role}</Text>
                    <View style={{ height: spacing.sm }} />
                    <Button title="Refresh" onPress={load} />
                    <Text variant="subtitle" style={styles.sectionTitle}>Service Requests</Text>
                    {loading && <Text>Loading...</Text>}
                    {!loading && requests.map((r) => (
                        <Link key={r.id} href={{ pathname: '/requests/[id]', params: { id: r.id } }} asChild>
                            <Card style={{ marginBottom: spacing.md }}>
                                <View style={styles.row}>
                                    <Text variant="subtitle">{r.title}</Text>
                                    <Badge label={r.priority} tone={priorityTone(r.priority)} />
                                </View>
                                <View style={styles.row}>
                                    <Text color={colors.brand.primary}>{r.status}</Text>
                                    <Text>Room {r.room.roomNumber}</Text>
                                </View>
                            </Card>
                        </Link>
                    ))}
                    <Text variant="subtitle" style={styles.sectionTitle}>Notifications</Text>
                    <Button title="Mark All Read" onPress={async () => { await markAllNotificationsRead(); load(); }} />
                    {notifications.map((n) => (
                        <Card key={n.id} style={!n.isRead ? styles.unread : undefined}>
                            <Text variant="subtitle">{n.title}</Text>
                            <Text>{n.message}</Text>
                        </Card>
                    ))}
                    <View style={{ height: 20 }} />
                    <Link href="/subscription" asChild><Button title="Subscription" /></Link>
                    <Link href="/hotel" asChild><Button title="Hotel Info" /></Link>
                    <View style={{ height: 20 }} />
                    <Button color={colors.brand.danger} title="Logout" onPress={logout} />
                </Container>
            </ScrollView>
        </LinearGradient>
    );
}

function priorityTone(priority: string) {
    switch (priority) {
        case 'urgent': return 'danger' as const;
        case 'high': return 'warning' as const;
        case 'medium': return 'accent' as const;
        default: return 'success' as const;
    }
}

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    scroll: { flex: 1 },
    heading: { marginBottom: spacing.md },
    sectionTitle: { marginVertical: spacing.md },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    unread: { borderColor: colors.brand.accent, borderWidth: 1 },
});
