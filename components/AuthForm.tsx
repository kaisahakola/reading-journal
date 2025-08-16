import {
    Text,
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
    Button
} from "react-native";
import { useState } from "react";
import { AuthData } from "@/types/auth";

interface AuthFormProps {
    onSubmit: (authData: AuthData) => void;
    submitLabel: string;
    formLabel: string;
    linkText: string;
    link: string;
    onToggleForm: () => void;
}

const AuthForm = ({
    onSubmit,
    submitLabel,
    formLabel,
    linkText,
    link,
    onToggleForm,
}: AuthFormProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = () => {
        try {
            onSubmit({email, password});
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{formLabel}</Text>
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
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonLabel}>
                    {submitLabel}
                </Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.linkText}>
                    {linkText}
                </Text>
                <TouchableOpacity onPress={onToggleForm}>
                    <Text style={styles.link}>
                        {link}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '90%',
        margin: 'auto'
    },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 50, textAlign: 'center' },
    input: { borderWidth: 1, marginBottom: 15, padding: 15, borderRadius: 20, height: 50 },
    error: { color: 'red', marginBottom: 10 },
    link: { color: 'blue', textAlign: 'center' },
    linkText: { marginTop: 50, marginBottom: 10, textAlign: 'center' },
    submitButton: {
        marginTop: 15,
        padding: 15,
        borderRadius: 20,
        height: 50,
        backgroundColor: 'black',
    },
    submitButtonLabel: { color: 'white', textAlign: 'center' },
});

export default AuthForm;
