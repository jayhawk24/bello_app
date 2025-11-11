import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchSubscriptionSummary } from '@/api/subscription';

export default function SubscriptionScreen() {
    const [data, setData] = useState<{ plan: string; status: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { (async () => { const d = await fetchSubscriptionSummary(); setData(d); setLoading(false); })(); }, []);
    if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
    if (!data) return <View style={styles.container}><Text>No subscription data</Text></View>;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Subscription</Text>
            <Text>Plan: {data.plan}</Text>
            <Text>Status: {data.status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fafafa' },
    title: { fontSize: 20, fontWeight: '600', marginBottom: 12 }
});
