import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
    const { loginUser, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setError(null);
        try {
            await loginUser(email, password);
        } catch (e: any) {
            setError(e.message || 'Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bello Staff/Admin Login</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Button title={loading ? 'Loading...' : 'Login'} onPress={submit} disabled={loading || !email || !password} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fafafa' },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 16, color: '#212121' },
    input: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#e0e0e0' },
    error: { color: '#f44336', marginBottom: 12 }
});
