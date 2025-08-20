import { Text, SafeAreaView, StyleSheet, Alert, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useRouter } from 'expo-router';
import SubmitButton from '@/components/SubmitButton';
import { useFetchAllBooks } from '@/hooks/useFetchAllBooks';
import { useUserProfile } from '@/hooks/useUserProfile';

const Profile = () => {
  const router = useRouter();
  const { books, userId } = useFetchAllBooks();
  const { firstName, lastName, email, loading } = useUserProfile(userId);

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
      <View style={styles.wrapper}>
        <Text style={styles.title}>Profile</Text>
        {loading ? (
          <Text>Loading profile...</Text>
        ) : (
          <>
            {firstName && lastName ? (
              <Text>
                {firstName} {lastName}
              </Text>
            ) : (
              <Text>No name set</Text>
            )}
            <Text>{email}</Text>
          </>
        )}

        <Text>Books in your journal: {books.length}</Text>
        <SubmitButton onPress={handleLogout} label="Logout" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '30%',
    padding: 10,
  },
  wrapper: {
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontFamily: 'Crafteds',
    fontSize: 32,
  },
});

export default Profile;
