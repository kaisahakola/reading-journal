import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; // See below
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const {user, loading} = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const isAuthRoute = segments[0] === 'login' || segments[0] === 'signUp';

    if (!user && !isAuthRoute) {
      router.replace('/login');
    }

    if (user && isAuthRoute) {
      router.replace('/');
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
        <Slot />
  )
}
