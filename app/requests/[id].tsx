import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchRequests, updateRequestStatus, ServiceRequest } from '@/api/requests';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors, spacing } from '@/theme/tokens';
import { LinearGradient } from 'expo-linear-gradient';
import Container from '@/components/ui/Container';

export default function RequestDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [request, setRequest] = useState<ServiceRequest | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const all = await fetchRequests();
            setRequest(all.find(r => r.id === id) || null);
            setLoading(false);
        })();
    }, [id]);

    const updateStatus = async (status: string) => {
        if (!request) return;
        const updated = await updateRequestStatus(request.id, status);
        setRequest(updated);
    };

    if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
    if (!request) return <View style={styles.container}><Text>Not found</Text></View>;

    return (
        <LinearGradient colors={["#fffbeb", "#fef3c7"]} style={{ flex: 1 }}>
            <Container>
                <Text variant="title" style={styles.title}>{request.title}</Text>
                <Card style={{ marginBottom: spacing.md }}>
                    <Text> Status: <Text color={colors.brand.primary}>{request.status}</Text></Text>
                    <Text> Priority: {request.priority}</Text>
                    <Text> Room: {request.room.roomNumber}</Text>
                </Card>
                {request.status === 'pending' && <Button title="Start" onPress={() => updateStatus('in_progress')} />}
                {request.status === 'in_progress' && <Button title="Complete" color={colors.brand.success} onPress={() => updateStatus('completed')} />}
            </Container>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: { marginBottom: spacing.md }
});
