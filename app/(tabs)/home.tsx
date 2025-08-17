import { useRouter } from 'expo-router';
import { Text, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import BookList from '@/components/BookList';

const Home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      Alert.alert('Logging out', 'Are you sure you want to log out?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          onPress: async () => {
            await signOut(auth);
            router.replace('/');
          },
        },
      ]);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Books in your Journal</Text>
      <BookList />
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontFamily: 'Crafteds',
    fontSize: 32,
  },
});

export default Home;
