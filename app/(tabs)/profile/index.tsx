import { Text, StyleSheet, View, Image } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import { useRouter } from 'expo-router';
import SubmitButton from '@/components/SubmitButton';
import { useFetchAllBooks } from '@/hooks/useFetchAllBooks';
import { useUserProfile } from '@/hooks/useUserProfile';
import { TriggerAlert } from '@/utils/alert';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsList from '@/components/SettingsList';

const Profile = () => {
  const router = useRouter();
  const { books, userId } = useFetchAllBooks();
  const { firstName, lastName, profilePicture, loading } =
    useUserProfile(userId);
  const auth = getAuth();

  const handleLogout = async () => {
    TriggerAlert(
      'Logging out',
      'Are you sure you want to log out?',
      'Logout error: ',
      'Log out',
      logOut,
      false,
    );
  };

  const logOut = async () => {
    await signOut(auth);
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Profile</Text>
        <Image source={profilePicture} style={styles.profileImage} />

        {loading ? (
          <Text>Loading profile...</Text>
        ) : (
          <>
            {firstName && lastName ? (
              <Text style={styles.name}>
                {firstName} {lastName}
              </Text>
            ) : null}
          </>
        )}

        <Text style={styles.text}>Books in your journal: {books.length}</Text>

        <SettingsList />
      </View>
      <SubmitButton onPress={handleLogout} label="Logout" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    flex: 1,
    width: '90%',
    margin: 'auto',
  },
  wrapper: {
    alignItems: 'center',
    padding: 15,
    height: '77%', // this is temporary until more content is added to the profile page
  },
  title: {
    fontFamily: 'Crafteds',
    fontSize: 32,
  },
  name: {
    fontFamily: 'AndadaPro',
    fontSize: 24,
  },
  text: {
    fontFamily: 'Helvetica',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});

export default Profile;
