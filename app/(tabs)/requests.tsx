import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Container from '@/components/ui/Container';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/theme/tokens';
import { fetchRequests, ServiceRequest } from '@/api/requests';
import { Link } from 'expo-router';

export default function RequestsTab() {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        try {
            const r = await fetchRequests();
            setRequests(r);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <LinearGradient colors={["#fffbeb", "#fef3c7"]} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: spacing.xl }}>
                <Container>
                    <Text variant="title" style={styles.heading}>Service Requests</Text>
                    <Button title="Refresh" onPress={load} />
                    {loading && <Text>Loading...</Text>}
                    {!loading && requests.map((r) => (
                        <Link key={r.id} href={{ pathname: '/requests/[id]', params: { id: r.id } }} asChild>
                            <Card style={{ marginBottom: spacing.md }}>
                                <View style={styles.row}>
                                    <Text variant="subtitle">{r.title}</Text>
                                    <Text color={colors.brand.primary}>{r.status}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text>Room {r.room.roomNumber}</Text>
                                    <Text>{new Date(r.requestedAt).toLocaleString()}</Text>
                                </View>
                            </Card>
                        </Link>
                    ))}
                </Container>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    heading: { marginBottom: spacing.md },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
