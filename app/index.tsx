import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import AuthForm from "@/components/AuthForm";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/config/firebase";
import { AuthData } from "@/types/auth";
import {router} from "expo-router";
import {useState} from "react";

const Index = () => {
    const [activeForm, setActiveForm] = useState<"login" | "signup" | "">("");

    const handleLogin = async ({email, password}: AuthData) => {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace('/(tabs)/home');
    }

    const handleSignup = async ({email, password}: AuthData) => {
        await createUserWithEmailAndPassword(auth, email, password);
        router.replace('/(tabs)/home');
    };

    return (
        <View style={styles.container}>
            {activeForm === "" ? (
                <View style={styles.buttonContainer}>
                    <Text style={styles.text}>Keep up with your reading!</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setActiveForm("login")}>
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>Don&#39;t have an account yet?</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setActiveForm("signup")}>
                        <Text style={styles.buttonText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : activeForm === "login" ? (
                <AuthForm
                    onSubmit={handleLogin}
                    submitLabel={"Login"}
                    formLabel={"Login"}
                    linkText={"Don't have an account yet?"}
                    link={"Sign up"}
                    onToggleForm={() => setActiveForm("signup")}
                />
            ) : (
                <AuthForm
                    onSubmit={handleSignup}
                    submitLabel={"Sign Up"}
                    formLabel={"Sign up"}
                    linkText={"Already have an account?"}
                    link={"Login"}
                    onToggleForm={() => setActiveForm("login")}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        marginTop: 15,
        padding: 15,
        borderRadius: 20,
        height: 50,
        backgroundColor: 'black',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },
    buttonContainer: {
        width: '90%',
        margin: 'auto',
    },
    text: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 24,
    }
})

export default Index;
