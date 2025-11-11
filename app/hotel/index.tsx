import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { fetchHotelProfile } from '@/api/hotel';
import { Link } from 'expo-router';

export default function HotelInfoScreen() {
    const [hotel, setHotel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { (async () => { const h = await fetchHotelProfile(); setHotel(h); setLoading(false); })(); }, []);

    if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
    if (!hotel) return <View style={styles.container}><Text>No data</Text></View>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{hotel.name}</Text>
            <Text>{hotel.address}</Text>
            <Text>{hotel.city}, {hotel.state}, {hotel.country}</Text>
            <View style={{ height: 16 }} />
            <Link href="/hotel/edit" asChild>
                <Button title="Edit" />
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fafafa' },
    title: { fontSize: 20, fontWeight: '600', marginBottom: 8 }
});
