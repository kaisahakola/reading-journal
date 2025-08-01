import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PROJECT_ID,
    storageBucket: process.env.EXPO_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
