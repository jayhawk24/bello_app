import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { fetchHotelProfile } from '@/api/hotel';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors, spacing } from '@/theme/tokens';

export default function HotelInfoScreen() {
    const [hotel, setHotel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { (async () => { const h = await fetchHotelProfile(); setHotel(h); setLoading(false); })(); }, []);

    if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
    if (!hotel) return <View style={styles.container}><Text>No data</Text></View>;

    return (
        <View style={styles.container}>
            <Text variant="title" style={styles.title}>{hotel.name}</Text>
            <Card style={{ marginBottom: spacing.md }}>
                <Text>{hotel.address}</Text>
                <Text>{hotel.city}, {hotel.state}, {hotel.country}</Text>
            </Card>
            <Link href="/hotel/edit" asChild>
                <Button title="Edit" />
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: spacing.xl, backgroundColor: colors.surface.background },
    title: { marginBottom: spacing.sm }
});
