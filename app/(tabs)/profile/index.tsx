import { Text, StyleSheet, View, Image } from 'react-native';
import { useFetchAllBooks } from '@/hooks/useFetchAllBooks';
import { useUserProfile } from '@/hooks/useUserProfile';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsList from '@/components/SettingsList';

const Profile = () => {
  const { books, userId } = useFetchAllBooks();
  const { firstName, lastName, profilePicture, loading } =
    useUserProfile(userId);

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F6',
  },
  wrapper: {
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontFamily: 'Marcellus',
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
