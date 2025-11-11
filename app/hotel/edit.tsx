import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { fetchHotelProfile, updateHotelProfile } from '@/api/hotel';

export default function HotelInfoEditScreen() {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState<any>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => { (async () => { const h = await fetchHotelProfile(); setForm(h); setLoading(false); })(); }, []);

    const updateField = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

    const save = async () => {
        setSaving(true);
        try { await updateHotelProfile({ name: form.name, address: form.address, city: form.city, state: form.state, country: form.country }); } finally { setSaving(false); }
    };

    if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Hotel Info</Text>
            <TextInput style={styles.input} value={form.name} onChangeText={(t) => updateField('name', t)} placeholder="Name" />
            <TextInput style={styles.input} value={form.address} onChangeText={(t) => updateField('address', t)} placeholder="Address" />
            <TextInput style={styles.input} value={form.city} onChangeText={(t) => updateField('city', t)} placeholder="City" />
            <TextInput style={styles.input} value={form.state} onChangeText={(t) => updateField('state', t)} placeholder="State" />
            <TextInput style={styles.input} value={form.country} onChangeText={(t) => updateField('country', t)} placeholder="Country" />
            <Button title={saving ? 'Saving...' : 'Save'} onPress={save} disabled={saving} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fafafa' },
    title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
    input: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#e0e0e0' }
});
