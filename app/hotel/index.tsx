import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { fetchHotelProfile } from '@/api/hotel';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors, spacing } from '@/theme/tokens';
import { LinearGradient } from 'expo-linear-gradient';
import Container from '@/components/ui/Container';

export default function HotelInfoScreen() {
    const [hotel, setHotel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { (async () => { const h = await fetchHotelProfile(); setHotel(h); setLoading(false); })(); }, []);

    if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
    if (!hotel) return <View style={styles.container}><Text>No data</Text></View>;

    return (
        <LinearGradient colors={["#fffbeb", "#fef3c7"]} style={{ flex: 1 }}>
            <Container>
                <Text variant="title" style={styles.title}>{hotel.name}</Text>
                <Card style={{ marginBottom: spacing.md }}>
                    <Text>{hotel.address}</Text>
                    <Text>{hotel.city}, {hotel.state}, {hotel.country}</Text>
                </Card>
                <Link href="/hotel/edit" asChild>
                    <Button title="Edit" />
                </Link>
            </Container>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: { marginBottom: spacing.sm }
});
