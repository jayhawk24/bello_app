import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { fetchHotelProfile, updateHotelProfile } from '@/api/hotel';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/theme/tokens';

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
            <Text variant="title" style={styles.title}>Edit Hotel Info</Text>
            <Input value={form.name} onChangeText={(t) => updateField('name', t)} placeholder="Name" label="Name" />
            <Input value={form.address} onChangeText={(t) => updateField('address', t)} placeholder="Address" label="Address" />
            <Input value={form.city} onChangeText={(t) => updateField('city', t)} placeholder="City" label="City" />
            <Input value={form.state} onChangeText={(t) => updateField('state', t)} placeholder="State" label="State" />
            <Input value={form.country} onChangeText={(t) => updateField('country', t)} placeholder="Country" label="Country" />
            <Button title={saving ? 'Saving...' : 'Save'} onPress={save} disabled={saving} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: spacing.xl, backgroundColor: colors.surface.background },
    title: { marginBottom: spacing.md },
    input: {}
});
