import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchRequests, updateRequestStatus, ServiceRequest } from '@/api/requests';

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
        <View style={styles.container}>
            <Text style={styles.title}>{request.title}</Text>
            <Text>Status: {request.status}</Text>
            <Text>Priority: {request.priority}</Text>
            <Text>Room: {request.room.roomNumber}</Text>
            <View style={{ height: 16 }} />
            {request.status === 'pending' && <Button title="Start" onPress={() => updateStatus('in_progress')} />}
            {request.status === 'in_progress' && <Button title="Complete" onPress={() => updateStatus('completed')} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fafafa' },
    title: { fontSize: 20, fontWeight: '600', marginBottom: 12 }
});
