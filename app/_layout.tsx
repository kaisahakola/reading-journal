import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Font from 'expo-font';

export default function RootLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Marcellus: require('../assets/fonts/Marcellus-Regular.ttf'),
      AndadaPro: require('../assets/fonts/AndadaPro-VariableFont_wght.ttf'),
    }).then(() => setFontsLoaded(true));
    if (loading) return;
    if (!user) {
      router.replace('/');
    }
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user, loading, router]);

  if (!fontsLoaded) return null;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Slot />
      <Toast />
    </>
  );
}
