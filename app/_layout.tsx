import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const {user, loading} = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const isAuthRoute = segments[0] === 'login' || segments[0] === 'signUp';

    if (!user && !isAuthRoute) {
      router.replace('/');
    }

    if (user && isAuthRoute) {
      router.replace('/(tabs)/home');
    }

  }, [user, loading, segments]);

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
  )
}
