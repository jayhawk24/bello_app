import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { fetchSubscriptionSummary } from '@/api/subscription';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { colors, spacing } from '@/theme/tokens';
import { LinearGradient } from 'expo-linear-gradient';
import Container from '@/components/ui/Container';

export default function SubscriptionScreen() {
    const [data, setData] = useState<{ plan: string; status: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { (async () => { const d = await fetchSubscriptionSummary(); setData(d); setLoading(false); })(); }, []);
    if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
    if (!data) return <View style={styles.container}><Text>No subscription data</Text></View>;
    return (
        <LinearGradient colors={["#fffbeb", "#fef3c7"]} style={{ flex: 1 }}>
            <Container>
                <Text variant="title" style={styles.title}>Subscription</Text>
                <Card>
                    <Text>Plan: {data.plan}</Text>
                    <Text>Status: {data.status}</Text>
                </Card>
            </Container>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: { marginBottom: spacing.md }
});
