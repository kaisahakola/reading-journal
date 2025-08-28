import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { signOut, updateProfile, getAuth } from 'firebase/auth';
import { useRouter } from 'expo-router';
import SubmitButton from '@/components/SubmitButton';
import { useFetchAllBooks } from '@/hooks/useFetchAllBooks';
import { useUserProfile } from '@/hooks/useUserProfile';
import { TriggerAlert } from '@/utils/alert';
import * as ImagePicker from 'expo-image-picker';
import { setDoc } from '@firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '@/config/firebase';

const Profile = () => {
  const router = useRouter();
  const { books, userId } = useFetchAllBooks();
  const {
    firstName,
    lastName,
    email,
    profilePicture,
    isDefaultPicture,
    loading,
  } = useUserProfile(userId);
  const auth = getAuth();
  const user = auth.currentUser;

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

  const handleAddProfilePicture = () => {
    TriggerAlert(
      'Add new profile picture',
      '',
      'Error adding picture: ',
      'Search from gallery',
      addPicture,
      !isDefaultPicture,
      'Delete current picture',
      removeImageAlert,
    );
  };

  const logOut = async () => {
    await signOut(auth);
    router.replace('/');
  };

  const addPicture = async () => {
    if (!user) {
      return;
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!image.canceled) {
      const uri = image.assets[0].uri;

      await updateProfile(user, { photoURL: uri });
      await user.reload();

      await setDoc(
        doc(db, 'users', user.uid),
        { profilePicture: uri },
        { merge: true },
      );
    }
  };

  const removeImageAlert = async () => {
    TriggerAlert(
      'Delete profile picture?',
      '',
      'Error deleting picture',
      'Delete',
      deleteImage,
      false,
    );
  };

  const deleteImage = async () => {
    if (!user) {
      return;
    }
    try {
      await updateProfile(user, { photoURL: null });
      await user.reload();

      await setDoc(
        doc(db, 'users', user.uid),
        { profilePicture: null },
        { merge: true },
      );
    } catch (err) {
      console.error('Error removing image: ', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={handleAddProfilePicture}>
          <Image source={profilePicture} style={styles.profileImage} />
        </TouchableOpacity>

        {loading ? (
          <Text>Loading profile...</Text>
        ) : (
          <>
            {firstName && lastName ? (
              <Text style={styles.name}>
                {firstName} {lastName}
              </Text>
            ) : (
              <Text>No name set</Text>
            )}
            <Text style={styles.text}>{email}</Text>
          </>
        )}

        <Text style={styles.text}>Books in your journal: {books.length}</Text>
      </View>
      <View style={styles.logoutBtn}>
        <SubmitButton onPress={handleLogout} label="Logout" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '30%',
    padding: 10,
    flex: 1,
  },
  wrapper: {
    alignItems: 'center',
    padding: 15,
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
  logoutBtn: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    padding: 15,
  },
});

export default Profile;
