import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useRouter } from 'expo-router';

const SignUp = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.replace('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#333"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#333"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Create Account" onPress={handleSignup} />
            <Text style={styles.link} onPress={() => router.push('/login')}>
                Already have an account? Log in
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: 'white' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
    error: { color: 'red', marginBottom: 10 },
    link: { marginTop: 15, color: 'blue', textAlign: 'center' },
});

export default SignUp;
