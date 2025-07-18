import {
    Text,
    TextInput,
    StyleSheet, View, Button
} from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from '@/config/firebase';
import { useRouter } from "expo-router";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleLogin = async () => {
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace('/');
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor="#333"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor="#333"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <Button title="Login" onPress={handleLogin} />
            <Text style={styles.link} onPress={() => router.push('/signUp')}>
                Don&apos;t have an account? Sign up
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: 'white' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
    error: { color: 'red', marginBottom: 10 },
    link: { marginTop: 15, color: 'blue', textAlign: 'center' },
});

export default Login;
